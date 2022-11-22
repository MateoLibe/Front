export default interface Task {
	name: string;
	description: string;
	assigneeId: number;
	priorityId: number;
	projectId: string;
	relatedTicketId: number;
}