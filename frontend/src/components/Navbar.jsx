import "./Navbar.css";

// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

// Hooks
import { useAuth } from "../hooks/UserAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import {logout, reset} from "../slices/authSlice"
import { useState } from "react";

const Navbar = () => {
    const [auth] = useAuth();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
  
    const handleLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`);
        }
    }


  return (
    <nav id="nav">
        <Link to="/">ReactGram</Link>
        <form id="seach-form" onSubmit={handleSearch}>
            <BsSearch/>
            <input type="text" placeholder="pesquisar" onChange={(e) => setQuery(e.target.value)} value={query || ""} />
        </form>
        <ul id="nav-links">
        {auth ? (
                <>
                    <li>
                    <NavLink to="/">
                        <BsHouseDoorFill/>
                    </NavLink>
                    </li>
                    {user && (
                        <li>
                            <NavLink to={`/users/${user._id}`}>
                                <BsFillCameraFill/>
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/editProfile">
                            <BsFillPersonFill/>
                        </NavLink>
                    </li>
                    <li>
                        <span onClick={handleLogout}>Sair</span>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <NavLink to="/login">
                            Entrar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">
                            Cadastrar
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    </nav>
  );
};

export default Navbar;
