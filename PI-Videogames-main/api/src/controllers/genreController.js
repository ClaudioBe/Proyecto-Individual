const{Genre}=require('../db.js');
const axios=require('axios');
const{API_KEY}=process.env;
// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y
// guardarlos en su propia base de datos y luego ya utilizarlos desde allí



const getGenres=async  ()=>{
    const genresApi=await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    genresApi.data.results.forEach(g=>{
        Genre.findOrCreate({where:{name:g.name}})
    })
    return Genre.findAll();
}



module.exports={getGenres};