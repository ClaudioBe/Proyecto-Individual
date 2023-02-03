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
    let videogamesApi= await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    const videogamesDb=await Videogame.findAll({where: {name:{[Op.iLike]:`%${name}%`}},
                             include:{model:Genre, attributes:['name'],through:{attributes:[]}}})
    
   
    videogamesApi=videogamesApi.data.results.map(v=>{
        return {
            id:v.id,
            name:v.name,
            img:v.background_image,
            genres:v.genres?.map(g=>g.name),
            rating:v.rating}
    })
    const allVideogames=videogamesDb.concat(videogamesApi);
    if(allVideogames){
        while(allVideogames.length>15){
            allVideogames.pop();
        }
        return allVideogames;
    }
    throw Error("No se encontro ningún videojuego")
}
const getAllVideogames=async ()=>{
    //si el parametro name existe o tiene algo dentro, hago la peticion a la Api pasandole
    //ese "name" por query

    //sino, hago la peticion para que traiga todos los juegos de la primera pagina(la primera vez) 
    let videogamesApi= [];
    let Api=await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)

    //itero 5 veces para traer los videojuegos de las primeras 5 paginas 
    for(let i=0;i<5;i++){
        Api.data.results.map(v=>videogamesApi.push({
            id:v.id,
            name:v.name,
            img:v.background_image,
            genres:v.genres?.map(g=>g.name),
            rating:v.rating
        }))
        //cambio el valor de Api por los datos de la pagina siguiente guardada en el atributo next
        Api = await axios(Api.data.next)
    }

    let videogamesDb=await Videogame.findAll({include:{model: Genre,attributes:['name'],
                           through:{attributes:[]}}})
    
    const allVideogames=videogamesDb.concat(videogamesApi);
    
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
        :await Videogame.findOne({
            where: {id},
            include:{
                model: Genre
            }});
            
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