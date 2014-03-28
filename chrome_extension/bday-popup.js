// var QUERY = 'birthday';

var birthdayWisher = {
  /**
   * @type {string}
   * @private
   */
  searchOnBdayServer: 'https://localhost:3000/api/bdays',

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
    var people = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < people.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructBdayURL(people[i]);
      img.setAttribute('alt', people[i].getAttribute('title'));
      document.body.appendChild(img);
    }
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   *
   * @param {DOMElement} A person.
   * @return {string} The person's image URL.
   * @private
   */
  constructBdayURL: function (photo) {
    return "http://localhost:3000/api/bday/"+photo.getAttribute('id')+".jpg";
  }
};

// Run our birthday wisher script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  birthdayWisher.requestBdays();
});