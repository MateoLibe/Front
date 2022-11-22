 import styles from "../../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import {
  Projects,
  Project,
  Tasks,
  Task,
  HourLoads,
  HourLoad,
} from "../../components/cargaDeHoras/types";
import { Form } from "react-bootstrap";
import { CargaNuevaDeHoras } from "../../components/cargaDeHoras/cargaNuevaDeHoras";
import { UpdateCargaHoras } from "../../components/cargaDeHoras/updateCargaHoras";
import {
  BsFillGearFill,
  BsListTask,
  BsFillCalendarEventFill,
} from "react-icons/bs";
import { MainLayout } from "../../components/layouts/MainLayout";

function getProjectsFromTasks(tasks: Tasks) {
  let projectsIds: Array<number> = [];
  let projects: Projects = [];

  tasks.forEach((task: Task) => {
    if (projectsIds.indexOf(task.projectId) === -1) {
      projectsIds.push(task.projectId);
      projects.push({ name: task.projectName, id: task.projectId });
    }
  });

  return projects;
}

function getTasksFromProject(generalTasks: Tasks, selectedProjectId: number) {
  let tasksFromProject: Tasks = [];
  generalTasks.forEach((task: Task) => {
    if (task.projectId === selectedProjectId) {
      tasksFromProject.push(task);
    }
  });

  return tasksFromProject;
}

/* Obtiene la carga de horas para esa tarea, fecha y empleado. Si no había, devuelve undefined */
function getPreviousHourLoad(
  taskId: number,
  taskDate: string,
  employeeId: number
) {
  return fetch(
    "https://squad-8-recursos-2022-01.herokuapp.com/horas/legajo/" +
      employeeId.toString()
  )
    .then((response) => {
      if (response.ok) {
        console.log("[GET] Respuesta OK");
        return response.json().then((data: HourLoads) => {
          return data.find((hourLoad: HourLoad) => {
            // Buscamos la carga de hora que corresponde
            return (
              hourLoad.fecha == taskDate &&
              hourLoad.legajoPersona == employeeId &&
              Number(hourLoad.tarea) == taskId
            );
          });
        });
      } else {
        console.log("[GET] Respuesta de red OK pero respuesta de HTTP no OK");
      }
    })
    .catch((error) => {
      console.log(
        "[GET] Hubo un problema con la petición Fetch:" + error.message
      );
    });
}

export default function Home() {
  const [taskSelectionDisabled, setTaskSelectionDisabled] = useState(true);
  const [dateSelectionDisabled, setDateSelectionDisabled] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState(-1);
  const [selectedTaskId, setSelectedTaskId] = useState(-1);
  const [selectedTaskDate, setSelectedTaskDate]: [string, any] = useState("");
  const [previousHourLoad, setPreviousHourLoad]: [HourLoad | undefined, any] =
    useState();
  const [isHourLoadFetched, setIsHourLoadFetched]: [boolean, any] =
    useState(false);

  const employeeId: number = 1; // Mario Mendoza

  /* ----------------- Inicio de OBTENER PROYECTOS DE EMPLEADO ----------------- */
  const [allEmployeeTasks, setAllEmployeeTasks]: [Tasks, any] = useState([]);
  const [employeeProjects, setEmployeeProjects]: [Projects, any] = useState([]);
  // Se llama a la api del módulo de Proyectos
  useEffect(() => {
    fetch(
      "https://api-psa-projects.herokuapp.com/tareas/getTareasDeEmpleado/" +
        employeeId.toString()
    )
      .then((response) => {
        if (response.ok) {
          console.log("[GET] Respuesta OK");
          response.json().then((data) => setAllEmployeeTasks(data));
        } else {
          console.log("[GET] Respuesta de red OK pero respuesta de HTTP no OK");
        }
      })
      .catch((error) => {
        console.log(
          "[GET] Hubo un problema con la petición Fetch:" + error.message
        );
      });
  }, []);

  useEffect(() => {
    setEmployeeProjects(getProjectsFromTasks(allEmployeeTasks));
  }, [allEmployeeTasks]);
  /* ----------------- Fin de OBTENER PROYECTOS DE EMPLEADO ----------------- */

  /* Cuando se selecciona una fecha, se busca en nuestro back la carga previa */
  useEffect(() => {
    if (selectedTaskDate != "") {
      getPreviousHourLoad(selectedTaskId, selectedTaskDate, employeeId).then(
        (res) => {
          console.log("previousHourLoad: \n", res);
          setPreviousHourLoad(res);
          setIsHourLoadFetched(true);
        }
      );
    }
  }, [selectedTaskDate, selectedTaskId]); // Solo se ejecuta si selectedTaskDate cambia

  const projectOptions = () => {
    return (
      <>
        {employeeProjects.map((project: Project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </>
    );
  };

  /* Se mostrarán las tareas sólo de ese proyecto */
  const taskOptions = () => {
    let tasksForProject: Tasks = getTasksFromProject(
      allEmployeeTasks,
      selectedProjectId
    );
    return (
      <>
        {tasksForProject.map((task: Task) => (
          <option key={task.id} value={task.id}>
            {task.name}
          </option>
        ))}
      </>
    );
  };

  const resetState = () => {
    setTaskSelectionDisabled(true);
    setDateSelectionDisabled(true);
    setSelectedProjectId(-1);
    setSelectedTaskId(-1);
    setSelectedTaskDate("");
    setPreviousHourLoad();
    setIsHourLoadFetched(false);
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <main className={styles.main}>
          <br></br>
          <h2 className="centered">Carga tus horas</h2>
          <div className="container">
            <div className="row">
              <div className="col centered">
                <h5>1. Seleccioná el proyecto que contiene la tarea</h5>
              </div>
            </div>
            <div className="row">
              <div className="col to_right">
                <BsFillGearFill size="25px" />
              </div>
              <div className="col">
                <select
                  className="form-select mb-3"
                  aria-label=".form-select-lg example"
                  value={selectedProjectId}
                  onChange={(e) => {
                    setTaskSelectionDisabled(false);
                    setSelectedProjectId(Number(e.target.value));
                    setDateSelectionDisabled(true);
                    setSelectedTaskDate("");
                    setPreviousHourLoad();
                    setIsHourLoadFetched(false);
                  }}
                >
                  <option key={-1} hidden>
                    Seleccionar
                  </option>
                  {projectOptions()}
                </select>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col  centered">
                <h5>2. Seleccioná la tarea</h5>
              </div>
            </div>
            <div className="row">
              <div className="col to_right">
                <BsListTask size="25px" />
              </div>
              <div className="col">
                <select
                  className="form-select mb-3"
                  aria-label=".form-select-lg example"
                  disabled={taskSelectionDisabled}
                  onChange={(e) => {
                    setDateSelectionDisabled(false);
                    setSelectedTaskDate("");
                    setSelectedTaskId(Number(e.target.value));
                    setPreviousHourLoad();
                    setIsHourLoadFetched(false);
                  }}
                  defaultValue={-2}
                >
                  <option key={-2} hidden>
                    Seleccionar
                  </option>
                  {taskOptions()}
                </select>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col centered">
                <h5>3. Seleccioná la fecha</h5>
              </div>
            </div>
            <div className="row">
              <div className="col to_right">
                <div className="input-group mb-3 to_right">
                  <BsFillCalendarEventFill size="25px" />
                </div>
              </div>
              <div className="col">
                <Form.Control
                  className="form-select mb-3"
                  aria-label=".form-select-lg example"
                  type="date"
                  name="datePicker"
                  placeholder="Fecha de la tarea"
                  disabled={dateSelectionDisabled}
                  value={selectedTaskDate || ""}
                  min={
                    new Date(new Date().setDate(new Date().getDate() - 30))
                      .toISOString()
                      .split("T")[0]
                  }
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setSelectedTaskDate(e.target.value);
                    setIsHourLoadFetched(false);
                  }}
                />
              </div>
              <div className="col"></div>
            </div>
            <hr />
            {selectedTaskDate != "" &&
              isHourLoadFetched &&
              (previousHourLoad ? (
                <UpdateCargaHoras
                  previousHourLoad={previousHourLoad}
                  selectedProjectId={selectedProjectId}
                  selectedTaskId={selectedTaskId}
                  selectedTaskDate={selectedTaskDate}
                  resetStateFunction={resetState}
                />
              ) : (
                <CargaNuevaDeHoras
                  selectedTaskId={selectedTaskId}
                  selectedProjectId={selectedProjectId}
                  selectedTaskDate={selectedTaskDate}
                  resetStateFunction={resetState}
                />
              ))}
            {/* Renderizamos condicionalmente la parte de carga de horas en sí */}
            <br></br>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
