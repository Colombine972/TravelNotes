import "../styles/Register.css";
import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useNavigate } from "react-router";

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");


  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de changement du mot de passe
  const updateRegisterPassword: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

 
  // Gestionnaire de soumission du formulaire
  const submitRegisterForm: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email:
              (emailRef.current as HTMLInputElement).value,
            password,
          }),
        },
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        navigate("/login");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

    
    return (
    
    <main className="register-page">
    <section className="register-form">
        <div className="welcome-card">
            <h1>Bienvenue <span>👋</span></h1>
            <p className="subtitle">
            Un espace simple et personnel pour écrire et retrouver toutes tes
            notes.
          </p>
          </div>
          <div className="login-card">
        <form onSubmit={submitRegisterForm}>
      <div className="input-group">
        {/* Champ pour l'email */}
        <label htmlFor="email"><span></span>Adresse email</label>{" "}
        <input ref={emailRef} type="email" id="email" placeholder="Entrez votre mail"/>
      </div>
      <div className="input-group">
        {/* Champ pour le mot de passe */}
        <label htmlFor="password"><span></span>Mot de passe</label>{" "}
        <input
          type="password"
          id="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={updateRegisterPassword}
        />{" "}
        {/* Indicateur de force du mot de passe */}
        {password.length >= 8 ? "✅" : "❌"} {`length: ${password.length} >= 8`}
      </div>
      <button type="submit" className="login-btn">
            Se connecter
      </button>

      <p className="register-link">
            Pas encore de compte ? <span onClick={() => navigate("/register")}>Créer un compte</span>
      </p>
    </form>
    </div>
    </section>
    </main>
  );
}

export default Register;

