import "./BarraNavegacion.css"; // Importa el archivo de estilos CSS
import logo from "../../../assets/Logo.png";
import botonHamburguesa from "../../../assets/BotonHamburguesa.png";
import perfil from "../../../assets/Perfil.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cerrarSesion } from "../../../redux/slices/auth/Thunks";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import cinePlusApi from "../../../api/cinePlusApi";

export const Navigation = () => {
    const { status, email } = useSelector((state) => state.auth);
    const [active, setActive] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPerfilVisible, setMenuPerfilVisible] = useState(false);
    const [ordenId, setOrdenId] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState({}); // Estado para manejar el loading de cada producto

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', `${pathname}${search}`);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const toggleMenuPerfil = () => {
        setMenuPerfilVisible(!menuPerfilVisible);
        setActive(false);
    };


    const handleLogout = () => {
        if (status) {
            dispatch(cerrarSesion());
            navigate("/", { replace: true });
        }
    };

    

    

    return (
        <>
            <div className="BarraNav">
                <nav className="BarraNav">
                    <div className="logoContainer">
                        <Link to="/"><img className="logo" src={logo} alt="Logo"></img></Link>
                    </div>
                    <div className="linksContainer">
                        <Link to="/" className="nav-inicio">
                            Inicio
                        </Link>
                        <Link to="/Comidas" className="nav-comidas">
                            Buscar
                        </Link>
                        <Link to="/Estrenos" className="nav-estrenos">
                            Top rated movies
                        </Link>
                        <Link to="/About" className="nav-about">
                            About
                        </Link>
                        
                        <div className="ProfileButtonContainer">
                            <button className="btnPerfil" onClick={toggleMenuPerfil}>
                                <img src={perfil} alt="Botón de perfil" className="imgPerfil" />
                            </button>
                        </div>
                    </div>

                    <div className="BurgerButtonContainer">
                        <button className="btnHamburguesa" onClick={toggleMenu}>
                            <img src={botonHamburguesa} alt="Botón de hamburguesa" className="imgHamburgesa" />
                        </button>
                    </div>
                </nav>
            </div>
            <div
                className={`${menuVisible? "menuDesplegableVisible": "menuDesplegableInvisible"}`}>
                {status?<Link><div className="itemMenuDesplegable">{email}</div></Link>:<Link to="/Login">
                    <div className="itemMenuDesplegable">Iniciar Sesión</div>
                </Link>}
                <Link to="/">
                    <div className="itemMenuDesplegable">Inicio</div>
                </Link>
                <Link to="/Comidas">
                    <div className="itemMenuDesplegable">Comidas</div>
                </Link>
                <Link to="/Estrenos">
                    <div className="itemMenuDesplegable">Top Rated</div>
                </Link>
                <Link to="/Perfil/Orden">
                    <div className="itemMenuDesplegable">Mis reviews</div>
                </Link>
                <Link to="/About">
                    <div className="itemMenuDesplegable">About</div>
                </Link>
                {status ? <Link onClick={handleLogout}><div className="itemMenuDesplegable">Cerrar Sesión</div></Link> : null}
            </div>
            <div className={`${menuPerfilVisible ? "menuPerfilDesplegableVisible" : "menuPerfilDesplegableInvisible"}`}>
                {status ? <Link><div className="itemMenuDesplegable">{email}</div></Link> : <Link to="/Login"><div className="itemMenuDesplegable">Iniciar Sesión</div></Link>}
                <Link to="/Perfil/Reviews"><div className="itemMenuDesplegable">Mis reviews</div></Link>
                {status ? <Link onClick={handleLogout}><div className="itemMenuDesplegable">Cerrar Sesión</div></Link> : null}
            </div>
        </>
    );
};
