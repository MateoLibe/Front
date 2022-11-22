export default interface Ticket {
	id: number;
	title: string;
	description: string;
	severity: number;
	assignedEmployee: {
		id: number;
		firstName: string;
		lastName: string;
	};
	category: string;
	status: string;
	client: {
		id: number;
		name: string;
		cuit: string;
	};
	productId: number;
	version: string;
	relatedTasks: number[];
	creationDate: string;
	lastUpdate: string;
	closingDate: string;
}
