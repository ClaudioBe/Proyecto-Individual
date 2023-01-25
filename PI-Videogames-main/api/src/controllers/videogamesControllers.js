const{Videogame, Genre}=require('../db.js');
const {Op} = require("sequelize");

// [ ] GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada
// como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado
const getVideogame=async (name)=>{
    const videogame = name 
        ?await Videogame.findAll({where: {name:{[Op.iLike]:`%${name}%`}}, include:Genre})
        :await Videogame.findAll({attributes:['name'], include:{model:Genre}})
    if(!videogame.length) {console.log("error"); throw Error("No se encontró nungún videojuego");}

    return videogame;
    
}

const createVideogame=async (name,description, released,rating, platforms, genres)=>{
    const newVideogame=await Videogame.create({name,description, released,rating, platforms });
    genres.forEach(async g => {
        Genre.findOrCreate({
            where:{name:g}
        })
        newVideogame.addGenre(await Genre.findOne({where:{name:g}}))
    });
    return newVideogame;
}

const getById= async(id)=>{
    const videogame= await Videogame.findOne({
        where: {id},
        include:{
            model: Genre
        }});
    return videogame;
}

module.exports={createVideogame, getVideogame, getById}