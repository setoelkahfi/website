var options = {
	"aspectRatio":"16:9",
	"fluid": true
};

var player = videojs('player', options, function onPlayerReady() {
  console.log('Player ready');
	
	this.play();

  this.on('ended', function() {
    console.log('Ended');
  });
});