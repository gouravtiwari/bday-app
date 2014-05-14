// var QUERY = 'birthday';
var date = new Date();
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
var currentMonth = date.getMonth() + 1;
var birthdayWisher = {
  /**
   * @type {string}
   * @private
   */
  searchOnBdayServer: 'http://172.28.228.64:1337/bday?month='+currentMonth,

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
    this.addHeader();
    var people = JSON.parse(e.target.responseText);
    for (var i = 0; i < people.length; i++) {
      this.addPicsAndName(people[i]);
    }
  },

  addHeader: function() {
    var header = document.createElement('h3');
    var headerTextNode = document.createTextNode('Birthdays in ' + monthNames[date.getMonth()]);
    header.appendChild(headerTextNode);
    document.body.appendChild(header);
  },
  
  addPicsAndName: function(person){
    var imageEnclosingDiv = document.createElement('div');
    imageEnclosingDiv.setAttribute('style', 'float:left');
    imageEnclosingDiv.setAttribute('class', 'image-name');
    

    var defaultImage = document.createElement('img');
    defaultImage.src = this.constructDefaultImageURL();

    var imgObject = document.createElement('object');
    imgObject.data = this.constructBdayURL(person);
    imgObject.setAttribute('alt', "Happy B'day "+ person.name + " " + person.day + "/" + person.month);
    imgObject.setAttribute('title', "Happy B'day "+ person.name + " " + person.day + "/" + person.month);
    imgObject.setAttribute('type', "image/jpg");

    var nameElement = document.createElement('div');
    var nameTextNode = document.createTextNode(person.name.replace(' ', '\n\n'));
    nameElement.appendChild(nameTextNode);

    imageEnclosingDiv.appendChild(imgObject).appendChild(defaultImage);
    imageEnclosingDiv.appendChild(nameElement);

    document.body.appendChild(imageEnclosingDiv);
  },

  /**
   * construct a default Image URL using the method outlined at
   *
   * @return {string} The person's default image URL.
   * @private
   */
  constructDefaultImageURL: function () {
    return "http://172.28.228.64:1337/images/default.jpg";
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   *
   * @param {DOMElement} A person.
   * @return {string} The person's image URL.
   * @private
   */
  constructBdayURL: function (photo) {
    return "http://172.28.228.64:1337/images/"+ photo.imageName;
  }
};

// Run our birthday wisher script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  birthdayWisher.requestBdays();
});