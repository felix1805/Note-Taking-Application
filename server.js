const fs = require('fs');
const express = require('express');
const path = require('path');
const dbJson = require('./db/db.json')


const uuid = require('./helpers/uuid');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res)=> {
    const data = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const notesJson = JSON.parse(data);
    res.json(notesJson);

});


app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
