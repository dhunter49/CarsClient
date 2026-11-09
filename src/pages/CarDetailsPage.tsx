import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteCar, getCarById } from '../services/carService';
import type { Car } from '../models/Car';
import CarDetails from '../components/CarDetails';
import axios from 'axios';

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

        fetchCar();
        
        return () => {
            controller.abort();
        };
    }, [id]);

    if (isLoading) {
        return <p className="page">Ładowanie...</p>;
    }
    
    if (error) {
        return <p className="page error">Błąd: {error}</p>;
    }

    if (!car) {
        return <p className="page">Nie znaleziono samochodu o podanym ID.</p>;
    }

    return (
        <CarDetails
            car={car}
            isDeleting={isDeleting}
            onEdit={() => navigate(`/cars/${car.id}/edit`)}
            onDelete={handleDelete}
        />
    );
}