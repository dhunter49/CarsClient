import { useNavigate } from 'react-router';
import { fuelTypeNames, type Car } from '../models/Car';
import { useCarUiStore } from '../store/useCarUiStore';
import { useAuthStore } from '../store/useAuthStore';

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    const favoriteCarIdsByUser = useCarUiStore(
        (state) => state.favoriteCarIdsByUser,
    );

    const favoriteCarIds = user
        ? favoriteCarIdsByUser[user.id] ?? []
        : [];
    const isFavorite = favoriteCarIds.includes(car.id);

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
                onClick={() => {
                    if (user) {
                        toggleFavorite(user.id, car.id);
                    }
                }}
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
