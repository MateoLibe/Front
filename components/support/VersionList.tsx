import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../../pages/soporte/styles/TicketsLink.module.css'

export default function VersionList(props: any) {
	const { versions, query } = props;

	return (
		<>
			{versions
				.filter((actual_version: any) => {
					return actual_version.toLowerCase().includes(query);
				})
				.map((actual_version: any, i: number) => (
					<ListGroup as='ol' key={i}>
						<Link
							href={{
								pathname: '/soporte/version',
								query: {
									productId: props.productId,
									productName: props.productName,
									version: actual_version,
								},
							}}>
							<ListGroup.Item
								as='li'
								className='d-flex justify-content-between align-items-start'
								id={styles.ticket_link}>
								<div className='ms-2 me-auto'>
									<div>
										<b>{actual_version}</b>
									</div>
								</div>
							</ListGroup.Item>
						</Link>
					</ListGroup>
				))}
		</>
	);
}
