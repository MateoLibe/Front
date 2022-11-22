
import { MainLayout } from '../../components/layouts/MainLayout';
import  Link from 'next/link';
import { BreadCrumb } from '../../components/ui/BreadCrumb';
import { useState, useEffect } from 'react';
import { ModalCrearProyecto } from '../../components/ModalCrearProyecto';
import { useRouter } from 'next/router';
 //;


const empleados =[{"legajo":1,"Nombre":"Mario","Apellido":"Mendoza"},{"legajo":2,"Nombre":"Maria","Apellido":"Perez"},{"legajo":3,"Nombre":"Patricia","Apellido":"Gaona"}]

export const getServerSideProps = async()=>{

  const resp = await fetch('https://api-psa-projects.herokuapp.com/proyectos');
  const data = await resp.json();

  return({
    props:{
      data:data.data
    }
  })
}

export default function Proyects({data}:any) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  }
  const [showModal, setShowModal]= useState(false);
  const handleClose = ()=> setShowModal(false);
  const handleShow = ()=> setShowModal(true)
  
 

  //console.log(data)
  
  
  return (
   <MainLayout>
 
      <div className="content_title p-5">
        <div className='d-flex justify-content-between mb-4'>
          <h2>Proyectos</h2>
          <button onClick={handleShow}className="btn btn-primary btn-psa">+ Nuevo Proyecto</button>

            <ModalCrearProyecto show={showModal} onHide={handleClose}  refresh={refreshData} empleados={empleados}/>
        </div>
        <BreadCrumb />

        
        <table className="table table-striped table-hover " data-pagination="true" >
          <thead className='psa__table'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Fecha Inicio</th>
              <th scope="col">Lider</th>
              <th scope="col">Estado</th>
             
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: any) => {
              return (
                <Link key = {item.id} href={`/proyectos/${item.id}`}>
                 
                  <tr >
                
                    <th scope="row">  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></th>
                    <td>PSA-00{item.id}</td>
                    <td>{item.name}</td>
                    <td className='fw-bold'>{item.initialDate.split('T')[0]}</td>
                    <td>{item.leader
                            ? `${item.leader.name} ${item.leader.lastName} `
                            : "-" } </td>
                    <td>{item.status}</td> 
                    
                   
                  </tr>
                  
                </Link>)
            })}
          </tbody>
        </table>
      </div>
    </MainLayout>
  )
}
 