
var webshot = require('webshot');

webshot(url, 'reference.png', function(err) {
  // screenshot now saved to current.png
  console.log("taking reference screenshot");
}
