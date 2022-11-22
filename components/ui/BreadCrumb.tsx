import React from 'react'

interface currentValue{
    currentValue? :string ;
}

export const BreadCrumb = ({currentValue}:currentValue) => {
  return (
 
      <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Proyectos</li>
              {
                (currentValue)
                 ?<li className="breadcrumb-item active" aria-current="page">{currentValue}</li>
                 :null
              }
            
          </ol>
      </nav>
  )
}
