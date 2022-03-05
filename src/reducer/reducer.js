import { 
    GET_GAMES,
    ORDER_BY,
    GET_ALL_GENRES,
    FILTER,
    RESET_FILTER,
    SEARCH_GAME_BY_NAME,
    GET_GAME_DETAIL,
    CLEAN_DETAIL,
    GET_PLATFORMS,
    CLEAN_GAMES_TO_WAIT,
    CLEAN_ALL_GAMES,
    SAVE_INPUT
} from '../actions/actions'

const initialState = {
    games: [],
    allGames:[],
    searchGames:[],
    allGenres:[],
    allPlatforms:[],
    detail:[],
    orderType:'name initial',
    filterOriginType: 'All',
    filterGenreType: 'All',
    searchInput:'',
    reset: true
}

function rootReducer(state=initialState, action){

    const noResults = [{
        id : '',
        name: 'No Results',
        rating: '',
        image : '',
        genres: []  
    }]

    switch(action.type){
        case GET_GAMES:
            return{   
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        case GET_ALL_GENRES:
            return{
                ...state,
                allGenres: action.payload
            }
        case GET_PLATFORMS:
            return{
                ...state,
                allPlatforms: action.payload
            }
        case CLEAN_GAMES_TO_WAIT:
            return{
                ...state,
                games: []
            }
        case CLEAN_ALL_GAMES:
            return{
                ...state,
                games:[],
                allGames: [],
                searchGames:[],
                searchInput:'',
            }
        case SEARCH_GAME_BY_NAME:
            return{
                ...state,
                games: action.payload,
                searchGames:action.payload
            }
        case FILTER:
            let [origin, genre] = action.payload.split('@');
            let stateToSearch = state.searchGames.length!==0 ? 'searchGames' : 'allGames'
            let gamesFiltered;
            if(action.payload==='All@All'){
                gamesFiltered = state.allGames;
            }
            else if(genre==='All' && origin!=='All'){
                gamesFiltered = origin==='created' 
                ? state[stateToSearch].filter(e => e.created_in_DB === true)
                : state[stateToSearch].filter(e => e.created_in_DB !== true)  
            }
            else if(genre!=='All' && origin==='All'){
                gamesFiltered = state[stateToSearch].filter(e => e.genres.includes(genre))
            }
            else{
                if(origin==='created'){
                    gamesFiltered = state[stateToSearch].filter(e => e.genres.includes(genre) && e.created_in_DB === true)
                }
                else{
                    gamesFiltered = state[stateToSearch].filter(e => e.genres.includes(genre) && e.created_in_DB !== true)
                }
            }
            return{
                ...state,
                games: gamesFiltered.length!==0 ? gamesFiltered : noResults,
                filterGenreType:genre,
                filterOriginType:origin
            }


        case ORDER_BY:
            let [by, order] = action.payload.split(' ');
            let sortedGames = order === 'asc' || order === 'initial'?
                state.games.sort(function(a,b){
                    let c = a[by].toString().toLowerCase()
                    let d = b[by].toString().toLowerCase() 
                    if (c > d) {
                        return 1;
                    }
                    if (c < d) {
                        return -1;
                    }
                    return 0;
                }) :
                state.games.sort(function(a,b){
                    let c = a[by].toString().toLowerCase()
                    let d = b[by].toString().toLowerCase()
                    if (c > d) {
                        return -1;
                    }
                    if (c < d) {
                        return 1;
                    }
                    return 0;
                })
            return{
                ...state,
                games: sortedGames,
                orderType: action.payload,
            }
        case RESET_FILTER:
            return{
                ...state,
                games: state.searchInput!=='' ? state.searchGames : state.allGames,
                searchGames: state.searchInput!== '' ? state.searchGames : [],
                reset: !state.reset,
                orderType:'name initial',
                filterGenreType: 'All',
                filterOriginType: 'All'
            }
        case GET_GAME_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                detail: []
            }
        case SAVE_INPUT:
            return{
                ...state,
                searchInput: action.payload
            }
        default:
            return state;
    }

}

export default rootReducer;