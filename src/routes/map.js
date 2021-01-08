const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Poly = require('../models/Poly');
const {isAuthenticated} = require('../helpers/auth')
const Request = require('request')





router.get('/new/poly', async (req, res) => {
        const users = await User.find({})
     
        res.render('map/map-new-poly',{users})
  
    
});


router.get('/map/all-poly',async (req, res) => {
        const polys = await Poly.find({});
        
        res.render('map/all-poly',{polys:polys});
});


 
router.post('/new/poly', (req, res) => {
        const  errors = [];
        let t=0;
        let userCount=0
        const {name,decription,points_input,user}= req.body;

        var promise1 = new Promise(async function(resolve,reject){
                
                       
                        const AllPolys= await Poly.find({});
                        const limit= await Poly.count({});
                        userCount = await Poly.count({user:user});
                         console.log(limit)
                        AllPolys.map( (doc)=>{
                
                                Request.post({
                
                                           "headers": {
                                               "content-type": "application/json"
                                           },
                                           "url": "http://localhost:5000/",
                                           "body": JSON.stringify({
                                               "puntos": points_input,
                                               "poligonos":doc.points
                                           })
                
                                       }, (error, response, body) => {
                                           if (error) {
                                               return console.dir(error);
                                           }
                
                                           if(body=="True"){
                                                   errors.push({text: 'Se esta topando con otros poligonos'});
                                                 //  console.log(errors)
                
                                           }
                                           t++
                                           console.log(t)
                                           if(t==limit){
                
                                                resolve()
                                           }
                                       })
                           }
                           
                   );
                       
                      
            
       
        
   });
     
/*iNICIO */
console.log('inicio');
Promise.all([promise1]).then(function(){
        console.log(points_input);
        const NewPoly=  new Poly({name,decription,points:points_input,user}); 
        console.log(NewPoly.points);
        if (userCount>0){
                console.log('sen ejecuto aqui-----------------')   
                errors.push({text: 'El usaurio ya tiene un poligono asignado'})
        }
        if(errors.length<1){
        
                NewPoly.save();
               console.log("se guardo")
       }

       res.render('map/map-new-poly',{errors})
       console.log('Fin');
});


}

);

router.get('/map',async (req, res) => {
        const poly = await Poly.find({});
        res.render('map/all-poly',{map});
    });


module.exports = router;