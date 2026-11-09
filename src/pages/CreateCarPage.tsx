import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createCar } from '../services/carService';
import { BodyType, FuelType, type NewCar } from '../models/Car';
import CarForm from '../components/CarForm';

export default function CreateCarPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newCar: NewCar = {
            brand: formData.get('brand') as string,
            model: formData.get('model') as string,
            doorsNumber: Number(formData.get('doorsNumber')),
            luggageCapacity: Number(formData.get('luggageCapacity')),
            engineCapacity: Number(formData.get('engineCapacity')),
            averageFuelConsumption: Number(formData.get('averageFuelConsumption')),
            productionDate: formData.get('productionDate') as string,
            bodyType: Number(formData.get('bodyType')) as BodyType,
            fuelType: Number(formData.get('fuelType')) as FuelType,
        };

        try {
            setIsSubmitting(true);
            setError(null);
            await createCar(newCar);
            navigate('/cars');
        } catch (caughtError) {
            setError(caughtError instanceof Error ? caughtError.message : 'Nieznany błąd');
            setIsSubmitting(false);
        }
    }

    return (
        <section className="page">
            <h1>Dodaj nowy samochód</h1>
            {error && <p className="error">{error}</p>}
            <CarForm
                isSubmitting={isSubmitting}
                submitLabel={isSubmitting ? 'Dodawanie...' : 'Dodaj samochód'}
                onSubmit={handleSubmit}
            />
        </section>
    );
}