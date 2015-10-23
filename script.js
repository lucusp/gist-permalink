//the gist takes an object
function permalink(data) {

  return new Promise(function(resolve, reject) {

    var obj = JSON.stringify(data.data);
    var description = data.description || 'permalink from: ' + window.location;
    var public = data.public || false;
    var gistURL = 'https://api.github.com/gists';

    var gist = {
      description: description,
      public: public,
      files: {
        'source.json': {
          'content': obj
        }
      }
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', gistURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function() {
      if (xhr.status === 201) {
        resolve(xhr.responseText)
      } else {
        reject(Error(xhr.status));
      }
    }

    xhr.send(JSON.stringify(gist));

  });

};

var myObj = {
  'data': {
    'me': 'test'
  }
};

permalink(myObj).then(function(result) {
  var myData = JSON.parse(result);
  console.log(JSON.parse(myData.files["source.json"].content));
});