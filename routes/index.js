var express = require('express');
var router = express.Router();
var fs = require('fs'),
    fsExtra = require('fs-extra'),
    formidable = require('formidable'),
    path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Tu seras bienvenue chez moiiiiiaaaaa !' });
});
router.get('/chat', function(req, res) {
    var uploadPath = __dirname + '/../public/upload';
    fs.readdir(uploadPath, function (err, list) {
        var files = [];
        for(var i = 0; i < list.length; i++) {
            files.push('/upload/' + list[i]);
        }
        res.render('chat', { title: 'Super Chatty Chat', files: files });
    });
});
router.post('/upload', function (req, res) {
    var uploadPath = __dirname + '/../public/upload';
    if(req.method.toLowerCase() == 'post') {
        console.log('Un fichier arrive.');

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log('Upload.');
        });

        form.on('end', function (fields, files) {
            var temp_path = this.openedFiles[0].path;
            console.log(temp_path);
            var file_name = this.openedFiles[0].name;
            console.log(file_name);
            fsExtra.copy(temp_path, uploadPath + '/' + file_name, function (err) {
                if(err) {
                    console.error(err);
                } else {
                    console.log('Fichier enregistré');
                    res.redirect('/file');
                }
            });
        });
    }
});
router.get('/file', function(req, res, next) {
    var uploadPath = __dirname + '/../public/upload';
    fs.readdir(uploadPath, function (err, list) {
        var files = [];
        for(var i = 0; i < list.length; i++) {
            files.push('/upload/' + list[i]);
        }
        res.render('file', { title: 'Un petit fichier ?', files: files });
    });
});

module.exports = router;
