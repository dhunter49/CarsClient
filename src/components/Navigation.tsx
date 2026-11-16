import {
  NavLink,
  useNavigate,
} from 'react-router';

import {
  useCarUiStore,
} from '../store/useCarUiStore';

import {
  useAuthStore,
} from '../store/useAuthStore';

export default function Navigation() {
  const navigate = useNavigate();

  // Aktualnie zalogowany użytkownik.
  // null oznacza brak zalogowanego użytkownika.
  const user =
    useAuthStore(
      (state) => state.user,
    );

  // Liczba samochodów oznaczonych jako ulubione przez użytkownika.
  const favoriteCount =
    useCarUiStore(
      (state) =>
        user
          ? (
              state.favoriteCarIdsByUser[
                user.id
              ] ?? []
            ).length
          : 0,
    );

  // Akcja wylogowania z magazynu Zustand.
  const logout =
    useAuthStore(
      (state) => state.logout,
    );

  function handleLogout() {
    // Usuwamy użytkownika ze stanu aplikacji.
    logout();

    // Po wylogowaniu przechodzimy na stronę logowania.
    navigate('/login');
  }

  return (
    <nav className="site-nav">
      <ul>
        <li>
          <NavLink to="/">
            Strona główna
          </NavLink>
        </li>

        {user && (
          <>
            <li>
              <NavLink to="/cars" end>
                Samochody
              </NavLink>
            </li>
            <li>
              <NavLink to="/cars/new">
                Dodaj samochód
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink to="/about">
            O aplikacji
          </NavLink>
        </li>

        {user ? (
          <>
            <li className="favorite-counter">
              Ulubione: {favoriteCount}
            </li>
            <li className="user-info">
              {user.username}
              {' ('}
              {user.roles.join(', ')}
              {')'}
            </li>
            <li>
              <button
                type="button"
                className="nav-button"
                onClick={handleLogout}
              >
                Wyloguj
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">
                Logowanie
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
                Rejestracja
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
