import Link from "next/link";
import React from "react";
import styles from "../../styles/Home.module.css";

export default function Welcome() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido a PSA Sistema de Gestión</h1>
        <h2 className={styles.title}>
          {/* <a href="/proyectos/">Proyectos</a> */}
          <Link href="/proyectos"> Proyectos </Link>
        </h2>
        <h2 className={styles.title}>
          <a href="/soporte/">Soporte</a>
        </h2>
        <h2 className={styles.title}>
          <a href="/recursos/">Carga de horas</a>
        </h2>
      </main>
    </div>
  );
}
