import { useState, useEffect } from "react";
import axios from "../api/axios.js";
import { PropiedadesCategorias } from "../components/Propiedades/Categorias/PropiedadesCategorias.jsx";
import { PropiedadesCard } from "../components/Propiedades/Card/PropiedadesCard.jsx";
import { useParams } from "react-router-dom";

export const PropiedadesPage = () => {
  const [categoria, setCategoria] = useState("Todos");
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const getPropiedades = async () => {
      try {
        const response = await axios.get("/propiedades");
        setPropiedades(response.data);
        console.table(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPropiedades();
  }, []);

  return (
    <div className="flex flex-col w-3/4">
      <PropiedadesCategorias setCategoria={setCategoria} />
      <PropiedadesCard propiedades={propiedades} categoria={categoria} />
    </div>
  );
};
