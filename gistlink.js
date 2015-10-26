var permalink = (function() {

  var _permalink = {};

  _permalink.set = function(json, options) {
    if (!json) return;

    var obj = JSON.stringify(json);

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
        var data = (JSON.parse(xhr.responseText));
        _permalink.createHistory(data.id);
        console.log(data.id);
      } else {
        console.log(Error(xhr.status));
      }
    }

    xhr.send(JSON.stringify(gist));

  };

  _permalink.load = function(callback) {
    var id = _permalink.getParam('id');
    if (!id) return;

    var getXhr = new XMLHttpRequest();
    getXhr.open('GET', 'https://api.github.com/gists/' + id, true);

    getXhr.onload = function() {
      if (getXhr.status === 200) {
        var input = (JSON.parse(getXhr.responseText));
        var resultsObj = input.files["source.json"].content;
        callback(resultsObj);
      } else {
        console.log(getXhr.status);
      }
    }

    getXhr.send();
  }

  // helper for permalink.set
  _permalink.createHistory = function(id) {
    if (history && history.pushState) {
      history.pushState({
        id: id
      }, null, "?id=" + id);
      console.log("Permalink Created! (Copy from the address bar)");
    }
  };

  // helper for load
  // directly from konklone.io/json/
  _permalink.getParam = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };
  
  return _permalink;

}());