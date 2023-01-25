import {
    GET_ALL_VIDEOGAMES,
    GET_ALL_VIDEOGAMES_NAME,
    GET_VIDEOGAME_DETAIL,
    CREATE_VIDEOGAME, 
    DELETE_VIDEOGAME
} from "../actions";

const initialState= {
    videogames: [],
    videogameDetail:{}
}

const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_VIDEOGAMES: return{
            ...state,
            videogames: action.payload
        }
        case GET_ALL_VIDEOGAMES_NAME: return{
            ...state,
            videogames: action.payload
        }
        case GET_VIDEOGAME_DETAIL: return{
            ...state,
            videogameDetail:action.payload
        }
        case CREATE_VIDEOGAME: return{
            ...state,
            videogames: [...state.videogames, action.payload]
        } 
        case DELETE_VIDEOGAME: return{
            ...state,
            videogames: state.videogames.filter(v=>v.id!==action.payload)
        }
        default: return {...state}
    }
}

export default rootReducer;