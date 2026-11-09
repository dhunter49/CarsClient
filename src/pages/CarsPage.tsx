import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getCars } from '../services/carService';
import type { Car } from '../models/Car';
import CarCard from '../components/CarCard';
import axios from 'axios';

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
        <section className="cars-grid">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
        </section>
    );
}