import { Link } from 'react-router';
import { fuelTypeNames, type Car } from '../models/Car';

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    return (
        <article className="car-card">
            <h2>{car.brand} {car.model}</h2>
            <p>Rok produkcji: {car.productionDate}</p>
            <p>Rodzaj paliwa: {fuelTypeNames[car.fuelType]}</p>
            <Link to={`/cars/${car.id}`}>Szczegóły</Link>
        </article>
    );
}
