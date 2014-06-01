/**
 * BdayController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var fs    = require("fs");

module.exports = {
    
  uploadBdayCSVFile : function(req, res) {
    if (req.method === 'POST') {           
      // read temporary file
      fs.readFile(req.files.testFile.path, function (err, data) {
        if(err) throw err;
        var array = data.toString().split("\n");
        Bday.saveMultipleBdays(array);
        res.redirect('/');
      });
    } else {
        res.view();
    }
  },

  edit: function(req, res) {
    Bday.findById( req.param('id') )
      .done(function(err, bday) {
        if (err) {
          return res.send(err, 500);
        } else {
          if (bday.length > 0) {
            res.view({'bday': bday[0]});
          } else {
            res.send('bdayer not found', 500);
          }
        }
      });
  },

  update: function(req, res) {
    Bday.findById( req.param('id') )
      .done(function(err, bdayer) {
        if (err) {
          return res.send(err, 500);
        } else {
          if (bdayer.length > 0) {
            var newParams = {
              name: req.param('name'),
              day:  req.param('day'),
              month:req.param('month')
            }
            bdayer[0].saveRecord(newParams, req.files);
            res.redirect('/');
          } else {
            res.send('bdayer not found', 500);
          }
        }
      });
  },

  /**
   * destroy a record by id
  */
  destroy: function(req, res){
    Bday.findOneById(req.param('id'))
      .done(function(err, bdayer){
        if(err){
          return res.send(err, 500);
        } else {
          bdayer.destroy(function(err) {console.log(err);});
        }
      });
    res.redirect('/');
  },  

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BdayController)
   */
  _config: {}

  
};
