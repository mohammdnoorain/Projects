//import express from 'express';
const express = require('express')
//import mongoose from 'mongoose';
const mongoose = require('mongoose')
//import ejs from 'ejs';
const ejs = require('ejs')
//import  bodyParser  from 'body-parser';
const bodyParser = require('body-parser');
const products = require("./controllers/productController");

//import session from 'express-session';
const session = require('express-session')
//import cors from 'cors';
const bcrypt = require('bcrypt')
const mongoDbSession = require ('connect-mongodb-session')(session);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')



//////////


const path = require('path');


const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,path.join(__dirname,'/public/productimage'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);


    }
});
const upload = multer({storage:storage});

////////////////

const App=express();
App.set('view engine','ejs');
App.set('views','./views');
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: true}));

App.use(express.static('public'));
App.use(flash());
App.use(cookieParser('StringforSecretKey'));
App.use(express.static('public'));





mongoose.connect('mongodb+srv://noorainmohammad908:sss798@cluster0.bhos1yh.mongodb.net/cart').then(()=>{
    //here collegedb is the name of database in Mongodb
    //If this is not created from MongoDb it will be created here      
    console.log('MongoDB is connected');


});
App.use(session({
    secret:'this is my top secret',
    cookie: {maxAge: 60000},
    resave:false,
    saveUninitialized:false,
    // store: store,

}))
/// define routes
const productRoute = require("./routes/productRoute");
App.use('/',productRoute);
const loginRoute = require("./routes/loginRoute");
App.use('/',loginRoute);
const adminRoute = require("./routes/adminRoute");
App.use('/',adminRoute);
const userRoute = require("./routes/userRoute");
App.use('/',userRoute);

////end////

////// schema for details of products in databse/////
// const detailsSchema=new mongoose.Schema({
//     productname: {type: String, required: true},
//     sellingp: {type: String, required: true},
//     originalp: {type: String, required: true},
//     image:{type:String,require:true},
//     discountpercentage: {type: String, required: true},
//     description: {type: String, required: true},
 
//     companydescription: {type: String, required: true},
//     companyaddress: {type: String, required: true},
//     contactseller: {type: String, required: true},
//     producttype: {type: String, required: true},
//     productsku: {type: String, required: true},
//     productmfg: {type: String, required: true},
//     productstock: {type: String, required: true},
//     tag: {type: String, required: true},

  
    
// })


// const Details = mongoose.model('products-details',detailsSchema);

/////// schema for admin login details in databse
// const loginSchema=new mongoose.Schema({
  
//     name: {type: String, required: true},
//     email: {type: String, unique: true, required: true},
//     image:{type:String,require:true},
//     password: {type: String},
  
    
// })
// const Login = mongoose.model('admins',loginSchema);



///////////////////// schema for products details store in databse/////
// const productSchema=new mongoose.Schema({
  
//     name: {type: String, required: true},
    
    
    
// })
// const Product = mongoose.model('products',productSchema);




// App.get('/',(req,res)=>{

//     const userMessage = req.flash('shyam');
//     res.render('adminlogin', {userMessage});

   
// })
// App.get('/login',async(req,res)=>{
   
//     res.render('login');
// })
// App.get('/logout',async(req,res)=>{
//     req.session.isAuth = false;
//     req.session.user = null;
   
//     const userMessage = req.flash('shyam');
//     res.render('adminlogin', {userMessage});
// })
// App.get('/index',(req,res)=>{
//     res.render('index');
// })

// App.get('/basic_elements',(req,res)=>{
//     res.render('basic_elements');
// })









//Middleware

// const isAuth = (req,res,next)=>{
//     if(req.session.isAuth==true){
//         next();
//     }
//     else
//     {
//         res.redirect("/adminlogin");
//     }
// }



// App.post('/auth',async (req,res)=>{
//     console.log("abcd");
//     //res.send('<h1>About Node JS</h1>')
//     let {email,password}=req.body;
//     // let{name}=req.body;
//     // let userto={name}
//     let user = await Login.findOne({email, email});
//     if(!user){
//         // res.json('User does not exist');
//         req.flash('shyam','wrong email!')
//         res.redirect('/');
//     }
//     else
//     {
//     let isPasswordValid = await bcrypt.compare(password, user.password);
//     if(isPasswordValid){
        
//         req.session.isAuth = true;
//         req.session.user = user;
//         res.redirect('index');
       
//     }
//     else
//     {
//         req.flash('shyam','wrong password')
//         res.redirect('/');

//     }
   
// }
// })







// App.get('/adminlogin',async(req,res)=>{
   
//     res.render('adminlogin');
// })
App.get('/search',async(req,res)=>{
     
    let data=await Details.find({});
    console.log(data);
    res.render('search',{users: data});
   
    // res.render('search');
})

// App.get('/product-left-thumbnail',async(req,res)=>{
      
    
//     let data=await Details.find({});
//     console.log(data);
//     res.render('product-left-thumbnail',{users: data});
   
//     // res.render('product-left-thumbnail');
// })


// App.get('/products',async(req,res)=>{
     

//     let data=await Details.find({});
//     console.log(data);
//     res.render('products',{users: data});
//     // res.render('products');
// })


//// product detail register
// App.get('/registerproducts',function(req,res){
   
//     res.render('registerproducts');
// })

// App.post('/registerproducts',products.insertProduct);


// App.post('/registerproducts',upload.single('image'),async (req,res)=>{
    //res.send('<h1>About Node JS</h1>')
    // let {pname,sellingp,originalp,image,discountp,pdescription,cdescription,caddress,scontact,ptype,pnumber,pmfg,pstock,ptag}=req.body;
   
    // let data=new Details({
        

        
    //         productname:pname,
       
    //         sellingp:sellingp,
      
    //         originalp:originalp,
       
    //         image:req.file.filename,
    //     discountpercentage:discountp,
        
    //         description:pdescription,
    //     companydescription:cdescription,
    //         companyaddress:caddress,
        
    //         contactseller:scontact,
       
    //         producttype:ptype,
       
    //         productsku:pnumber,
        
    //         productmfg:pmfg,
        
    //         productstock:pstock,
       
    //         tag:ptag,
       
    
    // })
    // data.save();
    // console.log('user added successfully!');
//     res.redirect('/register');
    
// })


///////


// App.get('/register',async(req,res)=>{
   
//     res.render('register',{message:"user added succesfully"});
// })
// App.post('/register',upload.single('image'),async (req,res)=>{
//     //res.send('<h1>About Node JS</h1>')
//     let {roll,name,course,image,email,}=req.body;
   
//     let data=new Students({
//         roll: roll,
//         name: name,
//         course: course,
//         image:req.file.filename,
//         email: email,
    
//     })
//     data.save();
//     console.log('user added successfully!');
//     res.redirect('/register');
    
// })

// App.get('/registerlogin',async(req,res)=>{
   
//     res.render('registerlogin',{message:"user added succesfully"});
// })
// App.post('/registeradmin',upload.single('image'),async (req,res)=>{
//     //res.send('<h1>About Node JS</h1>')
//     let {name,email,image,password}=req.body;
   
//     let data=new Login({
        
//         name: name,
//         email: email,
//         image:req.file.filename,
//         password: await bcrypt.hash(password,10)

    
//     })
//     data.save();
//     console.log('user added successfully!');
//     res.redirect('/registerlogin')
    
// })


App.post('/delete',async(req,res)=>{
    let email=req.body.email;
    let data=await Students.deleteOne({
        email: email
  })
  res.redirect('/all-users2')
})




App.post('/edit',async(req,res)=>{
    let email=req.body.email;
    
    let data=await Students.findOne({email: email});
    console.log(data);
    res.render('edit',{users: data});
})

App.post('/update',async(req,res)=>{
    let {roll,name,email,course}=req.body;
    
    let data=await Students.updateOne(
        {
          email: email
        },
        {
            $set: 
            {   
                roll:roll,
                name: name,
                email: email,
                course:course
            }
        }
    )
    res.redirect('/all-users2');
})


// this delete and update for user.ejs page

App.post('/delete2',async(req,res)=>{
    let email=req.body.email;
    let data=await Students.deleteOne({
        email: email
  })
  res.redirect('/users')
})




App.post('/edit2',async(req,res)=>{
    let email=req.body.email;
    
    let data=await Students.findOne({email: email});
    console.log(data);
    res.render('edit',{users: data});
})

App.post('/update',upload.single('image'),async(req,res)=>{
    let {roll,name,email,image,course}=req.body;
    
    let data=await Students.updateOne(
        {
          email: email
        },
        {
            $set: 
            {   
                roll:roll,
                name: name,
                email: email,
                course:course,
                image:req.file.filename
            }
        }
    )
    res.redirect('/users');
})
// ////////////////////////////////////


App.get('/all-users',async(req,res)=>{
    let data=await Students.find({});
    console.log(data);
   res.render('filter-user',{users: data});

   // res.render('filter-user');
})
App.get('/all-users2',async(req,res)=>{
    let data=await Students.find({});
    console.log(data);
   res.render('filter-user2',{users: data});

   // res.render('filter-user');
})
App.get('/all-users3',async(req,res)=>{
    let data=await Students.find({});
    console.log(data);
   res.render('filter-user3',{users: data});

   // res.render('filter-user');
})
App.get('/all',async(req,res)=>{
   
    let data=await Students.find({});
    console.log(data);
    res.render('users',{users: data});
})


// App.post('/all', async(req,res)=>{
 
//     let data=await Students.find({});
//     console.log(data);
//     res.render('users',{users: data});
// })


App.post('/filter-data',async(req,res)=>{
    let email=req.body.email;
    
    let data=await Students.find({email: email});
    console.log(data);
    res.render('filter-user',{users: data});
})
App.post('/filter-data2',async(req,res)=>{
    let email=req.body.email;
    let name=req.body.name;
    
    let data=await Students.find(({$or:[{name:{$eq:name}},{email:{$eq:email}}]}));
    console.log(data);
    res.render('filter-user2',{users: data});
})
///////////////

App.get('/admin-details',async(req,res)=>{
    let data=await Login.find({});
    console.log(data);
   res.render('admin-details',{users: data});

   // res.render('filter-user');
})








///////////// product show
// App.get('/products-all',async(req,res)=>{
//     let data=await Details.find({});
//     console.log(data);
//    res.render('products',{users: data});

// })


App.post('/filter-products',async(req,res)=>{
    let name=req.body.pname;
    let number=req.body.pnumber;
    
    let data=await Details.find(({$or:[{productname:{$eq:name}},{productsku:{$eq:number}}]}));
    console.log(data);
    res.render('products',{users: data});
})



App.post('/delete-product',async(req,res)=>{
    let pnumber=req.body.productnumber;
    let data=await Details.deleteOne({
        productsku: pnumber
  })
  res.redirect('/products')
})




App.post('/edit-product',async(req,res)=>{
    let pnumber=req.body.productnumber;
    
    let data=await Details.findOne({productsku: pnumber});
    console.log(data);
    res.render('productedit',{users: data});
})

App.post('/update-product',upload.single('image'),async(req,res)=>{
    let {pname,sellingp,originalp,image,discountp,pdescription,cdescription,caddress,scontact,ptype,pnumber,pmfg,pstock,ptag}=req.body;
    
    let data=await Details.updateOne(
        {
         productsku: pnumber
        },
        {
            $set: 
            {   
               
            productname:pname,
       
            sellingp:sellingp,
      
            originalp:originalp,
       
            image:req.file.filename,
            discountpercentage:discountp,
            description:pdescription,
            companydescription:cdescription,
            companyaddress:caddress,
        
            contactseller:scontact,
       
            producttype:ptype,
       
            productsku:pnumber,
        
            productmfg:pmfg,
        
            productstock:pstock,
            tag:ptag,
            }
        }
    )
    res.redirect('/products');
})

/////////////
App.listen(3016,()=>{
    console.log('Server is Running');
 })