//Data Struct for a video
var videoData = {
  id: '000',
  title: 'Test Video 101',
  //VP8, H264, OGG Codec
  links: {
    '1080': {
      // 'wrapper format':['link','codec']
      'mp4': ['https://demo-vid-dance.s3-ap-southeast-2.amazonaws.com/Mitch+Online+-+BTS+ON+-+1080.mp4', ''],
      //'webm': ['', ''],
    },
    '720': {
      // 'wrapper format':['link','codec']
      'mp4': ['https://demo-vid-dance.s3-ap-southeast-2.amazonaws.com/Mitch+Online+-+BTS+ON+-+720.mp4', ''],
      //'webm': ['', ''],
    },
    '480': {
      // 'wrapper format':['link','codec']
      'mp4': ['https://demo-vid-dance.s3-ap-southeast-2.amazonaws.com/Mitch+Online+-+BTS+ON+-+480.mp4', ''],
      //'webm': ['', ''],
    }
  },
  sections: {
    1: {
      'title': 'Chorus',
      'time': 120,
    },
    2: {
      'title': 'Jazz Hands',
      'time': 180,
    },
  }
}

var videoPlayers = [];


document.addEventListener("DOMContentLoaded", function () {
  videoPlayers.push(new Video(videoData.id, videoData.title, videoData.links, videoData.sections,
    'videoWrapper'));

  setTimeout(function () {
    eventHelper(videoPlayers[0]);
  }, 100)
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

  for (var i = 0; i < Object.keys(this.links['1080']).length; i++) {
    var tempKey = Object.keys(this.links['1080'])[i];
    //Add video tags for each codec/format
    var source = document.createElement('source');

    //Link
    source.setAttribute('src', this.links['1080'][tempKey][0]);
    //Codec settings
    source.setAttribute('type', 'video/' + tempKey);
    source.setAttribute('codecs', this.links['1080'][tempKey][1]);

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
        <div id="vidOverlay"></div>
        <div class="overlayPlay">

          <svg version="1.0" id="playIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50"
            xml:space="preserve">
            <g>
              <path d="M4.731,4.381c0-1.1,0.786-1.562,1.747-1.025l37.044,20.669c0.96,0.536,0.96,1.413,0,1.949L6.478,46.645
              c-0.96,0.536-1.747,0.074-1.747-1.025V4.381z" />
            </g>
          </svg>
        </div>

        <div class="overlayLoading"><img src="https://danceclassesinsydney.com.au/wp-content/uploads/2020/04/Spinner-1s-200px.gif" alt="loading gif"></div>

<div id='progressBar'> <span class="progBG"></span> <span class="active"></span> <span class="dot"></span><div class="bufferWrap"></div></div>

<div id='nonProg'>

  <div class="leftClust">

    <span class="textTimer"><span class="progTime">00:00</span><span>/</span><span class="totalTime">00:00</span></span>

    <button id="playBtn" title="Play Video">

      <svg version="1.0" id="playIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50"
        xml:space="preserve">
        <g>
          <path d="M4.731,4.381c0-1.1,0.786-1.562,1.747-1.025l37.044,20.669c0.96,0.536,0.96,1.413,0,1.949L6.478,46.645
c-0.96,0.536-1.747,0.074-1.747-1.025V4.381z" />
        </g>
      </svg>

      <svg version="1.0" id="pauseIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50"
        xml:space="preserve">
        <g>
          <path
            d="M5.572,45.434c0,1.1,0.9,2,2,2h9.46c1.1,0,2-0.9,2-2V4.566c0-1.1-0.9-2-2-2h-9.46c-1.1,0-2,0.9-2,2V45.434z" />
        </g>
        <g>
          <path
            d="M30.968,45.434c0,1.1,0.9,2,2,2h9.46c1.1,0,2-0.9,2-2V4.567c0-1.1-0.9-2-2-2h-9.46c-1.1,0-2,0.9-2,2V45.434z" />
        </g>
      </svg>

    </button>
    <button id="backward" title="Rewind 10 Seconds">
      <svg version="1.0" id="rwIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50"
        xml:space="preserve">
        <path class="rwArrw" d="M8,26c0,9.39,7.611,17,17,17s17-7.61,17-17c0-9.286-7.449-16.82-16.695-16.984v2.434L20.21,8.034l5.095-3.416v2.397
C35.656,7.18,44,15.609,44,26c0,10.493-8.506,19-19,19S6,36.493,6,26H8z" />
        <text transform="matrix(1 0 0 1 15.2212 31.3926)" font-family="'Calibri'" font-size="19.2941">10</text>
      </svg>
    </button>

    <button id="forward" title="Fast Forward 10 Seconds">
      <svg version="1.0" id="ffIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50"
        xml:space="preserve">
        <path class="ffArrw" d="M42,25c0,9.39-7.611,17-17,17S8,34.39,8,25c0-9.286,7.449-16.82,16.695-16.984v2.434l5.095-3.416l-5.095-3.416v2.397
C14.344,6.18,6,14.609,6,25c0,10.493,8.506,19,19,19c10.494,0,19-8.507,19-19H42z" />
        <text transform="matrix(1 0 0 1 15.2212 30.3926)" font-family="'Calibri'" font-size="19.2941">10</text>
      </svg>
    </button>

    <button id="mirror" title="Mirror Video">
     Mirror
    </button>

    <div class="volumeClust">
      <button id="mute" title="Mute">
        <svg version="1.0" id="volIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50"
          xml:space="preserve">
          <g>
            <path class="speaker" d="M12.048,15.224c-0.44,0.33-1.25,0.6-1.8,0.6H3c-0.55,0-1,0.45-1,1v16.495c0,0.55,0.45,1,1,1h7.248
    c0.55,0,1.36,0.27,1.8,0.6l10.73,8.049c0.44,0.33,0.8,0.149,0.8-0.4V7.578c0-0.55-0.36-0.73-0.8-0.4L12.048,15.224z" />
          </g>
          <path class="speakerKnob"
            d="M23.578,20.336v9.473c1.87-0.762,3.19-2.592,3.19-4.737C26.768,22.928,25.448,21.098,23.578,20.336z" />

          <path class="hiVol" d="M29.122,4.713V6.7c9.88,0,17.891,8.01,17.891,17.891c0,9.882-8.011,17.889-17.891,17.889v1.99
  C40.101,44.471,49,35.568,49,24.591C49,13.612,40.101,4.713,29.122,4.713z" />
          <path class="mdVol" d="M27.976,10.676v1.987c6.589,0,11.929,5.341,11.929,11.928c0,6.588-5.34,11.927-11.929,11.927v1.989
  c7.686,0,13.916-6.231,13.916-13.916C41.892,16.907,35.661,10.676,27.976,10.676z" />
          <path class="loVol" d="M26.792,16.64v1.988c3.293,0,5.962,2.67,5.962,5.964c0,3.293-2.669,5.963-5.962,5.963v1.987c4.391,0,7.95-3.559,7.95-7.95
  S31.183,16.64,26.792,16.64z" />
        </svg>
      </button>
      <input type="range" min="0" max="1" value="0.4" step="0.01" id="volumeSlider" title="Adjust Volume"
        name="Adjust Volume">
    </div>
  </div>

  <div class="rightClust">

    <select name="Speed" id="speed" title="Adjust Video Speed">
      <option value="0.25">0.25x</option>
      <option value="0.5">0.5x</option>
      <option value="1" selected="selected">1x</option>
      <option value="1.5">1.5x</option>
      <option value="2">2x</option>
      <option value="2.5">2.5x</option>
    </select>


    <select name="Quality" id="quality" title="Adjust Video Quality">
      <option value="auto" selected="selected">Auto</option>
      <option value="1080">1080p</option>
      <option value="720">720p</option>
      <option value="480">480p</option>
    </select>

    <button id="fullscreen" title="Toggle Fullscreen">
      <svg version="1.0" id="fullscrnIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50"
        xml:space="preserve">
        <g>
          <path d="M18.35,6.35c0-0.55-0.45-1-1-1h-10c-0.55,0-1.45,0-2,0h-1c-0.55,0-1,0.45-1,1v1c0,0.55,0,1.45,0,2v10c0,0.55,0.45,1,1,1h1
c0.55,0,1-0.45,1-1v-10c0-0.55,0.45-1,1-1h10c0.55,0,1-0.45,1-1V6.35z" />
        </g>
        <g>
          <path d="M4.35,29.65c-0.55,0-1,0.45-1,1v10c0,0.55,0,1.45,0,2v1c0,0.55,0.45,1,1,1h1c0.55,0,1.45,0,2,0h10c0.55,0,1-0.45,1-1v-1
c0-0.55-0.45-1-1-1h-10c-0.55,0-1-0.45-1-1v-10c0-0.55-0.45-1-1-1H4.35z" />
        </g>
        <g>
          <path d="M31.65,43.65c0,0.55,0.45,1,1,1h10c0.55,0,1.45,0,2,0h1c0.55,0,1-0.45,1-1v-1c0-0.55,0-1.45,0-2v-10c0-0.55-0.45-1-1-1h-1
c-0.55,0-1,0.45-1,1v10c0,0.55-0.45,1-1,1h-10c-0.55,0-1,0.45-1,1V43.65z" />
        </g>
        <g>
          <path d="M45.649,20.35c0.55,0,1-0.45,1-1v-10c0-0.55,0-1.45,0-2v-1c0-0.55-0.45-1-1-1H44.65c-0.55,0-1.45,0-2,0h-10
c-0.55,0-1,0.45-1,1v1c0,0.55,0.45,1,1,1h10c0.55,0,1,0.45,1,1v10c0,0.55,0.45,1,1,1H45.649z" />
        </g>
      </svg>
    </button>
  </div>

</div>
    
    `;




  this.container.appendChild(controlNode);
  var parent = this;
  var totalTimePoller = setInterval(function () {
    if (parent.player.duration) {
      var totalTime = secToMin(parent.player.duration);
      var tempTotalMins = totalTime[0] > 9 ? totalTime[0] : '0' + totalTime[0];
      var tempTotalSecs = totalTime[1] > 9 ? totalTime[1] : '0' + totalTime[1];
      parent.controls.querySelector('.textTimer .totalTime').innerHTML = tempTotalMins + ':' + tempTotalSecs;
      clearInterval(totalTimePoller);


      if (parent.container.querySelectorAll('.vidSection').length === 0) {
        for (var i = 0; i < Object.keys(parent.sections).length; i++) {
          var currentSect = parent.sections[i + 1];
          var relTime = (currentSect.time / parent.player.duration) * 100;
          var tempSect = document.createElement('span');
          tempSect.classList.add('vidSection');
          tempSect.style.left = relTime + '%';
          tempSect.innerHTML = '<div class="sectionWrap"><div class="bookmarkContent">' + currentSect.title + '</div></div>';
          parent.controls.querySelector('#progressBar').appendChild(tempSect);
        }
      }
    }
  }, 50);

  this.controls = this.container.querySelector('.controlWrapper');
  this.controls.querySelector('#mute').classList.add('mid');

  this.playToggle = function () {
    if (this.player.paused || this.player.ended) {
      this.player.play();
      this.controls.querySelector('#playBtn').classList.add('paused');
      this.pollerToggle(true);
    } else {
      this.player.pause();
      this.controls.querySelector('#playBtn').classList.remove('paused');
      //this.pollerToggle(false);
    }
  };

  var playPoller;

  this.refPause = function () {
    this.player.pause();
  }

  var bufferThrottle = 0;
  this.pollerToggle = function (turnon) {
    if (turnon) {
      playPoller = setInterval(function () {
        if (!parent.player.paused) {
          parent.playUpdate();
        }
        if (bufferThrottle >= 6) {
          parent.bufferGen();
          bufferThrottle = 0;
        } else {
          bufferThrottle++;
        }
      }, 333);
    } else {
      clearInterval(playPoller);
    }
  };

  this.playUpdate = function () {
    var percentagePlayed = (this.player.currentTime / this.player.duration) * 100;
    var currentTime = secToMin(this.player.currentTime);
    var tempMins = currentTime[0] > 9 ? currentTime[0] : '0' + currentTime[0];
    var tempSecs = currentTime[1] > 9 ? currentTime[1] : '0' + currentTime[1];
    this.controls.querySelector('.textTimer .progTime').innerHTML = tempMins + ':' + tempSecs;
    this.controls.querySelector('#progressBar .active').style.width = percentagePlayed + '%';
    this.controls.querySelector('#progressBar .dot').style.left = 'calc(' + percentagePlayed + '% - 7px)';
  };

  this.bufferGen = function () {

    parent.controls.querySelector('#progressBar .bufferWrap').innerHTML = '';

    var buffed = parent.player.buffered;
    var added = [];
    for (var i = 0; i < buffed.length; i++) {
      var tempstart = (buffed.start(i) / parent.player.duration) * 100;
      var tempend = (buffed.end(i) / parent.player.duration) * 100;
      var length = ((buffed.end(i) - buffed.start(i)) / parent.player.duration) * 100;
      if (length !== 0 && added.indexOf(Math.floor(tempstart)) === -1) {

        added.push(Math.floor(tempstart));

        var tempBar = document.createElement('span');
        tempBar.classList.add('buffered');
        tempBar.style.width = length + '%';
        tempBar.style.left = tempstart + '%';

        parent.controls.querySelector('#progressBar .bufferWrap').appendChild(tempBar);

      }

      if (parent.player.paused) {
        parent.controls.querySelector('.overlayLoading').style.display = 'none';
      }
    }
  }

  this.mirrorToggle = function () {
    if (this.player.style.transform == '' || this.player.style.transform == 'rotateY(0deg)') {
      this.player.style.transform = 'rotateY(180deg)';
      this.controls.querySelector('#mirror').classList.add('mirrored');
    } else {
      this.player.style.transform = 'rotateY(0deg)';
      this.controls.querySelector('#mirror').classList.remove('mirrored');
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
    this.playUpdate();
  };

  this.seek = function (time) {
    this.player.currentTime = time;
    this.playUpdate();
  };


  this.volumeAdjust = function (value) {
    this.player.muted = false;
    this.player.volume = value;

    this.controls.querySelector('#mute').classList.remove('low', 'mid', 'high', 'muted');

    if (value < 0.33) {
      this.controls.querySelector('#mute').classList.add('low');
    } else if (value < 0.66) {
      this.controls.querySelector('#mute').classList.add('mid');
    } else {
      this.controls.querySelector('#mute').classList.add('high');
    }
  };

  this.muteToggle = function (direction, time) {
    //Toggle volume mute
    if (this.player.muted) {
      this.player.muted = false;
      this.controls.querySelector('#mute').classList.remove('muted');
    } else {
      this.player.muted = true;
      this.controls.querySelector('#mute').classList.add('muted');
    }
  };

  this.qualityAdjust = function (quality) {
    var savedTime = parent.player.currentTime;
    var newLink = parent.links[quality];
    console.log(quality + '> ' + newLink.mp4[0]);
    var currentPlay = !parent.player.paused;
    if (newLink !== parent.player.currentSrc) {
      parent.player.querySelector('source').setAttribute('src', newLink.mp4[0]);

      if (currentPlay) {
        parent.player.play();
      }

      parent.player.currentTime = savedTime;
    }
  };

  this.reset = function () {

  }

  //Non-interactive events
  var timeFroze = 0;
  var resetTimer;
  var timePoller;

  this.player.addEventListener('waiting', function () {
    parent.controls.querySelector('.overlayLoading').style.display = 'block';

    clearTimeout(resetTimer);

    timePoller = setInterval(function () {
      timeFroze++;
      if (timeFroze > 15) {
        //Downgrade quality
        if (parent.player.currentSrc.indexOf('1080') > -1) {
          timeFroze = 0;
          clearInterval(timePoller);
          parent.qualityAdjust('720');
        } else if (parent.player.currentSrc.indexOf('720') > -1) {
          timeFroze = 0;
          clearInterval(timePoller);
          parent.qualityAdjust('480');
        }
      }
    }, 1000);
  });

  this.player.addEventListener('playing', function () {
    parent.controls.querySelector('.overlayLoading').style.display = 'none';

    clearInterval(timePoller);

    resetTimer = setTimeout(function () {
      timeFroze = 0;
    }, 5000);
  });
}


function eventHelper(targetVideo) {
  //ios click events:  http://www.shdon.com/blog/2013/06/07/why-your-click-events-don-t-work-on-mobile-safari

  var target = targetVideo;

  target.controls.querySelector('.overlayPlay').addEventListener('click', function () {
    target.controls.querySelector('#vidOverlay').style.display = 'none';
    target.controls.querySelector('.overlayPlay').style.display = 'none';
    target.playToggle();
  });

  target.controls.querySelector('#playBtn').addEventListener('click', function () {
    target.playToggle();
  });

  var clicked = false;
  var seekedWidth = 0;
  var leftOffset = 0;
  var playerWidth = 0;
  var playing = false;

  target.controls.querySelector('#progressBar').addEventListener('mousedown', function (e) {
    e.preventDefault();
    if (e.which == 1) {
      clicked = true;
      seekedWidth = 0;
      leftOffset = target.player.getBoundingClientRect().x;
      playerWidth = target.player.getBoundingClientRect().width;
      target.controls.querySelector('.textTimer .progTime').classList.add('changing');
      target.controls.querySelector('#progressBar').classList.add('changing');


      var tempLeft = e.clientX - leftOffset;
      target.controls.querySelector('#progressBar .active').style.width = tempLeft + 'px';
      target.controls.querySelector('#progressBar .dot').style.left = (tempLeft - 7) + 'px';
      seekedWidth = tempLeft / playerWidth;

      if (!target.player.paused) {
        target.refPause();
        playing = true;
      } else {
        playing = false;
      }

      target.pollerToggle(false);
    }
  });

  document.addEventListener('mousemove', function (e) {
    if (clicked) {
      var tempLeft = e.clientX - leftOffset;
      if (tempLeft >= -16 && tempLeft <= playerWidth - 16) {
        target.controls.querySelector('#progressBar .active').style.width = tempLeft + 'px';
        target.controls.querySelector('#progressBar .dot').style.left = (tempLeft - 7) + 'px';
        seekedWidth = tempLeft / playerWidth;
      }
    }
  });

  document.addEventListener('mouseup', function (e) {
    if (clicked) {
      target.seek(seekedWidth * target.player.duration);

      target.pollerToggle(true);
      clicked = false;
      target.controls.querySelector('.textTimer .progTime').classList.remove('changing');
      target.controls.querySelector('#progressBar').classList.remove('changing');

      if (playing) {
        target.player.play();
      } else {
        target.refPause();
      }
    }
  });

  target.controls.querySelector('#forward').addEventListener('click', function () {
    target.increment('ff');
  });

  target.controls.querySelector('#backward').addEventListener('click', function () {
    target.increment('rw');
  });

  target.controls.querySelector('#mute').addEventListener('click', function () {
    target.muteToggle();
  });

  target.controls.querySelector('#volumeSlider').addEventListener('change', function () {
    var newVolume = target.controls.querySelector('#volumeSlider').value;

    target.volumeAdjust(newVolume);
  });

  target.controls.querySelector('#mirror').addEventListener('click', function () {
    target.mirrorToggle();
  });

  target.controls.querySelector('#speed').addEventListener('change', function () {
    var newSpeed = target.controls.querySelector('#speed').value;
    target.speedAdjust(newSpeed);
  });

  target.controls.querySelector('#quality').addEventListener('change', function () {
    var newQual = target.controls.querySelector('#quality').value;
    if (newQual === 'auto') {
      target.qualityAdjust(1080);
    } else {
      target.qualityAdjust(newQual);
    }
  });

  target.controls.querySelector('#fullscreen').addEventListener('click', function () {
    target.fullScreenToggle();
  });
}

function secToMin(seconds) {
  var mins = Math.floor(seconds / 60);
  var seconds = Math.floor(seconds % 60);

  return [mins, seconds];
}