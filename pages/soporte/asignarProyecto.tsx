import { Row, Col, Card, Container, Modal } from 'react-bootstrap';
import styles from '../../pages/soporte/styles/CardsContainer.module.css';
import { useState, useEffect } from 'react';
import { getProjects } from '../api/support';
import Proyects from '../proyectos';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components/layouts/MainLayout';
import CustomProyectModal from '../../components/support/ProyectModal';

interface Proyect {
	id: number;
	name: string;
}

interface EmptyStateInterface {
	show: boolean;
	id: number;
	proyectName: string;
}

const modalEmptyState: EmptyStateInterface = {
	show: false,
	id: 0,
	proyectName: '',
};

export default function AsignarProyecto(props: any) {
	const router = useRouter();
	const data = router.query;
	const [isLoading, setIsLoading] = useState(true);
	const [modalState, setModalShow] = useState(modalEmptyState);
	const [projects, setProjects] = useState<Proyect[]>([]);

	useEffect(() => {
		async function getAllProjects() {
			const data = await getProjects();
			const dataValues: Array<Proyect> = Object.values(data);
			const productsBuff = [];
			for (var i = 0; i < dataValues.length; i++) {
				productsBuff.push({
					id: dataValues[i].id,
					name: dataValues[i].name,
				});
			}
			setProjects(productsBuff);
			setIsLoading(false);
		}
		getAllProjects();
	}, []);

	return (
		<MainLayout>
			<h1 style={{ textAlign: 'center', margin: '20px' }}> Proyectos Disponibles </h1>
			<Container className={styles.cardsContainer}>
				{isLoading ? (
					<div className='alert alert-info text-center'>Loading...</div>
				) : (
					<Row md={3} className='g-4'>
						{projects.map((proyect: Proyect, i: number) => (
							<Col xs={2} key={i}>
								<Card className={styles.card}>
									<Card.Body
										onClick={() => {
											setModalShow({
												show: true,
												id: proyect.id,
												proyectName: proyect.name,
											});
										}}>
										<Card.Text>{proyect.name}</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
						<CustomProyectModal
							show={modalState.show}
							id={modalState.id}
							name={modalState.proyectName}
							ticketId={data.ticketId}
							projectId={modalState.id}
							onHide={() => setModalShow(modalEmptyState)}
						/>
					</Row>
				)}
			</Container>
		</MainLayout>
	);
}
