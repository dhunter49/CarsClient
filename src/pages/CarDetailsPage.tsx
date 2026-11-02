import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteCar, getCarById } from '../services/carService';
import type { Car } from '../models/Car';

export default function CarDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [car, setCar] = useState<Car | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleDelete() {
        if (!id || !window.confirm('Czy na pewno chcesz usunąć ten samochód?')) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteCar(id);
            navigate('/cars');
        } catch (caughtError) {
            setError(caughtError instanceof Error ? caughtError.message : 'Nieznany błąd');
            setIsDeleting(false);
        }
    }

    useEffect(() => {
        if (!id) {
            setCar(null);
            setIsLoading(false);
            setError('Brak ID samochodu');
            return;
        }

        const carId = id;
        const controller = new AbortController();

        async function fetchCar() {
            try {
                setIsLoading(true);
                setError(null);
                const loadedCar = await getCarById(carId, controller.signal);
                setCar(loadedCar);
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

        fetchCar();
        
        return () => {
            controller.abort();
        };
    }, [id]);

    if (isLoading) {
        return <p>Ładowanie...</p>;
    }
    
    if (error) {
        return <p className="error">Błąd: {error}</p>;
    }

    if (!car) {
        return <p>Nie znaleziono samochodu o podanym ID.</p>;
    }

    return (
        <div>
            <h1>Szczegóły samochodu</h1>
            <h2>{car.brand} {car.model}</h2>
            <p>Rok produkcji: {car.productionDate}</p>
            <p>Rodzaj paliwa: {car.fuelType}</p>
            <p>Liczba drzwi: {car.doorsNumber}</p>
            <p>Pojemność bagażnika: {car.luggageCapacity} litrów</p>
            <p>Pojemność silnika: {car.engineCapacity} cm³</p>
            <p>Średnie zużycie paliwa: {car.averageFuelConsumption} l/100km</p>
            <p>Typ nadwozia: {car.bodyType}</p>  
            <button type="button" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Usuwanie...' : 'Usuń'}
            </button>
        </div>
    );
}