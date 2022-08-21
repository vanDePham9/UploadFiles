const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
 
app.get('/', function(req, res) {
    res.json({ message: 'DEPV ON DA BEAT :D' });   
});

//setup multer storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) 
        cb(null, filename + '-' + file.originalname )
    }
})
const upload = multer({ storage: storage })

//only upload single file
app.post('/uploadfile', upload.single('formFile'), (req, res, next) => {
    console.log('req', req)
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
})
//upload multiple file
app.post('/uploadmultiple', upload.array('formFileMultiple', 2), (req, res, next) => {
    const files = req.files;
    if (!files) {
        const error = new Error('Upload files again')
        error.httpStatusCode = 400
        return next(error)
      }
    res.send(files);
})
 
app.listen(3000, () => console.log('Server started on port 3000'));