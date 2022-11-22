import BoxFilterComponent from './version/BoxFilter';

import styles from '../../styles/Home.module.css';
import versionStyles from './styles/Version.module.css';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components/layouts/MainLayout';

export default function Version(props: any) {
	const router = useRouter();
	const data = router.query;

	return (
		<MainLayout>
			<div className={styles.container}>
				<div className='content_title p-5'>
					<h1> {data.productName} </h1>
					<h2 className={versionStyles.right}> version {data.version}</h2>
					<div className={versionStyles.ticketsContainer}>
						<BoxFilterComponent
							version={data.version}
							productName={data.productName}
							productId={data.productId}
						/>
						<div className={versionStyles.ticketsContainer}></div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
