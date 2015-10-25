/*!
 * @overview  gistlink.js
 *
 * @copyright (c) 2015 Lucus Pettigrew
 *                gistlink.js is freely
 *                distributable.
 *
 */

function permalink(options) {

    var obj = JSON.stringify(options);

    var gist = {
      description: 'permalink from: ' + window.location,
      public: false,
      files: {
        'source.json': {
          'content': obj
        }
      }
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.github.com/gists', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function() {
      if (xhr.status === 201) {
        var result = (JSON.parse(xhr.responseText));
        createHistory(result.id);
      } else {
        console.log(Error(xhr.status));
      }
    }

    xhr.send(JSON.stringify(gist));

  };

// almost verbatim from http://konklone.io/json/
function createHistory(id){
  if (history && history.pushState){
    history.pushState({id: id}, null, "?id=" + id);
    console.log("Permalink Created! (Copy from the address bar)");
  }
}

function loadPermalink(){
  var id = getParam('id');
  if(!id) return;
  
  var getXhr = new XMLHttpRequest();
  getXhr.open('GET', 'https://api.github.com/gists/' + id, true);
  
  getXhr.onload = function(){
    if(getXhr.status === 200){
      var input = (JSON.parse(getXhr.responseText));
      var resultsObj = JSON.parse(input.files["source.json"].content);
      console.log(resultsObj);
    } else {
      console.log(getXhr.status);
    }
  }
  
  getXhr.send();
  
}

//directly from http://konklone.io/json/
function getParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}