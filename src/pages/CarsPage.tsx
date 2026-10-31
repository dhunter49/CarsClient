import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getCars } from '../services/carService';
import type { Car } from '../models/Car';

export default function CarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCars() {
            try {
                setIsLoading(true);
                setError(null);
                const loadedCars = await getCars(controller.signal);
                setCars(loadedCars);
            } catch (caughtError) {
                if (
                    // Cancelled request
                    caughtError instanceof DOMException &&
                    caughtError.name === 'AbortError'
                ) {
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
        return <p>Ładowanie...</p>;
    }

    if (error) {
        return <p className="error">Błąd: {error}</p>;
    }

    if(cars.length === 0) {
        return (
            <div>
                <p>Brak samochodów do wyświetlenia.</p>
                <Link to="/create-car">Dodaj nowy samochód</Link>
            </div>
        );
    }

    return (
        <section className="cars-grid">
            {cars.map((car) => (
                <article key={car.id} className="car-card">
                    <h2>{car.brand} {car.model}</h2>
                    <p>Rok produkcji: {car.productionDate}</p>
                    <p>Rodzaj paliwa: {car.fuelType}</p>
                    <Link to={`/cars/${car.id}`}>Szczegóły</Link>
                </article>
            ))}
        </section>
    );
}