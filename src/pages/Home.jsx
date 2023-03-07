import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/get");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStudents();
  }, []);
  const deleteStudente = async (id) => {
    try {
        window.confirm("Confermi l'eliminazione dello studente?");
        axios.delete(`http://localhost:5000/api/remove/${id}`).then(toast.success("Studente eliminato con sucesso"));
        setTimeout(() => window.location.reload(), 2000);
        //
    } catch (error) {
        console.log(error);
    }

    //if (window.confirm("Confermi l'eliminazione dello studente?")) {
      
      //setTimeout(() => loadData(), 500);
    //}
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/">
          <input className="btn btn-view"value="Indietro"></input>
        </Link>
      <Link to="/add">
        <button className="btn btn-contact">Aggiungi Studente</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Id</th>
            <th style={{ textAlign: "center" }}>Specializzazione</th>
            <th style={{ textAlign: "center" }}>Anno</th>
            <th style={{ textAlign: "center" }}>Sezione</th>
            <th style={{ textAlign: "center" }}>Cognome</th>
            <th style={{ textAlign: "center" }}>Nome</th>
            <th style={{ textAlign: "center" }}>Residenza</th>
            <th style={{ textAlign: "center" }}>DataNascita</th>
            <th style={{ textAlign: "center" }}>Foto</th>
            <th style={{ textAlign: "center" }}></th>
            <th style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.Specializzazione}</td>
                <td>{item.Anno}</td>
                <td>{item.Sezione}</td>
                <td>{item.Cognome}</td>
                <td>{item.Nome}</td>
                <td>{item.Residenza}</td>
                <td>{item.DataNascita}</td>
                <td><img src ={item.Foto} alt ="FAILED TO LOAD"/></td>
                <td>
                  <Link to={`/edit/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteStudente(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Home;
