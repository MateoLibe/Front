import { Modal, Button, Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { createNewTicket, getClients, getEmployees } from '../../pages/api/support';
import ConfirmTicketCreationModal from './ConfirmTicketCreationModal';
import Ticket from './interfaces/Ticket';

interface Employee {
	id: number;
	firstName: string;
	lastName: string;
}

interface Client {
	id: number;
	name: string;
	cuit: string;
}

export default function NewTicketModal(props: any) {
	const [validated, setValidated] = useState(false);
	const [ticketIdModal, setTicketIdModal] = useState({
		show: false,
		ticketId: 0,
	});
	const [isLoading, setLoading] = useState(false);
	const [employee, setEmployee] = useState<Array<Employee>>([]);
	const [client, setClient] = useState<Array<Client>>([]);
	const [state, setState] = useState({
		title: '',
		description: '',
		severity: 3,
		assignedEmployee: 1,
		category: 'error',
		status: 'pending',
		clientId: 1,
		productId: !!props.productId && props.productId,
		version: !!props.version && props.version,
	});

	const handleSubmit = async (event: any) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false || state.title === '' || state.description === '') {
			event.preventDefault();
			event.stopPropagation();
			setValidated(true);
			return;
		}
		setLoading(true);
		const ticketData: Ticket = await createNewTicket(state);
		setTicketIdModal({
			ticketId: ticketData.id,
			show: true,
		});
		setLoading(false);
		// event.preventDefault();
		// window.location.reload()
	};

	const handleOnChange = ({ target }: { target: any }) => {
		setState({
			...state,
			[target.name]: target.value,
		});
	};

	useEffect(() => {
		async function fetchData() {
			const data: Array<Employee> = await getEmployees();
			const clientsData: Array<Client> = await getClients();

			setEmployee(data);
			setClient(clientsData);
		}
		fetchData();
	}, []);

	useEffect(() => {
		setState({
			title: '',
			description: '',
			severity: 3,
			assignedEmployee: 1,
			category: 'error',
			status: 'pending',
			clientId: 1,
			productId: !!props.productId && props.productId,
			version: !!props.version && props.version,
		});
	}, [props.version, props.productId]);

	return (
		<>
			<Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
				<Modal.Header closeButton>
					<Modal.Title> Nuevo Ticket </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Row className='g-2'>
								<Col md>
									<Form.Label>Titulo: </Form.Label>
									<Form.Control
										name='title'
										type='text'
										placeholder='Titulo del ticket'
										onChange={handleOnChange}
										required
									/>
									<Form.Control.Feedback type='invalid'>Por favor ingrese un titulo</Form.Control.Feedback>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Row className='g-2'>
								<Col md>
									<Form.Label>Severidad: </Form.Label>
								</Col>
								<Col md>
									<Form.Range min='1' max='5' onChange={handleOnChange} name='severity' />
								</Col>
							</Row>
						</Form.Group>

						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Row className='g-2'>
								<Form.Label>Responsable: </Form.Label>

								<Col md>
									<Form.Select
										aria-label='Default select example'
										onChange={handleOnChange}
										name='assignedEmployee'>
										{employee.map((employeeData, index) => (
											<option key={index} value={employeeData.id}>
												{`${employeeData.id} - ${employeeData.firstName} ${employeeData.lastName}`}
											</option>
										))}
									</Form.Select>
									<Form.Text className='text-muted'>Legajo - Nombre Apellido</Form.Text>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Row className='g-2'>
								<Form.Label>Cliente: </Form.Label>
								<Col md>
									<Form.Select aria-label='Default select example' onChange={handleOnChange} name='clientId'>
										{client.map((value, index) => (
											<option key={index} value={value.id}>
												{value.name}
											</option>
										))}
									</Form.Select>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<FloatingLabel controlId='floatingSelectGrid' label='Descipción'>
								<Form.Control
									as='textarea'
									rows={3}
									onChange={handleOnChange}
									name='description'
									required
								/>
							</FloatingLabel>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button type='submit' variant='primary' disabled={isLoading} onClick={handleSubmit}>
						{isLoading ? 'Cargando…' : 'Confirmar'}
					</Button>
				</Modal.Footer>
			</Modal>
			<ConfirmTicketCreationModal
				show={ticketIdModal.show}
				ticketId={ticketIdModal.ticketId}
				productId={props.productId}
				version={props.version}
				productName={props.productName}
				onHide={() => setTicketIdModal(ticketIdModal)}
			/>
		</>
	);
}
