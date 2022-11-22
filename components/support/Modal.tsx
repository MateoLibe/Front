import { Modal, Button } from 'react-bootstrap';
import VersionList from './VersionList';
import { useState } from 'react';
import searchBarStyles from '../styles/SearchBar.module.css';

export interface Version {
	name: string;
	amountOfTickets: number;
}

export default function CustomModal(props: any) {
	const [query, setQuery] = useState('');

	return (
		<Modal {...props} size='md' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>{props.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<VersionList versions={props.versions} query={query} productName={props.name} productId={props.id}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>
		</Modal>
	);
}
