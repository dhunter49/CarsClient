import {
    bodyTypeNames,
    bodyTypes,
    fuelTypeNames,
    fuelTypes,
    type Car,
} from '../models/Car';

interface CarFormProps {
    car?: Car;
    isSubmitting: boolean;
    submitLabel: string;
    onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function CarForm({
    car,
    isSubmitting,
    submitLabel,
    onSubmit,
}: CarFormProps) {
    return (
        <form className="data-form" onSubmit={onSubmit}>
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
                {submitLabel}
            </button>
        </form>
    );
}
