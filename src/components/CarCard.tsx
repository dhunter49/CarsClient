import { useNavigate } from 'react-router';
import { fuelTypeNames, type Car } from '../models/Car';
import { useCarUiStore } from '../store/useCarUiStore';

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    const navigate = useNavigate();
    const isFavorite =
        useCarUiStore(
            (state) => state.favoriteCarIds.includes(car.id),
        );

    const toggleFavorite =
        useCarUiStore(
            (state) => state.toggleFavorite,
        );

    return (
        <article className="car-card">
            <h2>{car.brand} {car.model}</h2>
            <p>Rok produkcji: {car.productionDate}</p>
            <p>Rodzaj paliwa: {fuelTypeNames[car.fuelType]}</p>
            <button
                type="button"
                className={isFavorite ? 'favorite-button active-favorite' : 'favorite-button'}
                onClick={() => toggleFavorite(car.id)}
            >
                {isFavorite ? 'Ulubiony' : 'Ulubione'}
            </button>
            <button
                type="button"
                onClick={() => navigate(`/cars/${car.id}`)}
            >
                Szczegóły
            </button>
        </article>
    );
}
