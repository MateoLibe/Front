




export const getTicketsByTareaId= async(taskID) => {

    const TICKETS_API_ROUTE =`https://squad-9-2022-1c.herokuapp.com/v1/support/tickets?taskId=${taskID}`
    const resp = await fetch(TICKETS_API_ROUTE);
    const data = await resp.json();
    
    const tickets = {tickets:data}

    return tickets;

  }



  export const getListadoProyectos= async() => {

    const PROJECT_API_ROUTE =`https://api-psa-projects.herokuapp.com/proyectos`
    const resp = await fetch(PROJECT_API_ROUTE);
    const data = await resp.json();
    
    const proyectos = {data:data}

    return proyectos;

  }



