import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

export const DepensesSocio = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/data_export/api/v1/depenses");

        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="mt-3" style={{ height: "500px" }}>
      <h3>Dépenses moyennes par catégorie socio professionnelle</h3>
      <ResponsiveBar
        data={data}
        keys={["moyenne_prix"]}
        indexBy="categorie"
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
          legend: "Moyenne Prix", // Y-axis legend
          legendPosition: "middle",
          legendOffset: -40,
        }}
      />
    </div>
  );
};
