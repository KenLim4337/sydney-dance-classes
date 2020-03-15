/*API Key be0d3a70e92f468daeffc656f7cabc1c */

/*App Name DanceClassesSydney-1*/


/*TODO Make API calls*/
var xhr = new XMLHttpRequest(); 

xhr.open('GET', 'http://api.mindbodyonline.com/public/v6/class/classes');

xhr.setRequestHeader('SiteId', 'f4362209fa0');
xhr.setRequestHeader('Api-Key', 'be0d3a70e92f468daeffc656f7cabc1c');

xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      alert(`Done, got ${xhr.response.length} bytes`); 
      console.log(JSON.parse(response));
    }
  };

  
xhr.send();

/*TODO Prune results*/


/*TODO Save completed data in a JSON file*/


/*TODO Scraper for one page*/


var xhr = new XMLHttpRequest(); 

//Widget versions 0.1 and 1, crossover dance is 0.1

//https://widgets.mindbodyonline.com/widgets/schedules/86397/load_markup?callback=jQuery1810010156305980973501_1584020306260&options%5Bstart_date%5D=2020-03-12&_=1584020493868

//V1:https://widgets.mindbodyonline.com/widgets/schedules/86397/load_markup?options%5Bstart_date%5D=2020-03-12&_=1584020493868

//V0.1:https://widgets.mindbodyonline.com/widgets/schedules/9b4010856f8.json?options%5Bstart_date%5D=2020-05-21&_=1584019974227

xhr.open('GET', 'https://widgets.mindbodyonline.com/widgets/schedules/9b4010856f8.json?options%5Bstart_date%5D=2020-05-21&_=1584019974227');

xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      alert(`Done, got ${xhr.response.length} bytes`); 
      console.log(JSON.parse(xhr.response));
    }
  };

  
xhr.send();
