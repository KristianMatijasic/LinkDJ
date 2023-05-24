// ovo treba biti pokrenuto kako bi Axios radio
// pokreće se sa: node index.js

const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); 
app.use(express.json());
const dbConfig = require("./dbConfig");


app.use(cors());



var dbConn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//spajanje s bazom
dbConn.connect()


//uzimanje podataka o djevima
app.get('/DJ', (req,res)=>{
    dbConn.query("select * from DJ", (err,result)=>{
        if(err){
            res.send('error');
        }else{
            res.send(result);
        }
    });
});


app.get('/DJ/:id', function (request, response) {
    let ID_DJ = request.params.id;
    if (!ID_DJ) {
        return response.status(400).send({
            error: true, 
            
            message: 'Unesite ID_DJ'
        });
    }
    dbConn.query('SELECT * FROM DJ where ID_DJ=?', ID_DJ, function
        (error, results, fields) {
        if (error) throw error;
        return response.send({
           data: results[0]
                
        });
    });
});


// unos DJ-a
  app.post('/DJ', function (request, response) {
    const data = request.body;
    DJ = [[data.DJime, data.ime, data.prezime, data.zanr, data.grad, data.broj, data.email, data.Slika]]
    
    dbConn.query('INSERT INTO DJ (DJime, ime, prezime, zanr, grad, broj, email, Slika ) VALUES ? ',
    [DJ], function (error, results, fields) {
    if (error) throw error;
    return response.send({ error: false, data: results, message:'DJ unesen.' });
    });
  });
  app.post("/api/unos-slike", function (req, res) {
    const data = req.body;
    const Slika = data.Slika;
  
    connection.query(
      "INSERT INTO predmet (Slika) VALUES (?)",
      [Slika],
      function (error, results, fields) {
        if (error) {
          console.error(error);
          return res.status(500).send({
            error: true,
            message: "Dogodila se greška prilikom dodavanja slike.",
          });
        }
        return res.send({
          error: false,
          data: results,
          message: "Slika je dodana.",
        });
      }
    );
  });

  app.put("/api/update-slike", function (req, res) {
    const data = req.body;
    const Slika = data.Slika;
  
    connection.query(
      "UPDATE predmet (Slika) VALUES (?)",
      [Slika],
      function (error, results, fields) {
        if (error) {
          console.error(error);
          return res.status(500).send({
            error: true,
            message: "Dogodila se greška prilikom dodavanja slike.",
          });
        }
        return res.send({
          error: false,
          data: results,
          message: "Slika je dodana.",
        });
      }
    );
  });


  //unos rezervacije
  app.post('/unos_rez', function (request, response) {
    const data = request.body;
    Rezervacija = [[data.ime_rez, data.prez_rez, data.broj_rez, data.mail_rez, data.datum]]
    
    dbConn.query('INSERT INTO Rezervacija (ime_rez, prez_rez, broj_rez, mail_rez, datum ) VALUES ? ',
    [Rezervacija], function (error, results, fields) {
    if (error) throw error;
    return response.send({ error: false, data: results, message:'Rezervacija unesena.' });
    });
  });


//pregled rez
app.get('/pregled_rez/:id', function (request, response) {
  let ID_rez = request.params.id;
  if (!ID_rez) {
      return response.status(400).send({
          error: true, 
          
          message: 'Unesite id_rezervacije'
      });
  }
  dbConn.query('SELECT * FROM Rezervacija where ID_rez=?', ID_rez, function
      (error, results, fields) {
      if (error) throw error;
      return response.send({
         data: results[0]
              
      });
  });
});
app.get('/pregled_rez', (req,res)=>{
  dbConn.query("select * from Rezervacija", (err,result)=>{
      if(err){
          res.send('error');
      }else{
          res.send(result);
      }
  });
});




// uzimanje podataka o pjesmama
app.get("/pjesme", function (request, response) {
  dbConn.query("SELECT * FROM Pjesma", function (error, results, fields) {
      if (error) throw error;
      return response.send({
          error: false,
          data: results,
          message: "lista pjesama.",
      });
  });
});

//prikaz pjesme
app.get('/pjesme/:id', function (request, response) {
let ID_DJ = request.params.id;
dbConn.query("SELECT * FROM Pjesma WHERE VK_ID_DJ=?", ID_DJ, function (error, results, fields) {
    if (error) throw error;
    return response.send({
        error: false,
        data: results,
        message: "lista pjesama.",
    });
});
});

//unos pjesme za DJ-a po ID-u
app.post('/unos_pjes/:id', (req, res) => {
  const data = [req.body.naziv_pjesma, req.body.link_pjesma, req.params.id]
  dbConn.query("INSERT INTO Pjesma (naziv_pjesma, link_pjesma, VK_ID_DJ) VALUES (?,?,?)", data,(err,result)=>{
    if(err){
      res.send('Error')
    }else{
      res.send(result)
    }
  })
});




//port na kojem je app
app.listen(4200, function () {
console.log('Node app is running on port 4200');
});
//module.exports = app;


