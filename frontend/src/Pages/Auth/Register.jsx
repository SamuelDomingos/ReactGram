import { useEffect, useState } from "react";
import "./Auth.css";

// Components
import { Link } from "react-router-dom";

// Hooks
import {useSelector, useDispatch} from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";
import Message from "../../components/Message";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  // Clean all auth states
  useEffect(() => {

    dispatch(reset());

  }, [dispatch]);

  return (
    <div className="authguard">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type="email"
          placeholder="e-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <input
          type="password"
          placeholder="confirmar a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
        />

        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error"/>}
      </form>

      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
