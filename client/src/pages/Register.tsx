import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "../styles/Register.css";
import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useNavigate } from "react-router";

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de changement du mot de passe
  const updateRegisterPassword: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

    const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setConfirmPassword(event.target.value);
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
            <h1>Inscription <span>✍️</span></h1>
            <p className="subtitle">
            Créer un compte pour commencer à écire et organiser tes notes.
          </p>
          </div>
          <div className="register-card">
        <form onSubmit={submitRegisterForm}>
      <div className="input-group">
        {/* Champ pour l'email */}

        <label htmlFor="email"><span></span>Adresse email</label>
        <div className="input-wrapper">
            <Mail className="input-icon icon-mail" size={18} />
        <input ref={emailRef} type="email" id="email" placeholder="Entrez votre mail"/>
      </div>
      </div>
      <div className="input-group">
        {/* Champ pour le mot de passe */}

            
        <label htmlFor="password"><span></span>Mot de passe</label>
        <div className="input-wrapper">
            <Lock className="input-icon icon-lock" size={18} />
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Choisissez un mot de passe"
          value={password}
          onChange={updateRegisterPassword}
        />
        
        <button
      type="button"
      className="toggle-password"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label="Afficher ou masquer le mot de passe"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
    </div>
      </div>
      <div className="input-group">
        {/* Champ pour la confirmation du mot de passe */}
        
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirmer votre mot de passe"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        
      </div>
      

      <button type="submit" className="register-btn">
            M'inscrire
      </button>

      <p className="login-link">
            Déja inscrit ? <span onClick={() => navigate("/login")}>Se connecter</span>
      </p>
    </form>
    </div>
    </section>
    </main>
  );
}

export default Register;

