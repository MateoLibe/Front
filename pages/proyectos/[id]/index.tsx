import React, { useState } from 'react'
import { FiSettings} from 'react-icons/fi';
import { RiDeleteBinLine} from 'react-icons/ri';
import { MainLayout } from '../../../components/layouts/MainLayout';
import { BreadCrumb } from '../../../components/ui/BreadCrumb';
import { TareaDescription } from '../../../components/ui/tareas/TareaDescription';
import { Dropdown } from 'react-bootstrap';
import { ModalCrearTarea } from '../../../components/ModalCrearTarea';
import { useRouter } from 'next/router';
import { NotDescription } from '../../../components/ui/tareas/NotDescription';
import { ModalConfirmation } from '../../../components/ModalConfirmation';
import axios from 'axios';

//proyectos individual
export const getServerSideProps = async({query}:any)=>{

  const baseEndPoint = 'https://api-psa-projects.herokuapp.com/proyectos'
  const {id} = query;

  const resp = await fetch(`${baseEndPoint}/${id}`);
  
  const data = await resp.json();

  return({
    props:{
      data: data.data
    }
  })
}


export default function Proyect({data}:any) {


  const empleados =[{"legajo":1,"Nombre":"Mario","Apellido":"Mendoza"},{"legajo":2,"Nombre":"Maria","Apellido":"Perez"},{"legajo":3,"Nombre":"Patricia","Apellido":"Gaona"}]
  const [showModal, setShowModal]= useState(false);
  const [showConfirmationModal, setShowConfirmationModal]= useState(false);
  const [taskActual, setTaskActual]:any = useState(null)
  
  const handleClose = ()=> setShowModal(false);
  const handleShow = ()=> setShowModal(true)
  

  const handleCloseConfirmation = ()=>  setShowConfirmationModal(false);
  const handleShowConfirmation=()=>  setShowConfirmationModal(true) 
 
 
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handleTaskActual = (task:any)=>{
  
     setTaskActual(task)
    

    }

  const handleDelete = async (id:number)=>{

    const TASK_ROUTE= `https://api-psa-projects.herokuapp.com/tareas/${id}`
    //console.log('Continuar con eliminar tarea?',TASK_ROUTE)  
    
     
      await axios.delete(TASK_ROUTE)
      
     refreshData()
     setTaskActual(null)
   }


  return (

    <MainLayout> 
      
      <div className='d-flex justify-content-end px-4 mt-2'>

      

      </div> 
      
      <div className="content_title p-5 ">
      <BreadCrumb currentValue={data.name}/>
        <div className='d-flex justify-content-between mb-0'>
            <div className='d-flex'>
              <h2>Proyecto: {data.name}</h2>

         
            </div>
            
            <div className='d-flex align-items-center'>        
             <button onClick={handleShow} className="btn btn-primary btn-psa">+ Nueva Tarea</button>
             <ModalCrearTarea show={showModal} onHide={handleClose} empleados={empleados} projectId={data.id} refresh={refreshData}/>
            
             <ModalConfirmation show={showConfirmationModal} onHide={handleCloseConfirmation}  refresh={refreshData}  projectId={data.id} message='Seguro que quiere eliminar el proyecto'/>
             <Dropdown className='px-2 '>
              <Dropdown.Toggle variant="danger" id="dropdown-basic"  >
             
              <FiSettings/>
              </Dropdown.Toggle>
             
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Editar Proyecto</Dropdown.Item>
                <Dropdown.Item onClick={ handleShowConfirmation}>Eliminar Proyecto</Dropdown.Item>
             </Dropdown.Menu>
            </Dropdown>
             
             </div> 
        </div>
        <div><p> {data.description}</p></div>
     
        <div className="row mt-6">
        <h3>Tareas</h3>
          <div className="col-6">
           
            <table className="table table-striped table-hover">
              <thead className='psa__table'>
                <tr>
                  <th scope="col">Codigo</th>
                  <th scope="col">Titulo</th>
                  <th scope="col">Responsable</th>
                  <th scope="col" className='text-center'>Eliminar</th>
                </tr>
              </thead>
              <tbody>

  {data.tasks.map((tarea:any)=>{
       
       return  (
     
       <tr key={tarea.id} onClick={()=>handleTaskActual(tarea)}>
       <td>T{data.id}-{tarea.id}</td>
       <td>{tarea.name}</td>
       <td>{tarea.assigned
                            ? `${tarea.assigned.name} ${tarea.assigned.lastName} `
                            : "-" }</td>

        <td className='text-center'><button className='btn btn-danger btn-sm ' onClick={()=> handleDelete(tarea.id)}><RiDeleteBinLine/></button></td>
       </tr>
       
       )
})} 
     
  </tbody>
</table>

</div>
    <div className="col">{taskActual==null
                          ?<NotDescription/>
                          :<TareaDescription taskName={taskActual.name} 
                          responsableName={taskActual.assigned.name}
                          responsableLastName={taskActual.assigned.lastName}
                          creatorName={taskActual.creator.name}
                          creatorLastName={taskActual.creator.lastName}
                          status={taskActual.status}
                          creationDate={taskActual.creationDate}
                          description={taskActual.description}
                          id={taskActual.id}
                          projectId={taskActual.projectId}/> }
      </div>
</div>


      

        </div>
    </MainLayout>
  )
}



