var formidable = require('formidable');
var fs = require('fs');
var http = require("http");
var a;

function getPretdication(data, nodejs_res, imag) {
  var options = {
    "method": "POST",
    "hostname": "localhost",
    "port": "38100",
    "path": "/predict/24e808d8-97bc-47c6-9abf-d95ec7a78afc",
    "headers": {}
  };

  var req = http.request(options, function (lobe_res) {
    var chunks = [];

    lobe_res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    lobe_res.on("end", function () {
      var body = Buffer.concat(chunks);
      //console.log(body.toString());
      var predi = body.toString();
      console.log(predi);
      //console.log("======================================================================================================================================");
      //nodejs_res.write(a);
      //nodejs_res.write("<img src='" + imag + "'/>")
      nodejs_res.write(predi);
      return nodejs_res.end();
    });
  });

  req.write(JSON.stringify({
    inputs: {
      Image: data
    }
  }));
  req.end();
}

// variables and functions

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      getPretdication(base64_encode(oldpath), res, oldpath);
      
    });
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
  a = new Buffer.from(bitmap).toString('base64');
  //console.log(new Buffer.from(bitmap).toString('base64'));
  return new Buffer.from(bitmap).toString('base64');
}
