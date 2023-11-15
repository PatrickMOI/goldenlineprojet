import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

export const FiltreProfessions = ({ onChange }) => {
  const [professions, setProfessions] = useState([]);

  const getListeProfessions = async () => {
    try {
      const response = await axios.get("/data_export/api/v1/professions");

      const listeProfessions = response.data.data.map((profession) => {
        return {
          value: profession.toLowerCase().replace(" ", "_"),
          label: profession,
        };
      });
      setProfessions(listeProfessions);
    } catch (error) {
      console.log(error);
    }
  };

  // Get participants at initial load
  useEffect(() => {
    getListeProfessions();
  }, []);

  return (
    <div style={{ width: "350px" }}>
      <Select
        options={professions}
        className="basic-single"
        classNamePrefix="select"
        placeholder="Chercher par profession"
        isClearable={true}
        onChange={(option) => onChange(option ? option.label : "")}
      />
    </div>
  );
};
