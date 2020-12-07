var https = require('https');
var formidable = require('formidable');
var fs = require('fs');

//
//
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
//
//

https.createServer(options, function (req, res) {
  console.log("");
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'pictures' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br><input type="submit"></form>');
    res.write('<form action="/fileupload method="post">');
    res.write('<input type="submit" value="Submit">');
    res.write('</form>');
  }
}).listen(process.env.PORT || 3000);