const express = require("express");
const app =express();
app.set("view engine" , "ejs");
const LogInCollection = require("./data")
const bodyParser=require("body-parser");
 app.use(bodyParser.json());
 app.use(express.urlencoded({ extended: true }));



app.get("/", (req,res)=>{
res.render("login");
});
app.get("/signup", (req,res)=>{
    res.render("signup");
    });

app.post("/signup", async(req,res)=>{
const data={
    name:req.body.name,
    password:req.body.password
}

const existingUser = await LogInCollection.findOne({name: data.name});

if(existingUser){
    res.send("user already exists");
}else{
    const userData = await LogInCollection.insertMany([data]);
    console.log(userData);
}
res.status(201).render("home", {
    naming: req.body.name
})

});

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home")
        }

        else {
            res.send("user not found")
        }


    } 
    
    catch (e) {

        res.send("wrong details")

    }
})


app.listen(3000, ()=>{
    console.log("port connected");
});