const {Router}=require('express');
const router = Router();
const {getGenres}=require('../controllers/genreController.js');


router.get('/', async(req,res)=>{
    const genres=await getGenres();
    res.status(200).send(genres)
})


module.exports=router;