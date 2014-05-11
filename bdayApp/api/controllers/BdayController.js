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
    
  uploadFile : function(req, res) {
        if (req.method === 'POST') {           
            // read temporary file
            fs.readFile(req.files.testFile.path, function (err, data) {
              if(err) throw err;
              var array = data.toString().split("\n");
              for(i in array) {
                  console.log(array[i]);
                  var bdayRecord = array[i];
                  if(bdayRecord.trim() !== ''){
                      var day = array[i].split(',')[1].split('/')[0].trim(),
                          month = array[i].split(',')[1].split('/')[1].trim(),
                          name = array[i].split(',')[0].trim();
                      Bday.find({
                        name: name,
                        month: month,
                        day: day
                      }).done(function(err, bdayers) {
                        // Error handling
                        if (err) {
                          return console.log(err);
                        } else {
                          // Not found, now create
                          if(bdayers.length == 0){
                            Bday.create({
                              day: day,
                              month: month,
                              name: name
                            }).done(function(err, user) {

                              // Error handling
                              if (err) {
                                return console.log(err);

                              // The User was created successfully!
                              }else {
                                console.log("User created:", user);
                              }
                            });
                          } else{
                            // The BDayers were found successfully!
                            console.log('User '+name+' exists');
                          }
                          // for(bdayerIndex in bdayers){
                          //   console.log(bdayers[bdayerIndex]);
                          //   Bday.destroy(bdayers[bdayerIndex].id);  
                          // }
                        }
                      });
                  }
              }
              res.redirect('/');
              return true;
            });
        } else {
            res.view();
        }
    },

  edit: function(req, res) {
    console.log('in edit');
    Bday.findById( req.param('id') )
      .done(function(err, bday) {
        if (err) {
          return res.send(err, 500);
        } else {
          if (bday.length > 0) {
            console.log(bday);
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
            bdayer[0].name = req.param('name');
            bdayer[0].day = req.param('day');
            bdayer[0].month = req.param('month');
            // save the updated value
            bdayer[0].save(function(err) {
              // value has been saved
              console.log('bdayer saved successfully');
              console.log(bdayer[0]);
              res.redirect('/');
            });
          } else {
            res.send('bdayer not found', 500);
          }
        }
      });
  },
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BdayController)
   */
  _config: {}

  
};
