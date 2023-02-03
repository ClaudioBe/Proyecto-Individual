import {
    GET_ALL_VIDEOGAMES,
    GET_ALL_VIDEOGAMES_NAME,
    GET_ALL_GENRES,
    FILTER_VIDEOGAMES_BY_GENRE,
    ALPHABETICAL_ORDER,
    CREATED_OR_EXISTING,
    GET_VIDEOGAME_DETAIL,
    CREATE_VIDEOGAME,
    ORDER_BY_RATING,   
} from "../actions";

const initialState= {
    videogames: [],
    allVideogames: [],
    genres:[],
    videogameDetail:{}
}

const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_VIDEOGAMES: 
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload, 
            }
        case GET_ALL_VIDEOGAMES_NAME: return{
            ...state,
            videogames: action.payload,
        }
        case GET_ALL_GENRES: return {
            ...state,
            genres:action.payload
        }
        case FILTER_VIDEOGAMES_BY_GENRE: 
            const filterGenre=state.allVideogames.filter(v=>v.genres.includes(action.payload))
            return {
                ...state,
                videogames: action.payload === "all" ?state.allVideogames :filterGenre
            }
        case ALPHABETICAL_ORDER: 
            let orderA= action.payload==="asc"? state.videogames.sort((v1,v2)=>{
                if(v1.name < v2.name) return -1
                if(v1.name > v2.name) return 1
                return 0
            }) 
            : state.videogames.sort((v1,v2)=>{
                if(v1.name < v2.name) return 1
                if(v1.name > v2.name) return -1
                return 0
            })
            
            return {
                ...state,
                videogames: action.payload === "none" ?state.allVideogames :orderA
                
            }
        case ORDER_BY_RATING:
            let orderByRating= action.payload==="asc"? state.videogames.sort((v1,v2)=>{
                if(v1.rating < v2.rating) return -1
                if(v1.rating > v2.rating) return 1
                return 0
            }) 
            : state.videogames.sort((v1,v2)=>{
                if(v1.rating < v2.rating) return 1
                if(v1.rating > v2.rating) return -1
                return 0
            })
            return {
                ...state,
                videogames:action.payload==="none"? state.allVideogames :orderByRating
            }
        case CREATED_OR_EXISTING: 
            const filter=action.payload==="created" ?state.allVideogames.filter(v=>v.createdInDb)
                        :state.allVideogames.filter(v=>!v.createdInDb)
            return{ 
                ...state,
                videogames: action.payload ==="all" ?state.allVideogames :filter 
        }
        case GET_VIDEOGAME_DETAIL: return{
            ...state,
            videogameDetail:action.payload
        }
        case CREATE_VIDEOGAME: return{
            ...state,
        } 
        default: return {...state}
    }
}

export default rootReducer;