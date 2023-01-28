const{Videogame, Genre}=require('../db.js');
const axios=require('axios');
const {Op} = require("sequelize");
const {API_KEY}=process.env;


// [ ] GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada
// como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado

const getVideogame=async (name)=>{
    const gamesApi=name
        ? await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`).then(r=>r.data.results)
        : await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`).then(r=>r.data.results)
    let videogamesApi=[];
  
    videogamesApi=gamesApi.map(v=>{
        return {
            id:v.id,
            name:v.name,
            img:v.background_image,
            genres:v.genres.map(g=>g.name)
        }
    })
    
    
    const videogames = name 
        ?await Videogame.findAll({where: {name:{[Op.iLike]:`%${name}%`}},attributes:['name','img'], include:Genre})
        :await Videogame.findAll({attributes:['name'], include:{model:Genre}})
 
    const allVideogames=videogames.concat(videogamesApi);
    
    if(allVideogames.length) return allVideogames

    throw Error("No se encontro ningún videojuego")
}

const createVideogame=async (name,description, released,rating,img, platforms, genres)=>{
    const newVideogame=await Videogame.create({name,description, released,rating,img, platforms});
    genres.forEach(async g => {
        Genre.findOrCreate({
            where:{name:g}
        })
        newVideogame.addGenre(await Genre.findOne({where:{name:g}}))
    });
    return newVideogame;
}

const getById= async(id)=>{
    const videogame = !isNaN(id)
        ?await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`).then(r=>r.data)
        :await Videogame.findOne({
            where: {id},
            include:{
                model: Genre
            }});
   
    if(videogame)return  {
        name:videogame.name,
        img:videogame.background_image,
        genres:videogame.genres.map(g=>g.name),
        released:videogame.released,
        rating:videogame.rating,
        platforms:videogame.platforms.map(p=>p.platform.name)
    };
    throw Error("No existe un videojuego con ese ID");
}

module.exports={createVideogame, getVideogame, getById}