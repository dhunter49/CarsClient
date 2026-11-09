import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getCars } from '../services/carService';
import type { Car } from '../models/Car';
import CarCard from '../components/CarCard';
import { useCarUiStore } from '../store/useCarUiStore';
import axios from 'axios';

export default function CarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchTerm = useCarUiStore((state) => state.searchTerm);
    const setSearchTerm = useCarUiStore((state) => state.setSearchTerm);
    const showFavoritesOnly = useCarUiStore((state) => state.showFavoritesOnly);
    const setShowFavoritesOnly = useCarUiStore((state) => state.setShowFavoritesOnly);
    const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);

    const normalizedSearch = searchTerm.trim().toLowerCase();
    const visibleCars = cars.filter((car) => {
        const matchesSearch =
            car.brand.toLowerCase().includes(normalizedSearch) ||
            car.model.toLowerCase().includes(normalizedSearch);
        const matchesFavorite =
            !showFavoritesOnly || favoriteCarIds.includes(car.id);

        return matchesSearch && matchesFavorite;
    });

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCars() {
            try {
                setIsLoading(true);
                setError(null);
                const loadedCars = await getCars(controller.signal);
                setCars(loadedCars);
            } catch (caughtError) {
                if (axios.isCancel(caughtError)) {
                    return;
                }
                
                if (caughtError instanceof Error) {
                    setError(caughtError.message);
                } else {
                    setError('Nieznany błąd');
                }
            } finally {
                if(!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        fetchCars();

        return () => {
            controller.abort();
        };
    }, []);

    if (isLoading) {
        return <p className="page">Ładowanie...</p>;
    }

    if (error) {
        return <p className="page error">Błąd: {error}</p>;
    }

    if(cars.length === 0) {
        return (
            <div className="page">
                <p>Brak samochodów do wyświetlenia.</p>
                <Link to="/cars/new">Dodaj nowy samochód</Link>
            </div>
        );
    }

    return (
        <>
            <div className="cars-toolbar">
                <input
                    type="search"
                    placeholder="Szukaj po marce lub modelu..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <label className="favorite-filter">
                    <input
                        type="checkbox"
                        checked={showFavoritesOnly}
                        onChange={(event) => setShowFavoritesOnly(event.target.checked)}
                    />
                    Tylko ulubione
                </label>
            </div>
            {visibleCars.length > 0 ? (
                <section className="cars-grid">
                    {visibleCars.map((car) => (
                        <CarCard
                            key={car.id}
                            car={car}
                        />
                    ))}
                </section>
            ) : (
                <p className="page">Brak samochodów pasujących do wybranych kryteriów.</p>
            )}
        </>
    );
}