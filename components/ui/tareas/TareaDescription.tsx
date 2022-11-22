import React, { useState } from 'react'

import {getTicketsByTareaId} from '../../../helpers/apiCalls'

import { useEffect } from 'react';






export const TareaDescription = ({taskName,
                                  responsable,
                                  creatorName,
                                  creatorLastName,
                                  status,
                                  creationDate,
                                  description,
                                  responsableName,
                                  responsableLastName,
                                  id,
                                projectId}:any) => {

 


  const [tickets, setTickets]:any = useState([])

  
  const getTickets = async(task:any)=>{
    const TICKETS_API_ROUTE =`https://squad-9-2022-1c.herokuapp.com/v1/support/tickets?taskId=${task}`
    const resp = await fetch(TICKETS_API_ROUTE);
    const data = await resp.json();
    
   setTickets(data)

    return tickets;
  }

  useEffect(()=>{
     getTickets(id);

 },[])


//console.log(tickets)
  


  return (
    <div className='tarea d-flex flex-column '>
    <div className='tarea__headers mb-2 px-2 py-2' >
      <div ><span className="fw-bold">Tarea: </span>{taskName}</div>
      <div ><span className="fw-bold">Codigo: </span>{`T${projectId}-${id}`}</div>
      <div ><span className="fw-bold">Responsable: </span>{`${responsableName} ${responsableLastName} `}</div>
      <div ><span className="fw-bold">Creador: </span>{`${creatorName} ${creatorLastName} `}</div>
     
      <div className='d-flex justify-content-between '> 
                <div ><span className="fw-bold">Estado: </span>{status}</div>
       <div><span className="fw-bold">Fecha de creacion: </span>{creationDate.split("T")[0]}</div>
       </div>
     </div>
    <div className='tarea__description mb-2 px-2 py-2'>
      <div className='fw-bold'>Descripcion</div>
      <div>{description}</div>
    </div>
    <div className='tarea__tickets mb-2 px-2 py-2'>



    <div ><span className='fw-bold'>Tickets asociados
</span>   <div className='d-flex mt-2'><div>Codigo</div> <div className='mx-3'>Titulo</div></div>
   
          <ul className='list-group list-group-flush'>

           {tickets
           ? tickets.map((ticket:any)=><li className='list-group-item' key={ticket.id}>

           <div className='d-flex'>
             <div>{ticket.id}</div>
             <div className='mx-3'>{ticket.title}</div>
       
           </div>
       
         </li>)
          : 'No hay tickets asociados para esta tarea'}

</ul>
    </div>
    </div>
    </div>
  )
}


