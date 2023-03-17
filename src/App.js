import { React, useState, useEffect } from "react";
import "./App.css";
import Users from "./Pages/Users";
import style from './App.module.scss'

function App() {
  return (
    <div>
      <section>
      <div className={style.users}>
        <Users />
        </div>
      </section>
    </div>
  );
}

export default App;
