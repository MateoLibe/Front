import React from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  BsFillPlusCircleFill,
  BsFillDashCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { ConfirmationModal } from "./modals/confirmationModal";
import { DeleteConfirmationModal } from "./modals/deleteConfirmationModal";

function setHoursLoadedToTaskInDate(hourLoadId: number, hoursToLoad: number) {
  const path =
    "https://squad-8-recursos-2022-01.herokuapp.com/horas/" +
    hourLoadId +
    "/modificar?horas=" +
    hoursToLoad;

  const request = {
    method: "PUT",
  };
  fetch(path, request)
    .then((response) => {
      if (response.ok) {
        console.log("[PUT] Respuesta OK");
        response.json().then((data) => console.log(data));
      } else {
        console.log("[PUT] Respuesta de red OK pero respuesta de HTTP no OK");
      }
    })
    .catch((error) => {
      console.log(
        "[POST] Hubo un problema con la petición Fetch:" + error.message
      );
    });

  return;
}

function deleteHourLoad(hourLoadId: number) {
  const path =
    "https://squad-8-recursos-2022-01.herokuapp.com/horas/" + hourLoadId;

  const request = {
    method: "DELETE",
  };
  fetch(path, request)
    .then((response) => {
      if (response.ok) {
        console.log("[DELETE] Respuesta OK");
      } else {
        console.log(
          "[DELETE] Respuesta de red OK pero respuesta de HTTP no OK"
        );
      }
    })
    .catch((error) => {
      console.log(
        "[POST] Hubo un problema con la petición Fetch:" + error.message
      );
    });

  return;
}

export const UpdateCargaHoras = (props: any) => {
  const [hoursSelected, setHoursSelected] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeleteConfirmationModal, setshowDeleteConfirmationModal] =
    useState(false);

  useEffect(() => {
    if (props.previousHourLoad.horas > 1) {
      setHoursSelected(props.previousHourLoad.horas);
    }
  }, [props.previousHourLoad.horas]);

  return (
    <>
      <h5 className="centered">
        Ya habías cargado horas para esta tarea y fecha
      </h5>
      <h5 className="centered">¿Querés modificar las horas cargadas?</h5>
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
        <Button
          variant="secondary"
          onClick={() => {
            setshowDeleteConfirmationModal(true);
          }}
        >
          <BsFillTrashFill size="30px" />
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
                props.previousHourLoad.idCarga,
                hoursSelected
              );
            }}
          >
            Modificar horas
          </Button>
        </Col>
      </Row>

      <ConfirmationModal
        showConfirmationModal={showConfirmationModal}
        resetStateFunction={props.resetStateFunction}
        message={"Modificaste tus horas con exito"}
      />
      <DeleteConfirmationModal
        showDeleteConfirmationModal={showDeleteConfirmationModal}
        setShowDeleteConfirmationModal={setshowDeleteConfirmationModal}
        deleteFunction={deleteHourLoad}
        hourLoadId={props.previousHourLoad.idCarga}
        resetStateFunction={props.resetStateFunction}
      />
    </>
  );
};
