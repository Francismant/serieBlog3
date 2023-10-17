import styles from "./App.module.scss";
import Homepage from "./Page/Homepage/Homepage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import Admin from "./Page/Admin/Admin";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
