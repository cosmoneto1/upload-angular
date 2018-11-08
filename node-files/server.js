const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const multer = require('multer');
const bodyParser = require('body-parser');

var storage = multer.diskStorage({
  // destination
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.post('/files/upload', upload.array('arquivos', 12), (req, res, next) => {
  console.log(req.files);
  console.log(req.body);
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  res.send(req.files);
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
