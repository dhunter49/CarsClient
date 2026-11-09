import { bodyTypeNames, fuelTypeNames, type Car } from '../models/Car';

interface CarDetailsProps {
    car: Car;
    isDeleting: boolean;
    isFavorite: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onToggleFavorite: () => void;
}

export default function CarDetails({
    car,
    isDeleting,
    isFavorite,
    onEdit,
    onDelete,
    onToggleFavorite,
}: CarDetailsProps) {
    return (
        <section className="page car-details">
            <h1>Szczegóły samochodu</h1>
            <h2>{car.brand} {car.model}</h2>
            <p>Rok produkcji: {car.productionDate}</p>
            <p>Rodzaj paliwa: {fuelTypeNames[car.fuelType]}</p>
            <p>Liczba drzwi: {car.doorsNumber}</p>
            <p>Pojemność bagażnika: {car.luggageCapacity} litrów</p>
            <p>Pojemność silnika: {car.engineCapacity} cm³</p>
            <p>Średnie zużycie paliwa: {car.averageFuelConsumption} l/100km</p>
            <p>Typ nadwozia: {bodyTypeNames[car.bodyType]}</p>
            <button
                type="button"
                className={isFavorite ? 'favorite-button active-favorite' : 'favorite-button'}
                onClick={onToggleFavorite}
            >
                {isFavorite ? 'Ulubiony' : 'Ulubione'}
            </button>
            <button type="button" onClick={onEdit}>
                Edytuj
            </button>
            <button type="button" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? 'Usuwanie...' : 'Usuń'}
            </button>
        </section>
    );
}
