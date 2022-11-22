import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { ticketsHandler } from '../../api/support';
import styles from '../styles/TicketsLink.module.css';
import Moment from 'moment';
import AssignProjectModal from '../../../components/support/AssignProjectModal';

interface Ticket {
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
	creationDate: string;
	lastUpdate: string;
	closingDate: string;
}
interface Product {
	productId: number;
	version: string;
}

export default function TicketsTable(props: any) {
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { filterValue, productId, version } = props;

	const defaultModalState = {
		show: false,
		ticket: {
			id: 0,
			title: '',
			description: '',
			severity: 1,
			status: 'pending',
			assignedEmployee: {
				id: 0,
				firstName: '',
				lastName: '',
			},
			category: 'error',
			clientId: 1,
			productId: 0,
			version: '',
		},
	};

	const [modalState, setModalState] = useState(defaultModalState);
	const dateFormat = 'YY-MM-DD, h:mm';

	const colorOfStatus = (state: String) => {
		if (state === 'blocked') return 'black';
		if (state === 'pending') return 'orange';
		else return 'green';
	};

	const handleSelectedTicket = (ticket: any) => {
		setModalState({
			show: true,
			ticket: {
				id: ticket.id,
				title: ticket.title,
				description: ticket.description,
				severity: ticket.severity,
				assignedEmployee: ticket.assignedEmployee,
				category: ticket.category,
				clientId: ticket.client.id,
				productId: ticket.productId,
				version: ticket.version,
				status: ticket.status,
			},
		});
	};

	useEffect(() => {
		async function getTickets() {
			if (productId && version) {
				const data = await ticketsHandler(productId, version);
				setTickets(data);
				setIsLoading(false);
			}
		}
		getTickets();
	}, [productId, version]);

	useEffect(() => {}, [props.query]);

	const tableData =
		!!tickets &&
		tickets
			.filter((ticket: Ticket) => {
				return (
					ticket.title.toLowerCase().includes(props.query) ||
					ticket.assignedEmployee.firstName.toLowerCase().includes(props.query) ||
					ticket.assignedEmployee.lastName.toLowerCase().includes(props.query)
				);
			})
			.map(function (ticket: Ticket, i: number) {
				if (filterValue == 'sinFiltro' || ticket.status == filterValue) {
					return (
						<tr key={i}>
							<td>{ticket.id}</td>
							<td onClick={() => handleSelectedTicket(ticket)} className={styles.ticketName}>
								{ticket.title}
							</td>
							<td>{ticket.severity}</td>
							<td className='fw-bold'>{Moment(ticket.creationDate).format(dateFormat)}</td>
							<td>{Moment(ticket.lastUpdate).format(dateFormat)}</td>
							<td>
								{ticket.assignedEmployee
									? ticket.assignedEmployee.firstName + ' ' + ticket.assignedEmployee.lastName
									: ''}
							</td>
							<td
								className='fw-bold'
								style={{ color: colorOfStatus(ticket.status.toLowerCase()), textAlign: 'center' }}>
								{ticket.status.toUpperCase()}
							</td>
						</tr>
					);
				}
			});

	return (
		<>
			{isLoading ? (
				<div className='alert alert-info text-center'>Loading...</div>
			) : (
				<Table className='table table-striped table-hover ' data-pagination='true'>
					<thead className='psa__table' style={{ textAlign: 'center' }}>
						<tr>
							<th>ID</th>
							<th>Nombre</th>
							<th>Severidad</th>
							<th>Fecha Creación</th>
							<th>Ultima modificación</th>
							<th>Responsable</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody style={{ textAlign: 'center' }}>{tableData}</tbody>
					{modalState.show && (
						<AssignProjectModal
							show={modalState.show}
							ticket={modalState.ticket}
							onHide={() =>
								setModalState({
									...modalState,
									show: false,
								})
							}
						/>
					)}
				</Table>
			)}
		</>
	);
}
