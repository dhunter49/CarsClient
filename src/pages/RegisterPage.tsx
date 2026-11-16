import { useNavigate } from 'react-router';
import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { register } from '../services/authService';

export default function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setIsSubmitting(true);
            setError(null);
            await register({ username, email, password });
            navigate('/login');
        } catch (caughtError) {
            if (caughtError instanceof Error) {
                setError(caughtError.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="register-page">
            <h1>Rejestracja</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nazwa użytkownika:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Rejestracja...' : 'Zarejestruj się'}
                </button>
            </form>
        </div>
    );
}
