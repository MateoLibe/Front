
import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { TaskForm } from './TaskForm'





export const ModalCrearTarea =  ({ show, onHide, empleados, projectId, refresh}: any) => {

 
  
  return (

    <Modal show={show} onHide={onHide} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>Nueva Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TaskForm empleados={empleados} projectId={projectId}  onHide={onHide} refresh={refresh}/>
      </Modal.Body>
  
    </Modal>
  )
}
