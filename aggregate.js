var express = require('express')
var app = express()
var mongoose = require('mongoose');//package
var url = "mongodb://localhost:27017/joiningmethod";

mongoose.connect(url, (err, db) => {
    if (err) throw err;
    else {
        console.log('db connect')
    }
    //firstcollection_schema
    var userSchema = new mongoose.Schema({
        _id: Number,
        name: String,
        email: String,
        profession: String

    });

    //secondcollection_schema


    var userSchema1 = new mongoose.Schema({
        _id: Number,
        address: String,
        salary: Number
    });
    var User = new mongoose.model('users', userSchema);

    var User1 = new mongoose.model('overviews', userSchema1);

    // var insertmethod = User.insertMany([{ _id: 1, name: 'david', email: 'david@gmail.com', profession: 'developer' },
    // { _id: 2, name: 'vivek', email: 'vivek@gmail.com', profession: 'java developer' },
    // { _id: 3, name: 'arjun', email: 'arjun@gmail.com', profession: 'php developer' }
    // ])
    // insertmethod.save
    app.delete('/keydelete', function (req, res) {

        // User.findOne({}, function (err, user) {
        //     user.name = undefined;
        //     user.save();
        // });

        User.updateMany(
            { },
            { $unset: { name: "" } }
            ,function(err){
                if(err){
                    console.log(err);
                
                }
                else
                console.log('success');
            }
         );

    })

  
    // var insertmethod1 = User1.insertMany([{ _id: 1, address: '34 roja street', salary: 30000 },
    // { _id: 2, address: '44 ashok nagar', salary: 40000 },
    // { _id: 3, address: '55 tnagar main street', salary: 50000 }
    // ])
    // insertmethod1.save

    // countduplicate_method
    // app.post('/countduplicate', function (req, res) {
    //     User1.aggregate([{ $sortByCount: "$address" }
    //     ], function (err, data) {
    //         if (err)
    //             console.log(err)
    //         console.log(data)
    //         res.send(data)
    //     }
    //     )
    // })

    // distinct_method
    // app.post('/distinct', function (req, res) {

    //     var query = User1.distinct('salary');
    //     query.exec(function (error, result) {
    //         if (error) console.log(error)
    //         else console.log(result)
    //         res.send(result)
    //     })
    // })
    // sum_method

    // app.post('/calculate', function (req, res) {
    //     User1.aggregate([
    //         {
    //             $group: {
    //                 _id: null,
    //                 totalamt: { $sum: "$salary" }
    //             }
    //         }
    //     ], function (err, data) {
    //         if (err)
    //             console.log(err)
    //         console.log(data)
    //         res.send(data)
    //     }
    //     )
    // })


    // count_method
    // app.post('/counting', function (req, res) {
    //     User1.aggregate([
    //         {
    //             $group: {
    //                 _id: '$salary',
    //                 count: { $sum: 1 }
    //             }
    //         }
    //     ], function (err, data) {
    //         if (err)
    //             console.log(err)
    //         console.log(data)
    //         res.send(data)
    //     }
    //     )
    // })

    // joining_method
    // app.use('/', function (req, res) {

    //     db.collection('users').aggregate([
    //         {
    //             $lookup:
    //             {
    //                 from: 'overviews',
    //                 localField: '_id',
    //                 foreignField: '_id',
    //                 as: 'result'

    //             }

    //         }

    //     ]).toArray(function (err, resu) {
    //         if (err) throw err;
    //         var result = JSON.stringify(resu);
    //         res.write('' + result)
    //         res.end()
    //         db.close();

    //     });
    // });
});




exports.getMatchDetails = (req, res) => {
  // match.aggregate(
  //   [
  //     {
  //       $match: {
  //         $and: [{ matchType: { $eq: "test1" } }, { player: "vinoth" }],
  //       },
  //     },
  //   ],
  //   function (err, data) {
  //     res.json({ data: data });
  //   }
  // );

  const value = req.body.matchType;
  match.aggregate(
    [
      {
        $match: { matchType: { $eq: value } },
      },
      {
        $addFields: {
          status: {
            $switch: {
              branches: [
                { case: { $eq: ["$status", true] }, then: "Active" },
                { case: { $eq: ["$status", false] }, then: "Inactive" },
              ],
              default: null,
            },
          },
        },
      },
    ],
    function (err, data) {
      res.json({ data: data });
    }
  );
};
app.listen(5000)
