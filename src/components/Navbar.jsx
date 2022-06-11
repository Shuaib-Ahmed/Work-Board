import React, { useContext } from "react";
import styles from "./css/navbar.module.css";

import { MainContext } from "../context/MainContext";
import { BiSearchAlt } from "react-icons/bi";

const Navbar = () => {
  const { changeSearchQuery, searchQuery, showArchive, changeShowArchive } =
    useContext(MainContext);

  return (
    <nav className={styles.navContainer}>
      <section className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Please enter your search text"
          value={searchQuery}
          onChange={(e) => changeSearchQuery(e.target.value)}
        />
        <BiSearchAlt />
      </section>

      <button
        className={showArchive ? styles.redBtn : styles.greenBtn}
        onClick={changeShowArchive}
      >
        {showArchive ? "OFF" : "ON"} Archive
      </button>
    </nav>
  );
};

export default Navbar;
