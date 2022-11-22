import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";

import { ConfirmationModal } from "./confirmationModal";

export function DeleteConfirmationModal(props: any) {
  const [deleteConfirmed, setdeleteConfirmed] = useState(false);

  return (
    <>
      <Modal
        show={props.showDeleteConfirmationModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Estás por eliminar esta carga</Modal.Title>
        </Modal.Header>
        <Modal.Body>La acción es irreversible</Modal.Body>
        <Modal.Body className="centered">
          <BsExclamationTriangleFill size="30px" color="red" />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.deleteFunction(props.hourLoadId);
              setdeleteConfirmed(true);
            }}
          >
            Eliminar
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              props.setShowDeleteConfirmationModal(false);
            }}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <ConfirmationModal
        showConfirmationModal={deleteConfirmed}
        resetStateFunction={props.resetStateFunction}
        message={"Eliminaste tus horas con exito"}
      />
    </>
  );
}
