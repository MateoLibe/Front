import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import VersionList from './VersionList';
import { useState } from 'react';
import searchBarStyles from '../styles/SearchBar.module.css';
import Link from 'next/link';

export interface Version {
	name: string;
	amountOfTickets: number;
}

export default function ConfirmModal(props: any) {
	const { taskId } = props;
	const handleClick = () => {
		window.location.reload();
	};

	return (
		<Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>{props.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>Se ha creado exitosamente la tarea en el proyecto</div>
				<div># Task Id: {taskId}</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='contained' color='success' onClick={handleClick}>
					Ok
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
