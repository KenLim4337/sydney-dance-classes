document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);

//Data Struct for a video
var videoData = {
    id: '',
    title: '',
    //VP8, H264, OGG Codec
    links: {
        // 'wrapper format':['link','codec']
        'mp4': ['',''],
        'webm': ['',''],
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

//Video Constructor
function Video(id, title, links, sections, container) {
    this.id = id;
    this.title = title;
    this.links = links;
    this.sections = sections;
    this.container = document.getElementById(container);
    //Populated when player is built
    this.player;

    //Build player
    var playerNode = document.createElement('video');   
    playerNode.dataset.id = this.id;
    playerNode.dataset.title = this.title;

    for(var i=0; i < Object.keys(this.links).length; i++) {
        //Add video tags for each codec/format
        var source = document.createElement('source');
        
        //Link
        source.setAttribute('src',this.links[i][0]);
        //Codec settings
        source.setAttribute('type','video/'+Object.keys(this.links)[i]);
        source.setAttribute('codecs',this.links[i][1]);

        playerNode.appendChild(source);
    }       
    this.container.appendChild(playerNode);
    
    this.container.innerHTML += 'Your browser does not support the video tag.';

    this.player = this.container.querySelector('video');
        
    //Add controls

    this.playToggle = function() {
        // If the mediaPlayer is currently paused or has ended
        if (this.player.paused || this.player.ended) {
            this.player.play();
        } else {
            this.player.pause();
        }
    };
    
    this.mirrorToggle = function() {
        this.player.style.transform = 'rotateY(180deg)';
        
        this.player.style.transform = 'rotateY(0deg)';
    };
    
    this.fullScreenToggle = function() {

    };

    this.speedAdjust = function() {

    };
    
    this.increment = function(direction, time) {

    };
    
    this.volumeAdjust = function(direction, time) {

    };

    this.qualityAdjust = function(quality) {

    };
}


var $videoElem = document.getElementById('videoWrapper');

var videoSources = '';

$videoElem.querySelector('video').html()