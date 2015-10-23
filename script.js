//the gist takes an object
var permalink = function(data){
  var obj = JSON.stringify(data.data);
  var description = data.description || 'default';
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
  
  xhr.onload = function(){
    if(xhr.status === 201){
      var gistData = JSON.parse(xhr.responseText);
      console.log(xhr.status);
    } else {
      console.log(xhr.status);
      return;
    }
      return gistData.id;
  }
  
  xhr.send(JSON.stringify(gist));
  
};

var link = permalink({'data':{'my':'test'}});
console.log(link);