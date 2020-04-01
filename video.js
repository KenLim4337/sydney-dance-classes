//Data Struct for a video
var videoData = {
  id: '000',
  title: 'Test Video 101',
  //VP8, H264, OGG Codec
  links: {
      'high': {
          // 'wrapper format':['link','codec']
          'mp4': ['E:/Users/admin/Documents/sydney-dance-classes/examplevid/example.mp4', ''],
          //'webm': ['', ''],
      },
      'low': {
          // 'wrapper format':['link','codec']
          'mp4': ['E:/Users/admin/Documents/sydney-dance-classes/examplevid/example.mp4', ''],
          //'webm': ['', ''],
      }
  },
  sections: {
      1: {
          title: '',
          time: 0,
      },
      2: {
          title: '',
          time: 0,
      },
      3: {
          title: '',
          time: 0,
      },
      4: {
          title: '',
          time: 0,
      },
      5: {
          title: '',
          time: 0,
      },
  }
}

var videoPlayers = [];


document.addEventListener("DOMContentLoaded", function () {
  videoPlayers.push(new Video(videoData.id, videoData.title, videoData.links, videoData.sections, 'videoWrapper'));
  
  setTimeout(function(){
      eventHelper(videoPlayers[0]);
  },100)
}, false);

//Video Constructor
function Video(id, title, links, sections, containerId) {
  this.id = id;
  this.title = title;
  this.links = links;
  this.sections = sections;
  this.container = document.getElementById(containerId);
  
  //Populated when player is built
  this.player;

  //Build player
  var playerNode = document.createElement('video');
  playerNode.dataset.id = this.id;
  playerNode.dataset.title = this.title;

  for (var i = 0; i < Object.keys(this.links.high).length; i++) {
      var tempKey = Object.keys(this.links.high)[i];
      //Add video tags for each codec/format
      var source = document.createElement('source');

      //Link
      source.setAttribute('src', this.links.high[tempKey][0]);
      //Codec settings
      source.setAttribute('type', 'video/' + tempKey);
      source.setAttribute('codecs', this.links.high[tempKey][1]);

      playerNode.appendChild(source);
  }

  playerNode.innerHTML += 'Your browser does not support the video tag.';

  this.container.appendChild(playerNode);

  this.player = this.container.querySelector('video');

  //Avoid destroying anyone's hearing
  this.player.volume = 0.4;

  //Add controls

  var controlNode = document.createElement('div');
  controlNode.classList.add('controlWrapper');
  controlNode.classList.add('controlWrapper');

  controlNode.innerHTML = `    
  
  <div id='progressBar'> <span class="active"></span> <span class="dot"></span> <span class="buffered"></span></div>

  <div id='nonProg'>

    <div class="leftClust">
      <button id="playBtn">Play</button>
      <button id="backward">RW</button>
      <button id="forward">FF</button>
      
      <button id="mirror">Mirror</button>

      <div class="volumeClust">
        <button id="mute">Mute</button>
        <input type="range" min="0" max="1" value="0.4" step="0.01" id="volumeSlider">
      </div>
    </div>

    <div class="rightClust">

      <select name="Speed" id="speed">
        <option value="0.25">0.25</option>
        <option value="0.5">0.5</option>
        <option value="1" selected="selected">1</option>
        <option value="1.5">1.5</option>
        <option value="2">2</option>
        <option value="2.5">2.5</option>
      </select>


      <select name="Quality" id="quality">
        <option value="auto" selected="selected">Auto</option>
        <option value="high">High</option>
        <option value="low">Low</option>
      </select>

      <button id="fullscreen">Fullscreen</button>
    </div>
   
  </div>
  
  `;

  this.container.appendChild(controlNode);

  this.controls = this.container.querySelector('.controlWrapper');

  this.playToggle = function () {
      // If the mediaPlayer is currently paused or has ended
      if (this.player.paused || this.player.ended) {
          this.player.play();
      } else {
          this.player.pause();
      }
  };

  this.mirrorToggle = function () {
      if (this.player.style.transform == '' || this.player.style.transform == 'rotateY(0deg)') {
          this.player.style.transform = 'rotateY(180deg)';
      } else {
          this.player.style.transform = 'rotateY(0deg)';
      }
  };

  this.fullScreenToggle = function () {
    //Enter fullscreen
    //https://github.com/sindresorhus/screenfull.js
    screenfull.request(this.player);
  };

  this.speedAdjust = function (speed) {
      this.player.playbackRate = speed;
  };

  this.increment = function (direction) {
      var incAmt = direction == 'ff' ? 10 : -10;
      this.player.currentTime += incAmt;
  };

  this.seek = function (time) {
      this.player.currentTime = time;
  };

  this.volumeAdjust = function (value) {
      this.player.muted = false;
      this.player.volume = value;
  };

  this.muteToggle = function (direction, time) {
    //Toggle volume mute
    if(this.player.muted) {
      this.player.muted = false;
    } else {
      this.player.muted = true;
    }
  };

  this.qualityAdjust = function (quality) {
      this.player.currentSrc;
      this.player.src;
  };

  this.reset = function(){
    
  }
}


function eventHelper(targetVideo) {
  //ios click events:  http://www.shdon.com/blog/2013/06/07/why-your-click-events-don-t-work-on-mobile-safari

  var target = targetVideo;

  target.controls.querySelector('#playBtn').addEventListener('click', function(){
    target.playToggle();
  });

  var clicked = false;
  target.controls.querySelector('#progressBar').addEventListener('mousedown',function(e){
    console.log(e);
    clicked = true;
  });

  target.controls.querySelector('#progressBar').addEventListener('mousemove',function(e){
    if(clicked) {
    console.log(e);
    }
  });

  target.controls.querySelector('#progressBar').addEventListener('mouseup',function(e){
    var percentage = 1 - ((target.controls.querySelector('#progressBar').offsetWidth - e.offsetX) / target.controls.querySelector('#progressBar').offsetWidth);

    target.seek(percentage*target.player.duration)
    clicked = false;
  });


  target.controls.querySelector('#forward').addEventListener('click', function(){
      target.increment('ff');
    });

  target.controls.querySelector('#backward').addEventListener('click', function(){
      target.increment('rw');
  });

  target.controls.querySelector('#mute').addEventListener('click', function(){
    target.muteToggle();
  });
  
  target.controls.querySelector('#volumeSlider').addEventListener('change', function(){
      var newVolume = target.controls.querySelector('#volumeSlider').value;
      
      target.volumeAdjust(newVolume);
  });

  target.controls.querySelector('#mirror').addEventListener('click', function(){
    target.mirrorToggle();
  });

  target.controls.querySelector('#speed').addEventListener('change', function(){
    var newSpeed = target.controls.querySelector('#speed').value;
    target.speedAdjust(newSpeed);
  });

  target.controls.querySelector('#fullscreen').addEventListener('click', function(){
    target.fullScreenToggle();
  });
}
