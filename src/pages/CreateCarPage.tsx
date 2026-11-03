import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createCar } from '../services/carService';
import {
    BodyType,
    bodyTypeNames,
    bodyTypes,
    FuelType,
    fuelTypeNames,
    fuelTypes,
    type NewCar,
} from '../models/Car';

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
        <div>
            <h1>Dodaj nowy samochód</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="brand">Marka:</label>
                    <input type="text" id="brand" name="brand" required />
                </div>
                <div>
                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" name="model" required />
                </div>
                <div>
                    <label htmlFor="productionDate">Data produkcji:</label>
                    <input type="date" id="productionDate" name="productionDate" required />
                </div>
                <div>
                    <label htmlFor="doorsNumber">Liczba drzwi:</label>
                    <input type="number" id="doorsNumber" name="doorsNumber" required />
                </div>
                <div>
                    <label htmlFor="luggageCapacity">Pojemność bagażnika (l):</label>
                    <input type="number" id="luggageCapacity" name="luggageCapacity" required />
                </div>
                <div>
                    <label htmlFor="engineCapacity">Pojemność silnika (cm³):</label>
                    <input type="number" id="engineCapacity" name="engineCapacity" required />
                </div>
                <div>
                    <label htmlFor="averageFuelConsumption">Średnie zużycie paliwa (l/100km):</label>
                    <input type="number" id="averageFuelConsumption" name="averageFuelConsumption" required />
                </div>
                <div>
                    <label htmlFor="bodyType">Typ nadwozia:</label>
                    <select id="bodyType" name="bodyType" required>
                        {bodyTypes.map((bodyType) => (
                            <option key={bodyType} value={bodyType}>
                                {bodyTypeNames[bodyType]}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="fuelType">Rodzaj paliwa:</label>
                    <select id="fuelType" name="fuelType" required>
                        {fuelTypes.map((fuelType) => (
                            <option key={fuelType} value={fuelType}>
                                {fuelTypeNames[fuelType]}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Dodawanie...' : 'Dodaj samochód'}
                </button>
            </form>
        </div>
    );
}