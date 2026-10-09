import Header from './Header';
import Sidebar from './Sidebar';
import SummaryCards from './SummaryCards';
import RecentActivity from './RecentActivity';
import Footer from './Footer';

export default function DashboardPage() {
    return (
        <div className="dashboard-page">
            <Header />

            <div className='dashboard-page-layout'>
                <Sidebar />

                <div className='dashboard-page-content'>
                    <h2>Here is an overview of your stakeholder relationships</h2>
                    <SummaryCards />
                    <RecentActivity />
                </div>
            </div>

            <Footer />
        </div>
    );
}