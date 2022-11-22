import { useState, useEffect } from 'react';
import searchBarStyles from '../styles/SearchBar.module.css';
import CardsContainerComponent from './CardsContainer';

export default function SearchProductsComponent() {
	const [query, setQuery] = useState('');

	return (
		<>
			<div className={searchBarStyles.searchContainer}>
				<input
					className={searchBarStyles.searchProduct}
					type='text'
					placeholder='Buscar Productos'
					aria-label='Search'
					onChange={(event) => setQuery(event.target.value)}
				/>
			</div>
			<CardsContainerComponent query={query} />
		</>
	);
}
