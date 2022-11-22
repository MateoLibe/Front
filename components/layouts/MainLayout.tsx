import React, { FC } from 'react'

import { SideNav } from '../SideNav'
import { NavBar } from '../NavBar';
import '../../styles/Home.module.css'

export const MainLayout = ({children}:any) => {
  return (

    <>
      <main className="container-lg main-container d-flex flex-column">

          <div className="row  d-flex  flex-grow-1 ">
              <section className="sidebar  col-1  d-flex  flex-shrink-0 flex-column p-1 ">
                  <SideNav />
              </section>
              <section className="content col-11 d-flex flex-column p-0 ">
                  <NavBar />
                  <div>
                      {children}
                  </div>

              </section>
          </div>
      </main>
  
      </>
  )
}
