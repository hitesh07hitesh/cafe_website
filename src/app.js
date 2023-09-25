const express = require('express')
const path = require('path')
const user = require('./modules/usermessage')
const hbs = require('hbs')


// const connectData = require("./db/conn")
// const { error } = require('console')
require('./db/conn')
const app = express()
// console.log(connectData)

//__________________________________________

//______________________________________________

const staticPath = path.join(__dirname, "../public")
const templatesPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.use(express.static(staticPath))
app.use(express.urlencoded({extended:false}))
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")))
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")))
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")))
app.set("view engine","hbs")
app.set("views", templatesPath)
hbs.registerPartials(partialsPath)

app.get('/',(req,resp)=>{
    resp.render("index")
})

app.get('/contact',(req,resp)=>{
    resp.render("contact")
})

// app.post('/contact', async(req,resp)=>{
//     try{
//         resp.send(req.body)
//         const userData = new user (req.body)
//         let db = await connectData()
//         db = await user.save()
//         resp.status(201).render("/")
//     }catch(error){
//         resp.status(500).send(error)
//     }
// })

//-----------------------------------------------------------------

app.post('/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Create a new user document
    const newUser = new user({
        name: name,
        email: email,
        phone: phone,
        message: message
    });

    // Save the new user to the database
    newUser.save()
        .then(() => {
            res.render("index")
            // res.send("contact successful!");
        })
        .catch((err) => {
            res.send("Error: " + err.message);
        });
});

//---------------------------------------------------

app.listen(4000,()=>{
    console.log("http://localhost:4000/")
})

console.log("done")



// const express = require('express');
// const path = require('path');
// const user = require('./modules/usermessage');
// const hbs = require('hbs');
// const connectData = require("./db/conn");
// const app = express();

// // console.log(connectData);

// const staticPath = path.join(__dirname, "../public");
// const templatesPath = path.join(__dirname, "../templates/views");
// const partialsPath = path.join(__dirname, "../templates/partials");

// app.use(express.static(staticPath));
// app.use(express.urlencoded({ extended: false }));

// app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
// app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
// app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

// app.set("view engine", "hbs");
// app.set("views", templatesPath);
// hbs.registerPartials(partialsPath);

// app.get('/', (req, resp) => {
//     resp.render("index");
// });

// app.get('/contact', (req, resp) => {
//     resp.render("contact");
// });

// app.post('/contact', async (req, resp) => {
//     try {
//         // Create a new user instance and save it
//         const userData = new user(req.body);
//         await userData.save();
//         resp.status(201).redirect("/");
//     } catch (error) {
//         resp.status(500).send(error);
//     }
// });

// const port = 4000;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
