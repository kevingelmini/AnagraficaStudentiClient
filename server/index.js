const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Killanabbi9595",
  database: "db_alunni",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.get("/api/get", (req, res) => {
  const sqlGet = "select * from alunni2004";
  db.query(sqlGet, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/api/post", (req, res) => {
  const values = [
    req.body.specializzazione,
    req.body.anno,
    req.body.cognome,
    req.body.nome,
    req.body.sezione,
    req.body.residenza,
    req.body.data,
    req.body.img];
    
  const sqlInsert =
    "insert into alunni2004(`specializzazione`, `anno`, `cognome`,`nome`, `sezione`, `residenza`, `datanascita`, `foto`) values (?)";
  db.query(sqlInsert, [values]),
    (error, result) => {
      if (error) {
        return res.json(data);
      }
    };
});
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "delete from alunni2004 where id = ?";
  db.query(sqlRemove, [id]),
    (error, result) => {
      if (error) {
        console.log(error);
      }
    };
});
app.get("/api/get/:id", (req, res) => {
  const {id} = req.params;
  const sqlGet = "select * from alunni2004 where id = ?";
  db.query(sqlGet,id, (error, result) => {
    if(error){
      console.log(error)
    }
    res.send(result);
  });
});
app.put("/api/put/:id", (req, res) => {
  //const{id} = req.params;
  const studId = req.params.id;
  const values = [req.body.specializzazione,req.body.anno,req.body.cognome,req.body.nome,req.body.sezione,req.body.residenza,req.body.data,req.body.img];
  const sqlUpdate = "update alunni2004 set  specializzazione = ?,anno = ?,cognome = ?,nome = ?,sezione= ?,residenza = ?,datanascita = ?,foto = ? where id = ?";
  db.query(sqlUpdate,[...values, studId], (error, result) => {
    if(error){
      console.log(error)
    }
    res.send(result);
  });
});

app.get("/api/students" , (req,res) => {
  const values = [req.query.specializzazione, req.query.anno,req.query.sezione];
    const sqlGet = "select * from alunni2004 where specializzazione = ? and anno = ? and sezione = ?";
    db.query(sqlGet,[...values],(err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
    
})
app.get("/", (req, res) => {
  res.send("Hello Express");
});
