const URI = 'https://squad-9-2022-1c.herokuapp.com';
const PATH = 'v1/support';

interface Ticket {
	title: string;
	description: string;
	severity: number;
	assignedEmployee: number,
	category: string;
	clientId: number;
	productId: number;
	version: string;
	status: string;
}

interface Task {
	name: string;
	description: string;
	assigneeId: number;
	priorityId: number;
	projectId: string;
	relatedTicketId: number;
}

async function ticketsHandler(productId: number, version: string) {
	try {
		const res = await fetch(`${URI}/${PATH}/tickets?productId=${productId}&version=${version}`, { mode: 'cors' });
		return res.json();
	} catch (err) {
		console.log(err);
	}
}

async function getEmployees() {
	try {
		const res = await fetch(`${URI}/${PATH}/employee`, { mode: 'cors' });
		return res.json();
	} catch (err) {
		console.log(err);
	}
}

async function getClients() {
	try {
		const res = await fetch(`${URI}/${PATH}/client`, { mode: 'cors' });
		return res.json();
	} catch (err) {
		console.log(err);
	}
}

async function getTicketByIdHandler(ticketId: number) {
	try {
		const res = await fetch(`${URI}/${PATH}/tickets/${ticketId}`, { mode: 'cors' });
		return res.json();
	} catch (err) {
		console.log(err);
	}
}

async function createNewTicket(ticket: Ticket) {
	try {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: ticket.title,
				description: ticket.description,
				severity: ticket.severity,
				assignedEmployeeId: ticket.assignedEmployee,
				category: ticket.category,
				clientId: ticket.clientId,
				productId: ticket.productId,
				version: ticket.version,
			}),
		};
		const res = await fetch(`${URI}/${PATH}/tickets`, requestOptions);
		return res.json();
	} catch (err) {
		console.log(err);
	}
}

async function updateNewTicket(ticket: any, id: number) {
	try {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: ticket.title,
				description: ticket.description,
				severity: ticket.severity,
				employeeId: ticket.assignedEmployee,
				category: ticket.category,
				status: ticket.status,
			}),
		};
		const res = await fetch(`${URI}/${PATH}/tickets/${id}`, requestOptions);
		return res.json();
	} catch (err) {
		console.log(err);
	}
}

async function getProducts() {
	try {
		const res = await fetch(`${URI}/${PATH}/product`, { mode: 'cors' });
		return res.json();
	} catch (err) {
		console.log(err);
	}
}

//Trae una lista te tareas
async function getProjects() {
	try {
		const res = await fetch(`${URI}/${PATH}/project`, { mode: 'cors' });
		return res.json();
	} catch (err) {
		console.log(err);
	}
}


//Agrega una tarea en un proyecto
async function createTaskInProject(task: Task) {
	try {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: task.name,
				description: task.description,
				assigneeId: task.assigneeId,
				priorityId: task.priorityId,
				projectId: task.projectId,
				relatedTicketId: task.relatedTicketId,
			}),
		};
		const res = await fetch(`${URI}/${PATH}/project/task`, requestOptions);
		console.log(res)
		return res.json();
	} catch (err) {
		console.log(err);
	}
}

export {
	ticketsHandler,
	createNewTicket,
	getProducts,
	getTicketByIdHandler,
	getEmployees,
	getClients,
	updateNewTicket,
	getProjects,
	createTaskInProject
};
