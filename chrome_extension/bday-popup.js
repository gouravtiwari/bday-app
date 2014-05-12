// var QUERY = 'birthday';
var date = new Date();
var currentMonth = date.getMonth() + 1;
var birthdayWisher = {
  /**
   * @type {string}
   * @private
   */
  searchOnBdayServer: 'http://localhost:1337/bday?month='+currentMonth,

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
    var people = JSON.parse(e.target.responseText);
    for (var i = 0; i < people.length; i++) {
      var defaultImage = document.createElement('img');
      defaultImage.src = this.constructDefaultImageURL();

      var imgObject = document.createElement('object');
      imgObject.data = this.constructBdayURL(people[i]);
      imgObject.setAttribute('alt', "Happy B'day "+ people[i].name + " " + people[i].day + "/" + people[i].month);
      imgObject.setAttribute('title', "Happy B'day "+ people[i].name + " " + people[i].day + "/" + people[i].month);
      imgObject.setAttribute('type', "image/jpg");

      document.body.appendChild(imgObject).appendChild(defaultImage);
    }
  },

  /**
   * construct a default Image URL using the method outlined at
   *
   * @return {string} The person's default image URL.
   * @private
   */
  constructDefaultImageURL: function () {
    return "http://localhost:1337/images/default.jpg";
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   *
   * @param {DOMElement} A person.
   * @return {string} The person's image URL.
   * @private
   */
  constructBdayURL: function (photo) {
    return "http://localhost:1337/images/"+photo.name.toLowerCase().replace(' ', '-')+".jpg";
  }
};

// Run our birthday wisher script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  birthdayWisher.requestBdays();
});