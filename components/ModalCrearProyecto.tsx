
import React from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import { ProjectForm } from './ProjectForm';

<Spinner animation="border" variant="secondary" />

export const ModalCrearProyecto =  ({ show, onHide, empleados, refresh}: any) => {

 
  
  return (

    <Modal show={show} onHide={onHide} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Proyecto  </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProjectForm empleados={empleados} onHide={onHide} refresh={refresh} />
      </Modal.Body>
  
    </Modal>
  )
}
