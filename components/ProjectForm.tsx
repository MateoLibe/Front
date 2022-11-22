import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap'



export const ProjectForm =   ({empleados, onHide, refresh}:any) => {
  
  
  const API_ROUTE = 'https://api-psa-projects.herokuapp.com/proyectos';
  const FAKE_API_ROUTE = '/api/projects'
  const [project, setProyect] = useState({
            "name": "string",
            "description": "string",
            "idLeader": 0,
            "initialDate": "2022-07-03T00:05:13.971Z"
  })

  const  handleChange =({target:{name,value}}:any) => {
     
   //console.log(name,value)
   setProyect({...project,[name]:value})
   
  }
    const handleSubmit = async (e: any) => {
        
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*'
        }
      }
        
        e.preventDefault();
        //console.log('creando proyecto')
        const res = await axios.post(API_ROUTE,project, headers)

       // console.log(res)
        refresh()
        onHide()
    }
  

  return (
    <>
     <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label  className="form-label">Nombre </label>
            <input name="name" type="text" className="form-control" placeholder='Nuevo proyecto de PSA' onChange={handleChange} required/>
              
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripción</label>
            <textarea required name="description" className="form-control"  rows={5} onChange={handleChange}></textarea>
          </div>

          <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Lider de proyecto</label>
          <select name="idLeader" className="form-select form-select-sm" aria-label="Default select example" onChange={handleChange}>
                     {empleados.map((empleado:any)=><option key={empleado.legajo} value={empleado.legajo}>{`${empleado.Nombre} ${empleado.Apellido}`}</option>)} 
         </select>
          </div>
          
          <div className="mb-3">
             <label htmlFor="startDate">Start</label>
             <input required className="form-control" type="date" name="initialDate" onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary btn-psa mt-4">Crear </button>   
          
          </form>
    
    </>
  )
}
  