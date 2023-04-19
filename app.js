const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = 80;
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());




app.get('/', (req, res) => {
  let content = JSON.parse(fs.readFileSync('notes.json', 'utf8'));
  // console.log(content)
  res.render('index', { data: content });
});


app.post('/add', urlencodedParser, (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  let content = JSON.parse(fs.readFileSync('notes.json', 'utf8'));
  content.unshift(obj.newnote);
  fs.writeFileSync('notes.json', JSON.stringify(content));
  res.writeHead(301, { "Location": "/" });
  return res.end();
});
app.post('/delete', (req, res) => {
  const obj = req.body;
  var content = JSON.parse(fs.readFileSync('notes.json', 'utf8'));
  content.splice(obj.id, 1);
  fs.writeFileSync('notes.json', JSON.stringify(content));
  res.send(200)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
