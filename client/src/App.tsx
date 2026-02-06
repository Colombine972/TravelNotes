import { Link, Outlet } from 'react-router'
import './App.css'

function App() {


  return (
    <>
    <nav>
      <Link to="/">S'enregistrer</Link>
      <Link to="/about">Se connecter</Link>
      <Link to="/newnote">Ajoute une note</Link>
      <Link to="/notes">Mes notes</Link>
    </nav>
    <main>
      <Outlet />
    </main>
    </>
  )
}

export default App
