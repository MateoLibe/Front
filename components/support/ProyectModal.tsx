import { Modal, Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';
import { createTaskInProject, getEmployees } from '../../pages/api/support';

export interface Version {
	name: string;
	amountOfTickets: number;
}
interface Employee {
	id: number;
	firstName: string;
	lastName: string;
}

interface TaskCreationResp {
	id: number;
}

export default function CustomProyectModal(props: any) {
	const [modalState, setModalState] = useState({
		show: false,
		taskId: 0,
	});

	const [employee, setEmployee] = useState<Array<Employee>>([]);
	const [state, setState] = useState({
		name: '',
		description: '',
		assigneeId: 0,
		priorityId: 0,
		projectId: !!props.projectId && props.projectId,
		relatedTicketId: !!props.ticketId && props.ticketId,
	});
	const [validated, setValidated] = useState(false);

	const handleSubmit = async (event: any) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			setValidated(true);
			return;
		}
		const taskData: TaskCreationResp = await createTaskInProject(state);
		setModalState({
			show: true,
			taskId: taskData.id,
		});
		console.log(taskData);
		// event.preventDefault();
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

	useEffect(() => {
		setState({
			name: '',
			description: '',
			assigneeId: 0,
			priorityId: 0,
			projectId: props.projectId,
			relatedTicketId: props.ticketId,
		});
	}, [props.projectId, props.ticketId]);

	return (
		<Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>{props.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
						<Row className='g-2'>
							<Form.Label>Titulo: </Form.Label>

							<Col md>
								<Form.Control
									type='text'
									name='name'
									placeholder='Titulo de la Tarea'
									required
									onChange={handleOnChange}
								/>
								<Form.Control.Feedback type='invalid'>Por favor ingrese un titulo</Form.Control.Feedback>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group className='mb-3' onChange={handleOnChange}>
						<Row className='g-2'>
							<Col md>
								<Form.Label>Severidad: </Form.Label>
							</Col>
							<Col md>
								<Form.Range min='1' max='3' />
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
									name='assigneeId'>
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
						<FloatingLabel controlId='floatingSelectGrid' label='Descipción'>
							<Form.Control as='textarea' rows={3} onChange={handleOnChange} name='description' required />
						</FloatingLabel>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button type='submit' variant='primary' color='success' onClick={handleSubmit}>
					Crear Tarea
				</Button>
			</Modal.Footer>
			<ConfirmModal
				show={modalState.show}
				taskId={modalState.taskId}
				onHide={() => setModalState({ ...modalState, show: false })}
			/>
		</Modal>
	);
}
