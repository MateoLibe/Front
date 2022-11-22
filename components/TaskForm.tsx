import axios from 'axios';
import React, { useState } from 'react'

export const TaskForm = ({empleados,projectId, onHide, refresh}:any) => {
    const API_ROUTE = 'https://api-psa-projects.herokuapp.com/tareas';
    const FAKE_API_ROUTE = '/api/tasks'
    const [project, setProyect] = useState({
        "name": "string",
        "description": "string",
        "idAssigned": 0,
        "idPriority": 3,
        "idProject": projectId
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
          //console.log('creando tarea')
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
              <input name="name" type="text" className="form-control" placeholder='Nuevo tarea para ' onChange={handleChange} required/>
                
            </div>
  
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripción</label>
              <textarea required name="description" className="form-control"  rows={5} onChange={handleChange}></textarea>
            </div>
  
            <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Responsable Tarea</label>
            <select name="idAssigned" className="form-select form-select-sm" aria-label="Default select example" onChange={handleChange}>
                       <option value="0"  >-</option>
                       {empleados.map((empleado:any)=><option key={empleado.legajo} value={empleado.legajo}>{`${empleado.Nombre} ${empleado.Apellido}`}</option>)} 
           </select>
            </div>
            

            <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Prioridad</label>
            <select name="idPriority" className="form-select form-select-sm" aria-label="Default select example" onChange={handleChange}>
                        <option value="1"  >Alta</option>
                        <option value="2"  >Media</option>
                        <option value="3" selected >Baja</option>
           </select>
            </div>


            
            <button type="submit" className="btn btn-primary btn-psa mt-4">Crear Tarea</button>
            
            </form>
      
      </>
    )
}
