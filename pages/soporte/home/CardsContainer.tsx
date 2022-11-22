import { Row, Col, Card, Container } from 'react-bootstrap';
import CustomModal from '../../../components/support/Modal';
import styles from '../styles/CardsContainer.module.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../../api/support';

interface Product {
	id: number;
	name: string;
	versions: Array<string>;
}

interface EmptyStateInterface {
	show: boolean;
	id: number;
	productName: string;
	versions: Array<string>;
}

const modalEmptyState: EmptyStateInterface = {
	show: false,
	id: 0,
	productName: '',
	versions: [] as string[],
};

export default function CardsContainerComponent(props: any): JSX.Element {
	const [modalState, setModalShow] = useState(modalEmptyState);

	const [products, setProducts] = useState<Array<Product>>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getAllProducts() {
			const data = await getProducts();
			const dataValues: Array<Product> = Object.values(data);
			const productsBuff = [];
			for (var i = 0; i < dataValues.length; i++) {
				productsBuff.push({
					id: dataValues[i].id,
					name: dataValues[i].name,
					versions: dataValues[i].versions,
				});
			}
			setProducts(productsBuff);
			setIsLoading(false);
		}
		getAllProducts();
	}, []);

	const { query } = props;

	return (
		<>
			{isLoading ? (
				<div className='alert alert-info text-center'>Loading...</div>
			) : (
				<Container className={styles.cardsContainer}>
					<Row md={3} className='g-4'>
						{products
							.filter((product: Product) => {
								return product.name.toLowerCase().includes(query);
							})
							.map((product: Product, i: number) => (
								<Col xs={2} key={i}>
									<Card className={styles.card}>
										<Card.Body
											onClick={() => {
												setModalShow({
													show: true,
													id: product.id,
													productName: product.name,
													versions: product.versions,
												});
											}}>
											<Card.Text>{product.name}</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							))}
						<CustomModal
							show={modalState.show}
							id={modalState.id}
							name={modalState.productName}
							versions={modalState.versions}
							onHide={() => setModalShow(modalEmptyState)}
						/>
					</Row>
				</Container>
			)}
		</>
	);
}
