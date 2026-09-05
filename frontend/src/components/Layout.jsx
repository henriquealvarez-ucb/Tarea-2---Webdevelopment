import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 rounded px-3 py-2 text-sm text-white/90 hover:bg-white/10 ${
    isActive ? "bg-white/15 font-semibold text-white" : ""
  }`;

export default function Layout({ title, action, children }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="flex w-60 shrink-0 flex-col bg-primary text-white">
        <div className="px-4 py-5 text-lg font-semibold">Club Frontón</div>
        <nav aria-label="Navegación principal" className="flex-1 space-y-1 px-3">
          <NavLink to="/" end className={navLinkClass}>
            Panel principal
          </NavLink>
          <NavLink to="/jugadores" className={navLinkClass}>
            Jugadores
          </NavLink>
          <NavLink to="/partidos" className={navLinkClass}>
            Partidos
          </NavLink>
        </nav>
        <div className="px-3 py-4">
          <button
            type="button"
            onClick={logout}
            className="w-full rounded px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-black/10 bg-white px-6 py-4">
          <h1 className="text-xl font-semibold text-primary">{title}</h1>
          <div className="flex items-center gap-3">
            {action}
            <span className="text-sm text-gray-600">{user?.nombre ?? user?.email}</span>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>

        <footer className="border-t border-black/10 px-6 py-3 text-center text-xs text-gray-500">
          &copy; 2026 Club Frontón. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}
