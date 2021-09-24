const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(process.cwd() + '/public'));
// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        const file = req.files.upfile;
        //send response
        res.send({
            name: Array.isArray(file) ? file[0].name : file.name,
            type: Array.isArray(file) ? file[0].mimetype : file.mimetype,
            size: Array.isArray(file) ? file[0].size : file.size,
        });
    }
} catch (err) {
    res.status(500).send(err);
}
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
