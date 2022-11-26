const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const main = require('./models/userdetail')
const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost:27017/mongoose_introduction')
    .then(() => {
        console.log('Db connect!')
    })
    .catch(err => console.log('Db not connect!'))

app.post('/reg', (req, res) => {
    //  insertmethod=>1

    // var us=new main()
    // us.name=req.body.name,
    // us.age=req.body.age,
    // us.position=req.body.position,
    // us.address=req.body.address,
    // us.save(function(err,data){
    //     if(err){
    //         res.json({message:err})
    //     }
    //     else{
    //         res.json({success:data})
    //     }
    // })

    //  insertmethod=>2

    main.insertMany({
        name: req.body.name, age: req.body.age, position:
            req.body.position, address: req.body.address
    }, function (err, data) {
        if (err) {
            res.json({ message: err })
        }
        else {
            res.json({ success: data })
        }
    })
})

app.get('/findone', (req, res) => {
    //  findone use is unique value get eg:email
    main.findOne({ name: req.body.name }, function (err, data) {

        // findone using multiple value check in $and method
        // main.findOne({$and:[{name:req.body.name,age:req.body.age}]},function(err,data){


        // findone using multiple value check in $or method
        // main.findOne({$or:[{name:req.body.name},{age:req.body.age}]},function(err,data){

        // findOneAndUpdatemethod
        //  main.findOneAndUpdate({name:req.body.name},{experience:req.body.experience,skills:req.body.skills},function(err,data){

        if (err) {
            res.json({ message: err })
        }
        else if (data == null) {
            res.json({ message: `invalid data` })
        }
        else {
            main.updateOne({ skills: req.body.skills }, function (err, data) {
                if (err) {
                    res.json({ message: err })
                }
                else {
                    res.json({ success: data })
                }
            })
        }
    })

})
// })  
// })
// })

// count for collection
  let demoDocument = await match.countDocuments({});
  console.log("demoDocument", demoDocument);

port = 3030
app.listen(port, () => {
    console.log(`server start in ${port}`)
})
