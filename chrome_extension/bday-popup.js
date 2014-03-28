// var QUERY = 'birthday';

var birthdayWisher = {
  /**
   * @type {string}
   * @private
   */
  searchOnBdayServer: 'http://localhost:1337/bday',

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
      var img = document.createElement('img');
      img.src = this.constructBdayURL(people[i]);
      img.setAttribute('alt', "Happy B'day "+ people[i].name + " " + people[i].day + "/" + people[i].month);
      img.setAttribute('title', "Happy B'day "+ people[i].name + " " + people[i].day + "/" + people[i].month);
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
    return "http://localhost:1337/images/"+photo.id+".jpg";
  }
};

// Run our birthday wisher script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  birthdayWisher.requestBdays();
});