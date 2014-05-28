/**
 * get application url from menifest.json
 * @return {string} Application URL
 */
function getAppURL() { 
  console.log('here');
  var xhr = new XMLHttpRequest();   
  xhr.open('GET','./manifest.json',false);
  xhr.send(null);

  return JSON.parse(xhr.responseText).permissions[0];
}

var date = new Date();
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
var currentMonth = date.getMonth() + 1;
var appURL = getAppURL();

var birthdayWisher = {
  /**
   * @type {string}
   * @private
   */
  searchOnBdayServer: appURL+'bday?month='+currentMonth,

  /**
   * Sends an XHR GET request to grab photos of lots and lots of people. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestBdays: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnBdayServer, true);
    req.onload = this.showBdays.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our person XHR request, generated in
   * 'requestBdays', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showBdays: function (e) {
    document.body.appendChild(this.addHeader());
    var people = JSON.parse(e.target.responseText);
    for (var i = 0; i < people.length; i++) {
      document.body.appendChild(this.personDetail(people[i]));
    }
  },

  /**
   * construct header element
   * @return {DOMElement} Header element
   */
  addHeader: function() {
    var header = document.createElement('h3');
    var headerTextNode = document.createTextNode('Birthdays in ' + monthNames[date.getMonth()]);
    header.appendChild(headerTextNode);
    return header;
  },
  
  /**
   * construct enclosing div element for image and name
   * @person {object} A person
   * @return {DOMElement} Person details with image and name elements
   */
  personDetail: function(person){
    var imageEnclosingDiv = document.createElement('div');
    imageEnclosingDiv.setAttribute('style', 'float:left');
    imageEnclosingDiv.setAttribute('class', 'image-name');
    
    imageEnclosingDiv.appendChild(this.personImage(person)).appendChild(this.defaultImage());
    imageEnclosingDiv.appendChild(this.personName(person));

    return imageEnclosingDiv;
  },

  /**
   * construct default image element
   * @return {DOMElement} Default image element
   */
  defaultImage: function(){
    var defaultImageElement = document.createElement('img');
    defaultImageElement.src = this.constructDefaultImageURL();
    return defaultImageElement;
  },

  /**
   * construct image element for a person
   * @person {object} A person
   * @return {DOMElement} Image element
   */
  personImage: function(person){
    var imgObject = document.createElement('object');
    imgObject.data = this.constructBdayURL(person);
    imgObject.setAttribute('alt', "Happy B'day "+ person.name + " " + person.day + "/" + person.month);
    imgObject.setAttribute('title', "Happy B'day "+ person.name + " " + person.day + "/" + person.month);
    imgObject.setAttribute('type', "image/jpg");
    return imgObject;
  },

  /**
   * construct name element for a person
   * @person {object} A person
   * @return {DOMElement} Name element
   */
  personName: function(person){
    var nameElement = document.createElement('div');
    var nameTextNode = document.createTextNode(person.name.replace(' ', '\n\n'));
    nameElement.appendChild(nameTextNode);
    return nameElement;
  },

  /**
   * construct a default Image URL using the method outlined at
   *
   * @return {string} The person's default image URL.
   * @private
   */
  constructDefaultImageURL: function () {
    return appURL+"images/default.jpg";
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   *
   * @photo {DOMElement} A photo.
   * @return {string} The person's image URL.
   * @private
   */
  constructBdayURL: function (photo) {
    return appURL+"images/"+ photo.imageName;
  }
};

// Run our birthday wisher script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  birthdayWisher.requestBdays();
});