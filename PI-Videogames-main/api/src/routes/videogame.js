const {Router}=require('express');
const router = Router();
const{createVideogame, getAllVideogames,getVideogamesByName, getById}=require('../controllers/videogamesControllers.js');

router.get('/', async(req,res)=>{
    const {name}= req.query;
    try {
        const videogame=name ? await getVideogamesByName(name)
                             : await getAllVideogames()
        return res.status(200).json(videogame);
    } catch (error) {
         res.status(404).json({error: error.message})
    }
});
// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
// [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// [ ] Descripción
// [ ] Fecha de lanzamiento
// [ ] Rating
// [ ] Plataformas
router.get('/:id', async (req,res)=>{
    const {id}=req.params;
    try {
        const videogame=await getById(id);
        res.status(200).json(videogame);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
    
})

router.post('/', async(req,res)=>{
    const{name,description_raw, released, rating, background_image, platforms, genres}=req.body;
    const newVideogame=await createVideogame(name,description_raw, released,rating, background_image,platforms, genres);
    res.status(201).json(newVideogame);
})

module.exports=router;

