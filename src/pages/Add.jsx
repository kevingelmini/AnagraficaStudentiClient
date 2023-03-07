import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [state, setState] = useState({
    specializzazione: "BIE",
    anno: "1",
    sezione: "A",
    cognome: "",
    nome: "",
    residenza: "",
    data: "",
    img: ""
  });
  //const [error, setError] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if (!state.specializzazione || !state.anno || !state.sezione || !state.cognome || !state.nome || !state.residenza || !state.data || !state.img
    ) {
      toast.error("Per favore inserire i campi");
    } else {
      axios.post('http://localhost:5000/api/post', state).then((response) => {
        setState(response.data)
        console.log(response)
      }).catch((error) => console.log(error))
      setTimeout(() => navigate("/"),500);

    }

    /*
     try {
       await axios.post("http://localhost:5000/api/post", state);
       toast.success("Studente aggiunto con successo");
       setTimeout(() => navigate("/"), 2000);
     } catch (err) {
      
       if (
         !state.specializzazione ||
         !state.anno ||
         !state.sezione ||
         !state.cognome ||
         !state.nome ||
         !state.residenza ||
         !state.data ||
         !state.img
         
       ) {
         toast.error("Per favore inserire i campi");
         
         console.log(state.id,
           state.specializzazione,
           state.anno,
           state.sezione,
           state.cognome,
           state.nome,
           state.residenza,
           state.data,
           state.img);
       } 

        <label htmlFor="id">ID</label>
       <input
         type="text"
         id="id"
         name="id"
         placeholder="Inserisce l'ID"
         onChange={handleInputChange}
       />
       
       console.log(err);
       setError(true)
     }*/
  }
  //get data from inputs
  function handleInputChange(e) {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        onSubmit={handleSubmit}
      >
        <label htmlFor="specializzazione">Specializzazione</label>
        <select
          id="specializzazione"
          name="specializzazione"
          onChange={handleInputChange}
        >
          <option value="bie">BIE</option>
          <option value="lst">LST</option>
          <option value="ele">ELE</option>
          <option value="inf">INF</option>
        </select>
        <label htmlFor="anno">Anno</label>
        <select id="anno" name="anno" onChange={handleInputChange} >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="sezione">Sezione</label>
        <select id="sezione" name="sezione" onChange={handleInputChange}>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
          <option value="e">E</option>
          <option value="f">F</option>
        </select>
        <label htmlFor="cognome">Cognome</label>
        <input
          type="text"
          id="cognome"
          name="cognome"
          placeholder="Inserisci il tuo cognome"
          onChange={handleInputChange}
        />
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Inserisci il tuo nome"
          onChange={handleInputChange}
        />

        <label htmlFor="residenza">Residenza</label>
        <input
          type="text"
          id="residenza"
          name="residenza"
          placeholder="Inserisci residenza"
          onChange={handleInputChange}
        />
        <label htmlFor="data">Data di Nascita</label>
        <input
          type="date"
          id="data"
          name="data"
          min="1983-01-01"
          max="2023-01-01"
          onChange={handleInputChange}
        />
        <label htmlFor="img">Seleziona immagine</label>
        <input type="file" id="img" name="img" accept=".jpg,.png,.jpeg" onChange={handleInputChange} />
        <input type="submit" id="button2" value="Salva" />

        <Link to="/">
          <input type="button" value="Indietro"></input>
        </Link>
      </form>
    </div>
  );
};

export default Add;
