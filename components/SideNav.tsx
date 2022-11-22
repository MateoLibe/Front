import React from 'react'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
export const SideNav = () => {
  return (
    <>


    <Link href="/">
            <div className="menu_item d-flex col-1 logo">
                <img src="/assets/img/psa_logo.svg" alt="pr"/>
             </div>
    </Link>             
                  <div className="menu d-flex flex-column mt-5">
                        
                  <Link href="/proyectos">
                        <div className="menu_item d-flex justify-content-center align-items-center">
                            <img src="/assets/img/icon_proyectos.svg" alt="profile_picture"/>
                        </div>
                        </Link>  
                  <Link href="/soporte">
                        <div className="menu_item d-flex justify-content-center align-items-center">
                            <img src="/assets/img/icon_soporte.svg" alt="profile_picture"/>
                    </div>
                  </Link>
    </div>


    </>
  )
}
