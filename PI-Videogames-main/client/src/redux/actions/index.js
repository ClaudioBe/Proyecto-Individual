import axios from "axios";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_VIDEOGAMES_NAME="GET_ALL_VIDEOGAMES_NAME";
export const GET_ALL_GENRES="GET_ALL_GENRES";
export const FILTER_VIDEOGAMES_BY_GENRE= "FILTER_VIDEOGAMES_BY_GENRE";
export const ALPHABETICAL_ORDER="ALPHABETICAL_ORDER";
export const ORDER_BY_RATING="ORDER_BY_RATING";
export const CREATED_OR_EXISTING="CREATED_OR_EXISTING";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";

export const getAllVideogames = () => async (dispatch) => {
    return await axios('/videogames').then(r=>
      dispatch({type: GET_ALL_VIDEOGAMES, payload:r.data})) 
}

export const getAllVideogamesName =(name)=>async (dispatch)=>{
  try {
    return await axios(`/videogames?name=${name}`).then((r)=>
      dispatch({type:GET_ALL_VIDEOGAMES_NAME, payload: r.data}))
  } catch (error) {
    console.log(error)
  }
  
}

export const getAllGenres=()=>async (dispatch)=>{
  return await axios("/genres").then(r=>
    dispatch({ type: GET_ALL_GENRES, payload: r.data}));
}

export const filterVideogamesByGenre = (genre) => {
  return {
    type: FILTER_VIDEOGAMES_BY_GENRE, payload: genre
  }
}

export const alphabeticalOrder=(order)=>{
  return {
    type: ALPHABETICAL_ORDER , payload: order
  }
}
export const OrderByRating=(order)=>{
  return {
    type: ORDER_BY_RATING,payload:order
  }
}

export const createdOrExisting=(payload)=>{
  return{
    type:CREATED_OR_EXISTING, payload
  }
}

export const getVideogameDetail = (id) => async (dispatch) => {
  return await axios(`/videogames/${id}`).then(r=>
    dispatch({type: GET_VIDEOGAME_DETAIL, payload:{...r.data}}))
};

export const createVideogame =  (payload)=> async()=>{
  return await axios.post("/videogames",payload)
};
