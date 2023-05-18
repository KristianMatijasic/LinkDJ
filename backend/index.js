// ovo treba biti pokrenuto kako bi Axios radio
// pokreće se sa: node index.js

const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
//const conn=require('./connection')

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




/*
// Ovo riješava problem: 
// Origin <origin> is not allowed by Access-Control-Allow-Origin
// from origin 'http://localhost:4200' has been blocked by CORS policy
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// kraj fix-a
*/



//uzimanje podataka o atrakcijama
app.get('/DJ', (req,res)=>{
    dbConn.query("select * from DJ", (err,result)=>{
        if(err){
            res.send('error');
        }else{
            res.send(result);
        }
    });
});

// uzimanje podataka o komentarima
app.get("/Komentar", function (request, response) {
    dbConn.query("SELECT * FROM Komentar", function (error, results, fields) {
        if (error) throw error;
        return response.send({
            error: false,
            data: results,
            message: "lista komentara.",
        });
    });
});

//uzimanje podataka o korisnicima
app.get("/Korisnik", function (request, response) {
    dbConn.query("SELECT * FROM Korisnik", function (error, results, fields) {
        if (error) throw error;
        return response.send({
            error: false,
            data: results,
            message: "lista korisnika.",
        });
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


/*
app.delete('/atrakcije/id', function (request, response) {
    let id_atrakcije = request.params.id;
    if (!id_atrakcije) {
    return response.status(400).send({ error: true, message:
    'nedostaje id atrakcije' });
    }
    dbConn.query("DELETE * FROM atrakcije WHERE id_atrakcije = ?",[id_atrakcije],
    function (error, results) {
    if (error) throw error;
    return response.send({ error: false, data: results, message:
    'atrakcija je obrisana.' });
    });
});*/


app.delete('/obrisi_DJ/:id', function (request, response){

    
    let ID_DJ = request.params.id;
  
    console.log(`Received request to delete DJ with id: ${ID_DJ}`); // Log the received id
  
    if (!ID_DJ) {
      return response.status(400).send({ error: true, message: 'nedostaje ID_DJ' });
    }
  
   const deleteQuery = "DELETE  FROM DJ WHERE ID_DJ = ?";
     //const deleteQuery = "DELETE  FROM atrakcije WHERE id_atrakcije = '${id}'";
    dbConn.query(deleteQuery, [ID_DJ], function (error, results) {
      if (error) {
        console.log(`Error when executing the delete query: ${error}`); // Log any error from the query
        throw error;
      }
  
      console.log('Deletion result: ${JSON.stringify(results)}'); // Log the result of the deletion
  
      return response.send({ error: false, data: results, message: 'DJ je obrisan obrisi DJ.' });
    });
  });

  app.delete('/obrisi_sliku_DJ/:id', function (request, response){
    let ID_DJ = request.params.id;
    console.log(`Received request to delete DJ with id: ${ID_DJ}`); // Log the received id
    if (!ID_DJ) {
      return response.status(400).send({ error: true, message: 'nedostaje id DJ' });
    }
   const deleteQuery = "UPDATE DJ SET slika = NULL WHERE ID_DJ = ?";
     //const deleteQuery = "DELETE  FROM atrakcije WHERE id_atrakcije = '${id}'";
    dbConn.query(deleteQuery, [ID_DJ], function (error, results) {
      if (error) {
        console.log(`Error when executing the delete query: ${error}`); // Log any error from the query
        throw error;
      }
      console.log('Deletion result: ${JSON.stringify(results)}'); // Log the result of the deletion
  
      return response.send({ error: false, data: results, message: 'slika DJa je obrisana ' });
    });
  });

   // Dodavanje slike za DJA
 
  

  //  app.put('/dodajSliku/:id', (req, res) => {
  //   const data = [req.body.slika, req.params.id]
  //   dbConn.query("UPDATE DJ SET slika = ? WHERE ID_DJ = ?", data,(err,result)=>{
  //     if(err){
  //       res.send('Error')
  //     }else{
  //       res.send(result)
  //     }
  //   })
  // });

  
// unos DJ-a
  app.post('/unosDJ', function (request, response) {
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







//port na kojem je app
app.listen(4200, function () {
console.log('Node app is running on port 4200');
});
//module.exports = app;


