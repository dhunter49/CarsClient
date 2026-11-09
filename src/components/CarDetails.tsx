import { bodyTypeNames, fuelTypeNames, type Car } from '../models/Car';

interface CarDetailsProps {
    car: Car;
    isDeleting: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

export default function CarDetails({
    car,
    isDeleting,
    onEdit,
    onDelete,
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
            <button type="button" onClick={onEdit}>
                Edytuj
            </button>
            <button type="button" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? 'Usuwanie...' : 'Usuń'}
            </button>
        </section>
    );
}
