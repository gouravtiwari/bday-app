/**
 * Bday
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var fs    = require("fs");

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string',
  	*/

    // Save new image
    saveNewImage: function(id, file){
      fs.readFile(file.image.path, function (err, data) {
        var imageName = file.image.name;
        var Path = "./" + "assets/images/" + id + imageName;
        fs.writeFile(Path, data, function (err) {
          console.log(Path);
        });
      });
    },

    // Save updated values
    saveRecord: function(newParams, file){
      this.name = newParams.name;
      this.day  = newParams.day;
      this.month= newParams.month;

      if(file.image.name != '') {
        this.saveNewImage(this.id, file);
        this.imageName = this.id + file.image.name;
      }
      // save the updated value
      this.save(function(err) {
        // value has been saved
        console.log('bdayer saved successfully');
      });
    }
          

  },

  saveMultipleBdays: function(bdays){
    for(i in bdays) {
      if(bdays[i].trim() !== ''){
        var bdayRecord = {
              name: bdays[i].split(',')[0].trim(),
              day:  parseInt(bdays[i].split(',')[1].split('/')[0].trim()),
              month:parseInt(bdays[i].split(',')[1].split('/')[1].trim())
            }
        Bday.find(bdayRecord).done(function(err, records) {
          if (err) {
            return console.log("Error in creating record"+err);
          } else {
            // Not found, now create
            if(records.length == 0){
              Bday.create(bdayRecord).done(function(err, user) {
                if (err) {
                  return console.log("Error in creating record"+err);
                }else {
                  console.log("User created:", user);
                }
              });
            } else{
              console.log('User '+name+' exists');
            }
          }
        });
      }
    }
  }
  
};
