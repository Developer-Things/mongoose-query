const first = require('express')
const second = first()
const mongoose = require('mongoose')
// createmethod
mongoose.connect('mongodb://localhost:27017/joining', { useNewUrlParser: true }, err => {//connecting method
    if (!err) {
        console.log('db is connected')
    }
    else {
        console.log('db error')
    }
})
const newschema = new mongoose.Schema({ //write schema
    name: String,
    age: Number,
    profession: String
})
const newmodel = new mongoose.model('lists', newschema)//collection create

// insert_method
const insertmethod=async()=>{
 const result=await
  newmodel.insertMany
  ([{name:'david',age:33,profession:'php developer'},
  {name:'vishal',age:23,profession:'python developer'},
  {name:'arjun',age:36,profession:'java developer'},
  {name:'akash',age:46,profession:'nodejs developer'},
  {name:'vishal',age:23,profession:'python developer'}
])
 console.log(result)
}
insertmethod()

// find_method
const findmethod=async()=>{
    const result=await newmodel.find()
    console.log(result)
}
findmethod()

// particular_find
const particularfind=async()=>{
        const result=await newmodel.find({age:{$gt:23,$lt:46}})
        console.log(result)
    }
    particularfind()

//update_method
const updatemethod=async()=>
{
    const result=await newmodel.updateMany({age:36},{$set:{name:'vivek'}})
console.log(result)
}
updatemethod()

//delete_method
const deletemethod=async()=>
{
    const result=await newmodel.deleteOne({name:"david"})
    console.log(result)
}
deletemethod()
second.listen(5000)

