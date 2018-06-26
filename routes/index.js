var express = require("express");
var router = express.Router();
var request = require("request");
var mongoose = require("mongoose")
const Schema = mongoose.Schema;



const userForDadSchema = new Schema({
  fb_id: String,
  name: String,
  goal: String,
  pixel: String
})
const UserForDad = mongoose.model('UserForDad', userForDadSchema);

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { title: "Express" });
});

router.post("/get_info", function(req,res){
  var name = req.body.name;
  UserForDad.findOne({"name":name},function(err,usr){
    if(usr)
      return res.status(200).json({'message':usr.goal})
    return res.status(400).json({'err':err})
})
});


// function clawer(lowerBound, name, callback) {
//   for (var i = lowerBound; i < lowerBound + 10; i++) {
//     console.log(i);
    
//     request.post(
//       { url: "http://www.dofordad.com/get_info.php", form: { pixel: i } },
//       function(err, httpResponse, body) {
//         if (err) console.log(err);
//         var response = JSON.parse(body);
//         if (response.name) {
//           console.log(response);
//           if (response.name.toLowerCase() === name)
//             return callback(null, response.goal);
//         }
//       }
//     );
//   }

//   return callback("not found", null);
// }

module.exports = router;
