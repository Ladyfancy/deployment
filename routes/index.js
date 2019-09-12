const express = require('express');
const router  = express.Router();
const Color = require('../models/ColorSchema.js')
const loggedIn = false; 


/* GET home page */
router.get('/', (req, res, next) => {
  let title = "Awesome Super Duper Sweet Fantastic Project"
  res.render('index', { title });
});

router.get('/profile', (req, res, next)=> {
  //Get colors from database

  Color.find({}).then(colors=> {
    res.render('profile.hbs', { colors })
  }).catch(err=>console.error(err))

})


router.post('/saveColor', (req, res, next)=> {
  console.log(req.body.color)
  let color = new Color({ name: req.body.color} ) //{name: blue}

  //This takes time... 
  color.save().then(doc=>{//We are done saving so callback
    res.redirect('profile')
  }).catch(err=>console.error(err)) 

})

//delete to /deleteColor

router.delete('/deleteColor', isLoggedIn, (req, res, next)=>{
  console.log('DELETE ',req.body)
  Color
    .deleteOne({name: req.body.color})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

function isLoggedIn(req,res,next){ //Middleware 
  if(loggedIn){
    next()
  } else {
    //res.send('GET THE HECK OUT OF HERE!')
    throw new Error({deleted:false}) 
    return 
  }
}



module.exports = router;
