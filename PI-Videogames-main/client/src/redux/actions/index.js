import axios from "axios";

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_VIDEOGAMES_NAME="GET_ALL_VIDEOGAMES_NAME"
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";

export const getAllVideogames = () => async (dispatch) => {
  // Tu código acá
    return axios('http://localhost:3001/videogames').then((r)=>
      dispatch({type: GET_ALL_VIDEOGAMES, payload:r.data}))
};
export const getAllVideogamesName =(name)=>async (dispatch)=>{
  return axios.get(`http://localhost:3001/videogames?name=${name}`).then((r)=>
    dispatch({type:GET_ALL_VIDEOGAMES_NAME, payload: r.data}))
}
export const getVideogameDetail = (id) => (dispatch) => {
  // Tu código acá
  return axios(`http://localhost:3001/videogames/${id}`).then((r)=>
    dispatch({type: GET_VIDEOGAME_DETAIL, payload:{...r.data}}))
};

export const createVideogame = (payload) => {
  
  return{
    type: CREATE_VIDEOGAME, payload: {payload}
  }
};

export const deleteVideogame = (id) => {
  // Tu código acá
  return {
    type: DELETE_VIDEOGAME, payload: id
  }
};
