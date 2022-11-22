
import axios from 'axios';
import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useRouter } from 'next/router';



export const ModalConfirmation =  ({ show, onHide, projectId, refresh,message}: any) => {



    const API_ROUTE = `https://api-psa-projects.herokuapp.com/proyectos/${projectId}`;  
    const router = useRouter();
    
    
    const handleDelete = async ()=>{
        //console.log('eliminaria el proyecto',API_ROUTE)
        await axios.delete(API_ROUTE)
        router.push('/proyectos')
    }
  
  return (

    <Modal show={show} onHide={onHide} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>Desea Continuar?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
            <Button onClick={handleDelete}variant="danger">Si, quiero eliminar</Button>
             <Button onClick={onHide}variant="secondary">Cancelar</Button>
  </Modal.Footer>
    </Modal>
  )
}
