import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { FiltreProfessions } from "./FiltreProfessions";

export const DepensesCategories = () => {
  const [data, setData] = useState([]);
  const [categorie, setCategorie] = useState("");

  useEffect(() => {
    const getData = async (profession) => {
      try {
        const response = await axios.get(
          `/data_export/api/v1/depenses_categories?categorie_socio=${profession}`
        );

        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData(categorie);
  }, [categorie]);

  const handleFilterChange = (value) => {
    setCategorie(value);
  };

  return (
    <div className="mt-3" style={{ height: "600px" }}>
      <h3>Dépenses totales par catégorie achat</h3>
      <FiltreProfessions onChange={handleFilterChange} />
      {data.length ? (
        <ResponsiveBar
          data={data}
          keys={["somme_prix"]}
          indexBy="categorie_achat"
          margin={{ top: 40, right: 30, bottom: 80, left: 60 }}
          padding={0.3}
          colors={{ scheme: "nivo" }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Catégories", // X-axis legend
            legendPosition: "middle",
            legendOffset: 36,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Montant Total", // Y-axis legend
            legendPosition: "middle",
            legendOffset: -40,
          }}
        />
      ) : categorie ? (
        <div className="mt-3">Pas de données</div>
      ) : null}
    </div>
  );
};
