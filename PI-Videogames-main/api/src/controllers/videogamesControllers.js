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
const getVideogamesByName=async (name)=>{
    const videogamesApi= await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    const videogamesDb=await Videogame.findAll({where: {name:{[Op.iLike]:`%${name}%`}},include:Genre})
    
    let allVideogames=videogamesDb.concat(videogamesApi.data.results);
    allVideogames=allVideogames?.map(v=>{
        return {
            id:v.id,
            name:v.name,
            img:v.background_image,
            genres:v.genres?.map(g=>g.name),
            rating:v.rating}
    })
    if(allVideogames){
        while(allVideogames.length>15){
            allVideogames.pop();
        }
        return allVideogames;
    }
    throw Error("No se encontro ningún videojuego")
}
const getAllVideogames=async ()=>{
    //hago la peticion para que traiga los 20 juegos de la primera pagina
    let Apis=[`https://api.rawg.io/api/games?key=${API_KEY}`];
    //itero 5 veces para traer los videojuegos de las primeras 5 paginas 
    for(let i=2;i<6;i++){
        //cambio el valor de Api por los datos de la pagina siguiente guardada en la propiedad next
        Apis.push(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
    }
    const videogamesApi= await Promise.all(Apis.map(api=>axios(api))).then(r=>r.map(res=>res.data.results));
    console.log(Apis.map(api=>axios(api)));
    const videogamesDb=await Videogame.findAll({include:Genre})
    let allVideogames=videogamesDb.concat(videogamesApi.flat().map(v=>v));
   
    allVideogames=allVideogames.map(v=>{
        return {
            id:v.id,
            name:v.name,
            img:v.background_image,
            genres:v.genres?.map(g=>g.name),
            rating:v.rating,
            createdInDb: v.createdInDb?true:false
        }
    })
    
    return allVideogames;
}

const createVideogame=async (name,description_raw, released,rating,background_image, platforms, genres)=>{
    const newVideogame=await Videogame.create({name,description_raw, released,rating,background_image, platforms});
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
        ?await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`).then(r=>r.data)
        :await Videogame.findOne({where: {id},include:Genre});
            
    const platforms= !isNaN(id)? videogame.platforms.map(p=>p.platform.name) :videogame.platforms;

    if(videogame)return  {
        name:videogame.name,
        img:videogame.background_image,
        description: videogame.description_raw,
        genres:videogame.genres.map(g=>g.name),
        released:videogame.released,
        rating:videogame.rating,
        platforms:platforms
    };
    throw Error("No existe un videojuego con ese ID");
}


module.exports={createVideogame, getAllVideogames,getVideogamesByName, getById}