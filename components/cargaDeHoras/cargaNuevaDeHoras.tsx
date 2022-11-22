import React from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import { BsFillPlusCircleFill, BsFillDashCircleFill } from "react-icons/bs";
import { ConfirmationModal } from "./modals/confirmationModal";

function setHoursLoadedToTaskInDate(
  hoursToLoad: number,
  taskId: number,
  projectId: number,
  taskDate: string
) {
  console.log(
    "back de carga de horas\n enviamos las nuevas horas cargadas para ese empleado en esa tarea"
  );
  console.log("Formato");
  console.log("hoursToLoad ", hoursToLoad);
  console.log("taskId: ", taskId);
  console.log("taskDate: ", taskDate);

  const data = {
    fecha: taskDate,
    horas: hoursToLoad,
    legajoPersona: 1,
    tarea: taskId,
    proyecto: projectId,
  };
  const path = "https://squad-8-recursos-2022-01.herokuapp.com/horas";
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(path, request)
    .then((response) => {
      if (response.ok) {
        console.log("[GET] Respuesta OK");
        response.json().then((data) => console.log(data));
      } else {
        console.log("[POST] Respuesta de red OK pero respuesta de HTTP no OK");
      }
    })
    .catch((error) => {
      console.log(
        "[POST] Hubo un problema con la petición Fetch:" + error.message
      );
    });

  return;
}

export const CargaNuevaDeHoras = (props: any) => {
  const [hoursSelected, setHoursSelected] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <>
      <h5 className="centered">Todavía no cargaste horas para esta tarea</h5>
      <h5 className="centered">¿Cuántas horas querés cargar?</h5>
      <br></br>

      <h4 className="centered">Horas a cargar: {hoursSelected}</h4>
      <ButtonGroup
        style={{
          left: "50%",
          top: "10%",
          transform: "translate(-50%, -10%)",
        }}
      >
        <Button
          variant="secondary"
          onClick={() => {
            let hours = hoursSelected + 1;
            if (hours <= 8) {
              // Cargamos como mucho 8 horas
              setHoursSelected(hours);
            }
          }}
        >
          <BsFillPlusCircleFill size="30px" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            let hours = hoursSelected - 1;
            if (hours >= 1) {
              // No podemos cargar menos de 1 horas
              setHoursSelected(hours);
            }
          }}
        >
          <BsFillDashCircleFill size="30px" />
        </Button>
      </ButtonGroup>

      <br></br>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button
            style={{ whiteSpace: "pre-wrap" }}
            variant="primary"
            size="lg"
            onClick={() => {
              setShowConfirmationModal(true);
              setHoursLoadedToTaskInDate(
                hoursSelected,
                props.selectedTaskId,
                props.selectedProjectId,
                props.selectedTaskDate
              );
            }}
          >
            Cargar horas
          </Button>
        </Col>
      </Row>
      <ConfirmationModal
        showConfirmationModal={showConfirmationModal}
        resetStateFunction={props.resetStateFunction}
        message={"Cargaste tus horas con éxito"}
      />
    </>
  );
};
