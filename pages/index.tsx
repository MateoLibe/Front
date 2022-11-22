import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { MainLayout } from '../components/layouts/MainLayout';

export default function Home() {
	return (
		<MainLayout>
			<div className={styles.container}>
				<div className='content_title p-5'>
					<h2>Bienvenido a PSA SPR SYSTEM</h2>
				</div>

				<div className='modules d-flex justify-content-center align-items-center'>
					<div className='modules_app '>
						<Link href='/proyectos'>
							<div>
								<img src='/assets/img/icon_proyectos_xl.svg' alt='profile_picture' />
								<h3 className='module_title text-center'>Proyectos</h3>
							</div>
						</Link>
					</div>

					<Link href='/soporte'>
						<div className='modules_app '>
							<img src='/assets/img/icon_soporte_xl.svg' alt='profile_picture' />
							<h3 className='module_title text-center'>Soporte</h3>
						</div>
					</Link>
				</div>
			</div>
		</MainLayout>
	);
}
