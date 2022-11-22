import { Modal, Button } from 'react-bootstrap';

export default function ConfirmTicketCreationModal(props: any) {
	const { ticketId } = props;
	const handleClick = () => {
		window.location.reload();
	};
	return (
		<Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>{props.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>Se creo el ticket exitosamente!</div>
				<div># Ticket Id: {ticketId}</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleClick}>Ok</Button>
			</Modal.Footer>
		</Modal>
	);
}
