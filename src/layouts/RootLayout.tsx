import { Link, Outlet } from 'react-router';
import { useCarUiStore } from '../store/useCarUiStore';

export default function RootLayout() {
    const favoriteCount = useCarUiStore((state) => state.favoriteCarIds.length);

    return (
        <div className="app">
            <header className="site-header">
                <nav className="site-nav">
                    <ul>
                        <li><Link to="/">Strona główna</Link></li>
                        <li><Link to="/cars">Lista samochodów</Link></li>
                        <li><Link to="/cars/new">Dodaj samochód</Link></li>
                        <li className="favorite-counter">Ulubione: {favoriteCount}</li>
                    </ul>
                </nav>
            </header>
            <main className="main-content"><Outlet /></main>
        </div>
    );
}