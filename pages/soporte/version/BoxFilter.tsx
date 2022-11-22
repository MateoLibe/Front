import { useState, useEffect } from 'react';
import versionStyles from '../styles/Version.module.css';
import TicketsTable from './TicketsTable';
import NewTicketModal from '../../../components/support/NewTicketModal';
import { Row, Col } from 'react-bootstrap';
import searchBarStyles from '../styles/SearchBar.module.css';

export default function BoxFilterComponent(this: any, props: any) {
	const [query, setQuery] = useState('');
	const { version, productId, productName } = props;
	const modalDefaultState = {
		show: false,
		assignedEmployee: 0,
		clientId: 1,
		productId: !!productId && productId,
		version: !!version && version,
	};

	const [newTicketModalShow, setNewTicketModalShow] = useState(modalDefaultState);
	const [filterValue, setFilterValue] = useState('sinFiltro');

	const handleChange = ({ target: { value } }: any) => {
		setFilterValue(value);
	};

	useEffect(() => {
		setNewTicketModalShow({
			...newTicketModalShow,
			version: version,
			productId: productId,
		});
	}, [version, productId]);

	return (
		<>
			<Row className={versionStyles.horizontalContainer}>
				<Col xl={10}>
					<div className={searchBarStyles.searchContainer}>
						<input
							className={searchBarStyles.filterTicket}
							type='text'
							placeholder='Buscar por nombre, reesponsable, id...'
							aria-label='Search'
							onChange={(event) => setQuery(event.target.value)}
						/>
					</div>
				</Col>
			</Row>

			{/* <Row className={versionStyles.horizontalContainer}> */}
			<Row className='g-2'>
				<Col>
					<Row>
						<Col md={2}>Filtrar por:</Col>
						<Col md={4}>
							<select onChange={handleChange}>
								<option value='sinFiltro'> - </option>
								<option value='pending'>Pendientes</option>
								<option value='closed'>Cerrados</option>
								<option value='blocked'>Bloqueados</option>
								<option value='resolved'>Resuelto</option>
							</select>
						</Col>
					</Row>
				</Col>
				<Col md={2}>
					<button
						onClick={() => {
							setNewTicketModalShow({
								show: true,
								assignedEmployee: 0,
								clientId: 1,
								productId: productId,
								version: version,
							});
						}}
						className='btn btn-primary btn-psa'>
						+ Nuevo Ticket
					</button>
				</Col>
			</Row>
			<br></br>
			<TicketsTable filterValue={filterValue} productId={productId} version={version} query={query} />
			<NewTicketModal
				show={newTicketModalShow.show}
				data={newTicketModalShow}
				productId={!!productId && productId}
				version={!!version && version}
				productName={!!productName && productName}
				onHide={() => setNewTicketModalShow(modalDefaultState)}
			/>
		</>
	);
}
