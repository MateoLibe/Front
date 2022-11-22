import { useState, useEffect } from 'react';
import searchBarStyles from '../styles/SearchBar.module.css';

export default function SearchTicketsComponent() {
	const [items, setItems] = useState(['ejemplo1', 'ejemplo2', 'ejemplo3']);

    const handleSearchTickets = ({}) => {};

	useEffect(() => {
		const result = ['product1', 'product2', 'product3'];
	}, []);

	return (
		<div className={searchBarStyles.searchContainer}>
			<input
				className={searchBarStyles.searchTicket}
				type='text'
				placeholder='Buscar Tickets'
				aria-label='Search'
                onChange={handleSearchTickets}
			/>
		</div>
	);
}
