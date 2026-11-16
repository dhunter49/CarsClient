import { useState, type SyntheticEvent } from 'react';
import { forgotPassword } from '../services/authService';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setIsSubmitting(true);
            setError(null);
            setMessage(null);
            await forgotPassword(email);
            setMessage('Link do resetowania hasła został wysłany na Twój adres e-mail.');
        } catch (caughtError) {
            if (caughtError instanceof Error) {
                setError(caughtError.message);
            } else {
                setError('Wystąpił nieznany błąd.');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <h1>Zapomniane hasło</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij link do resetowania hasła'}
                </button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}