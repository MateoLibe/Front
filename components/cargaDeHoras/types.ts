export interface Project {
    name: string
    id: number
}

export type Projects = Array<Project>

export interface Task {
    
        id: number
        name: string
        description: string
        status: string
        priority: string
        assigned: {
          legajo: number
          name: string
          lastName: string
        }
        creator: {
          legajo: number
          name: string
          lastName: string
        }
        creationDate: string
        projectId: number
        projectName: string
}

export type Tasks = Array<Task>

export interface HourLoad {
    idCarga: number
    horas: number
    tarea: string
    proyecto: string
    fecha: string
    legajoPersona: number
    nombreTarea: string
}

export type HourLoads = Array<HourLoad>