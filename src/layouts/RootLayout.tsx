import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';

export default function RootLayout() {
    return (
        <div className="app">
            <header className="site-header">
                <Navigation />
            </header>
            <main className="main-content"><Outlet /></main>
        </div>
    );
}