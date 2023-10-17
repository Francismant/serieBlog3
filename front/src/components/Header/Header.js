import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import HeaderMobile from "./components/HeaderMobile";
import { NavLink } from "react-router-dom";

export default function Header({ setPage }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <NavLink to="/">
          <img src={logo} alt="logo du blog" />
        </NavLink>
      </div>
      <ul className={`d-flex  ${styles.desktopHeader}`}>
        <NavLink to="/admin">
          <button className="mr10 btn btn-primary-reverse">
            <i className="fas fa-plus mr5"></i>
            Ajouter une série
          </button>
        </NavLink>
        <NavLink to="/favoris">
          <button className="btn btn-primary mr10">
            <i className="fas fa-star mr5"></i>
            <span>Favoris</span>
          </button>
        </NavLink>
        <button className="mr10 btn btn-primary-reverse">
          <i className="fas fa-right-to-bracket mr5"></i>
          <span>Connexion</span>
        </button>
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fas fa-bars mr10 ${styles.mobileHeader}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <HeaderMobile />
        </>
      )}
    </header>
  );
}
