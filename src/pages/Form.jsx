import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const Form = () => {
    const [specializzazione, setSpecializzazione] = useState('')
    const [anno, setAnno] = useState('')
    const [sezione, setSezione] = useState('')
    const [data, setData] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();
        try { 
            const response = await axios.get(`http://localhost:5000/api/students/?specializzazione=${specializzazione}&anno=${anno}&sezione=${sezione}`)
               // `http://localhost:5000/api/students/specializzazione=${specializzazione}&anno=${anno}&sezione=${sezione}`
            
        setData(response.data)
        console.log(response.data)
    } catch (err) {
            console.log(err);
          }
      };
    const deleteStudente = async (id) => {
        try {
            window.confirm("Confermi l'eliminazione dello studente?");
            axios.delete(`http://localhost:5000/api/remove/${id}`).then(toast.success("Studente eliminato con sucesso"));
            setTimeout(() => window.location.reload(), 2000);
            //
        } catch (error) {
            console.log(error);
        }
    }
        return (

            <div style={{ marginTop: "100px" }}>
                <form
                    style={{
                        margin: "auto",
                        padding: "15px",
                        maxWidth: "400px",
                        alignContent: "center",
                    }}
                    //onClick
                    onSubmit={handleSearch}
                >
                    <label htmlFor="specializzazione">Specializzazione</label>
                    <select
                        id="specializzazione"
                        name="specializzazione"
                        onChange={(e) => setSpecializzazione(e.target.value)}
                        value={specializzazione}
                    >
                        <option value="BIE">BIE</option>
                        <option value="LST">LST</option>
                        <option value="ELE">ELE</option>
                        <option value="INF">INF</option>
                    </select>
                    <label htmlFor="anno">Anno</label>
                    <select id="anno" name="anno" onChange={(e) => setAnno(e.target.value)} value={anno} >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label htmlFor="sezione">Sezione</label>
                    <select id="sezione" name="sezione" onChange={(e) => setSezione(e.target.value)} value={sezione}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                    </select>
                    <input type="submit" id="button2" value="Cerca" />
                    <Link to="/home">
                        <input type="button" value="Trova tutti gli studenti"></input>
                    </Link>
                </form>
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
                    </thead><tbody>
                    {data && data.map((item, index) => {
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
                                    <td>
                                        <img src={"./IMMAGINI/5AI/Boldrini.jpg"}></img>
                                    </td>
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
                        })
                    }
                    </tbody>
                    
                </table>
                
            </div>
        );
    };

    export default Form;
