import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getCarById, updateCar } from "../services/carService";
import { 
    bodyTypeNames,
    bodyTypes,
    fuelTypeNames,
    fuelTypes,
    type Car } from "../models/Car";
import axios from "axios";

export default function EditCarPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function fetchCar() {
        try {
            setLoading(true);
            const fetchedCar = await getCarById(id!);
            setCar(fetchedCar);
        } catch (caughtError) {
            if (axios.isCancel(caughtError)) {
                return;
            }
            setError(caughtError instanceof Error ? caughtError.message : "Nieznany błąd");
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!car) return;

        const formData = new FormData(event.currentTarget);
        const updatedCar: Car = {
            ...car,
            brand: formData.get("brand") as string,
            model: formData.get("model") as string,
            productionDate: formData.get("productionDate") as string,
            doorsNumber: Number(formData.get("doorsNumber")),
            luggageCapacity: Number(formData.get("luggageCapacity")),
            engineCapacity: Number(formData.get("engineCapacity")),
            averageFuelConsumption: Number(formData.get("averageFuelConsumption")),
            bodyType: Number(formData.get("bodyType")) as Car["bodyType"],
            fuelType: Number(formData.get("fuelType")) as Car["fuelType"],
        };

        try {
            setIsSubmitting(true);
            setError(null);
            await updateCar(id!, updatedCar);
            navigate("/cars");
        } catch (caughtError) {
            setError(caughtError instanceof Error ? caughtError.message : "Nieznany błąd");
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        fetchCar();
    }, [id]);
    
    if (loading) {
        return <p className="page">Ładowanie danych samochodu...</p>;
    }

    if (error) {
        return <p className="page error">{error}</p>;
    }
    
    if (!car) {
        return <p className="page">Nie znaleziono samochodu o podanym ID.</p>;
    }

    return (
        <section className="page">
            <h1>Edytuj samochód</h1>
            {error && <p className="error">{error}</p>}
            <form className="data-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="brand">Marka:</label>
                    <input type="text" id="brand" name="brand" defaultValue={car?.brand} required />
                </div>
                <div>
                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" name="model" defaultValue={car?.model} required />
                </div>
                <div>
                    <label htmlFor="productionDate">Data produkcji:</label>
                    <input type="date" id="productionDate" name="productionDate" defaultValue={car?.productionDate} required />
                </div>
                <div>
                    <label htmlFor="doorsNumber">Liczba drzwi:</label>
                    <input type="number" id="doorsNumber" name="doorsNumber" defaultValue={car?.doorsNumber} required />
                </div>
                <div>
                    <label htmlFor="luggageCapacity">Pojemność bagażnika (l):</label>
                    <input type="number" id="luggageCapacity" name="luggageCapacity" defaultValue={car?.luggageCapacity} required />
                </div>
                <div>
                    <label htmlFor="engineCapacity">Pojemność silnika (cm³):</label>
                    <input type="number" id="engineCapacity" name="engineCapacity" defaultValue={car?.engineCapacity} required />
                </div>
                <div>
                    <label htmlFor="averageFuelConsumption">Średnie zużycie paliwa (l/100km):</label>
                    <input type="number" id="averageFuelConsumption" name="averageFuelConsumption" step="any" defaultValue={car?.averageFuelConsumption} required />
                </div>
                <div>
                    <label htmlFor="bodyType">Typ nadwozia:</label>
                    <select id="bodyType" name="bodyType" defaultValue={car?.bodyType} required>
                        {bodyTypes.map((bodyType) => (
                            <option key={bodyType} value={bodyType}>
                                {bodyTypeNames[bodyType]}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="fuelType">Rodzaj paliwa:</label>
                    <select id="fuelType" name="fuelType" defaultValue={car?.fuelType} required>
                        {fuelTypes.map((fuelType) => (
                            <option key={fuelType} value={fuelType}>
                                {fuelTypeNames[fuelType]}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Aktualizowanie...' : 'Zaktualizuj samochód'}
                </button>
            </form>
        </section>
    );
}