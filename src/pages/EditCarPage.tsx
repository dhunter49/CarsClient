import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getCarById, updateCar } from "../services/carService";
import { type Car } from "../models/Car";
import CarForm from "../components/CarForm";
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
            <CarForm
                car={car}
                isSubmitting={isSubmitting}
                submitLabel={isSubmitting ? 'Aktualizowanie...' : 'Zaktualizuj samochód'}
                onSubmit={handleSubmit}
            />
        </section>
    );
}