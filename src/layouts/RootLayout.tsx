import { Link, Outlet } from 'react-router';

export default function RootLayout() {
    return (
        <div className="app">
            <header className="site-header">
                <nav className="site-nav">
                    <ul>
                        <li><Link to="/">Strona główna</Link></li>
                        <li><Link to="/cars">Lista samochodów</Link></li>
                        <li><Link to="/cars/new">Dodaj samochód</Link></li>
                    </ul>
                </nav>
            </header>
            <main className="main-content"><Outlet /></main>
        </div>
    );
}