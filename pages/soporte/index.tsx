import SearchTicketsComponent from './home/SearchTickets';
import SearchProductsComponent from './home/FilterProducts';

import 'bootstrap/dist/css/bootstrap.min.css';
import globalStyles from '../../styles/Home.module.css';
import { MainLayout } from '../../components/layouts/MainLayout';
import WelcomeSupport from './home/WelcomeSupport';

export default function Home() {
	return (
		<MainLayout>
			<div className={globalStyles.container}>
				<main className={globalStyles.main}>
					<WelcomeSupport />
					<SearchProductsComponent />
				</main>
			</div>
		</MainLayout>
	);
}
