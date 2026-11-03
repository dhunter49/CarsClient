import { Link } from "react-router";

export default function NotFoundPage() {
    return (
        <section className="page">
            <h1>404 - Nie znaleziono strony</h1>
            <p>Strona, której szukasz, nie istnieje.</p>
            <Link to="/">Wróć do strony głównej</Link>
        </section>
    );
}