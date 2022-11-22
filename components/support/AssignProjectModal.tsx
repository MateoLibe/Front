import { Modal, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { getEmployees, updateNewTicket } from '../../pages/api/support';
import Link from 'next/link';

interface Employee {
	id: number;
	firstName: string;
	lastName: string;
}

export default function AssignProjectModal(props: any) {
	const { ticket } = props;
	const { id, title, description, severity, assignedEmployee, category, status } = ticket;
	const [state, setState] = useState({
		id,
		title,
		description,
		severity,
		category,
		status,
		employeeId: assignedEmployee.id,
	});
	const [validated, setValidated] = useState(false);
	const [employee, setEmployee] = useState<Array<Employee>>([]);

	const categories = ['error', 'incident', 'question', 'suggestion'];
	const availableStatus = ['pending', 'in_progress', 'blocked', 'resolved', 'closed', 'cancelled'];

	const handleSubmit = (event: any) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false || state.title === '' || state.description === '') {
			event.preventDefault();
			event.stopPropagation();
			setValidated(true);
			return;
		}
		updateNewTicket(state, state.id);
		event.preventDefault();
		window.location.reload();
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
			setEmployee(data);
		}
		fetchData();
	}, []);

	return (
		<Modal {...props} size='md' aria-labelledby='contained-modal-title-vcenter' centered>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>{ticket.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row className='justify-content-md-center'>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Row className='g-2'>
								<Form.Label>Titulo: </Form.Label>

								<Col md>
									<Form.Control
										required
										type='text'
										placeholder='Titulo del ticket'
										name='title'
										onChange={handleOnChange}
										defaultValue={ticket.title}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Row className='g-2'>
								<Col xs={6} md={4}>
									<Form.Label>Severidad: </Form.Label>
								</Col>
								<Col>
									<Form.Range
										min='1'
										max='5'
										name='severity'
										onChange={handleOnChange}
										defaultValue={ticket.severity}
									/>
								</Col>
							</Row>
						</Form.Group>

						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Row className='g-2'>
								<Col xs={6} md={4}>
									<Form.Label>Responsable: </Form.Label>
								</Col>
								<Col md>
									<Form.Select
										aria-label='Default select example'
										defaultValue={ticket.assignedEmployee.id}
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
								<Col xs={6} md={4}>
									<Form.Label>Estado: </Form.Label>
								</Col>
								<Col md>
									<Form.Select aria-label='Default select example' onChange={handleOnChange} name='status'>
										{availableStatus.map((currentStatus, index) => (
											<option key={index} value={currentStatus}>
												{currentStatus}
											</option>
										))}
									</Form.Select>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Row className='g-2'>
								<Col xs={6} md={4}>
									<Form.Label>Categoria: </Form.Label>
								</Col>
								<Col md>
									<Form.Select aria-label='Default select example' onChange={handleOnChange} name='category'>
										{categories.map((category, index) => (
											<option key={index} value={category}>
												{category}
											</option>
										))}
									</Form.Select>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Col xs>
								<FloatingLabel controlId='floatingInput' className='mb-3' label='Descripción'>
									<Form.Control
										required
										as='textarea'
										rows={3}
										name='description'
										style={{ resize: 'none' }}
										onChange={handleOnChange}
										defaultValue={ticket.description}
									/>
								</FloatingLabel>
							</Col>
						</Form.Group>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Link
						href={{
							pathname: '/soporte/asignarProyecto',
							query: {
								ticketId: ticket.id,
							},
						}}>
						<Button variant='contained' color='primary' style={{ margin: '5px' }}>
							Crear Tarea
						</Button>
					</Link>
					<Button variant='contained' color='success' type='submit'>
						Guardar Cambios
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
