import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: username, senha: password }),
      });

      if (response.ok) {
        alert("Login bem-sucedido");
      } else {
        const message = await response.text();
        setErrorMessage(message);
      }
    } catch (error) {
      setErrorMessage("Erro ao tentar fazer login. Por favor, tente novamente.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="input-field">
          <input
            type="text"
            placeholder="Nome"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu sua senha?</a>
        </div>
        <button type="submit">Login</button>
        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="#">Cadastrar-se</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
