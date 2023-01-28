import {
    GET_ALL_VIDEOGAMES,
    GET_ALL_VIDEOGAMES_NAME,
    GET_ALL_GENRES,
    ORDER,
    GET_VIDEOGAME_DETAIL,
    CREATE_VIDEOGAME, 
    DELETE_VIDEOGAME,
    GET_VIDEOGAMES_GENRE
} from "../actions";

const initialState= {
    videogames: [],
    genres:[],
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
        case GET_ALL_GENRES: return {
            ...state,
            genres:action.payload
        }
        case GET_VIDEOGAMES_GENRE: return {
            ...state,
            videogames: state.videogames.filter(v=>v.genres.includes(action.payload))
        }
        case ORDER: return {
            ...state,
            videogames: state.videogames.sort((v1,v2)=>{ 
                return v1.name.toLowerCase()< v2.name.toLowerCase() 
                        ? -1
                        : 1
                return 0;
            })
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