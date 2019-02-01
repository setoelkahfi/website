var loadNextStreamInfo = function(){

  var nextStreamElm = document.getElementById("next-stream");
  if(nextStreamElm === null)
    return;

  var url = '/api/events/';

  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onreadystatechange = function () { 
    if (req.readyState === 4 && req.status === 200) {
      
      var responseJSON  = JSON.parse(req.responseText);
      if(responseJSON.length > 0){
        var nextStream    = responseJSON[0];
        var artist        = nextStream.artist;
        var starts        = moment(nextStream.start_time).format('LLLL');
        
        nextStreamElm.innerHTML = 'NEXT STREAM: '+artist.name+' | '+starts;
        nextStreamElm.classList.add("show");
      }

    }
  };
  
}
window.onload = function () {
  loadNextStreamInfo();
  
}