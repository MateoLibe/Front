import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export function ConfirmationModal(props: any) {
  return (
    <>
      <Modal
        show={props.showConfirmationModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{props.message}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Podés seguir realizando otras cargas</Modal.Body>
        <Modal.Body className="centered">
          <BsFillCheckCircleFill size="30px" color="green" />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.resetStateFunction();
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
