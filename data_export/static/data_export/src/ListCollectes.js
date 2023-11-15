import React, { useState } from "react";
import axios from "axios";
import { FormGroup, Form, Input, Button } from "reactstrap";

export const ListCollectes = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const getData = async (value) => {
    try {
      const response = await axios.get(
        `/data_export/api/v1/collectes?limite=${value}`
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getData(value);
  };

  return (
    <div className="mt-3">
      <h3>Export Données Collectes</h3>
      <div className="row">
        <div className="col-md-3">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="number"
                name="integerInput"
                id="integerInput"
                placeholder="Spécifier le nombre de lignes"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>

        {data.length > 0 && (
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Identifiant Client</th>
                <th>Catégorie Achat</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.id_client}</td>
                  <td>{item.categorie}</td>
                  <td>{item.montant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
