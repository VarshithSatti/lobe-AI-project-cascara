var formidable = require('formidable');
var fs = require('fs');
var http = require("http");




//
var predi;

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;

      //


      var options = {
        "method": "POST",
        "hostname": "localhost",
        "port": "38100",
        "path": "/predict/24e808d8-97bc-47c6-9abf-d95ec7a78afc",
        "headers": {}
      };

      var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
          predi = body.toString();
        });
      });

      req.write(JSON.stringify({
        inputs: {
          Image: base64_encode(oldpath)
        }
      }));
      req.end();
    });
    //
    res.end(predi);
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);

// base64 convertor function


function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  //console.log(new Buffer(bitmap).toString('base64'));
  return new Buffer(bitmap).toString('base64');
}