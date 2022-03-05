import axios from 'axios';

export const GET_GAMES = 'GET_GAMES';
export const ORDER_BY = 'ORDER_BY';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const FILTER = 'FILTER';
export const RESET_FILTER = 'RESET_FILTER' 
export const SEARCH_GAME_BY_NAME = 'SEARCH_GAME_BY_NAME';
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL'
export const GET_PLATFORMS = 'GET_PLATFORMS'; 
export const CLEAN_GAMES_TO_WAIT = 'CLEAN_GAMES_TO_WAIT';
export const CLEAN_ALL_GAMES = 'CLEAN_ALL_GAMES'; 
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const SAVE_INPUT = 'SAVE_INPUT';

const SERVER_URL = process.env.REACT_APP_SERVER_HOST


export function getGames(){
    return async function(dispatch){
        return axios.get(`${SERVER_URL}/videogames`)
            .then(info => dispatch({
                type: GET_GAMES,
                payload: info.data
            }))
            .catch(err =>{
                console.log(err);
            })
    }
}

export function searchGameByName(sbInput){
    let sbInputLower = sbInput.toLowerCase()
    return async function(dispatch){
        try {
            let info = await axios.get(`${SERVER_URL}/videogames?name=${sbInputLower}`)
            return dispatch({
                type: SEARCH_GAME_BY_NAME,
                payload: info.data 
            })    
        } catch (error) {
            console.log(error);
            return dispatch({
                type: SEARCH_GAME_BY_NAME,
                payload: [{
                    id : '',
                    name: 'No Results',
                    rating: '',
                    image : '',
                    genres: []  
                }]
            }) 

        }
    }
}

export function resetFilter(){
    return{
        type: RESET_FILTER
    }
}

export function getAllPlatforms(){
    return async function(dispatch){
        return axios.get(`${SERVER_URL}/platforms`)
            .then(info => dispatch({
                type: GET_PLATFORMS,
                payload: info.data
            }))
            .catch(err =>{
                console.log(err);
            })
    }
}

export function getAllGenres(){
    return async function(dispatch){
        try {
            let info = await axios.get(`${SERVER_URL}/genres`);

            let sortedGenres = info.data.sort((a,b)=>{
                if(a.name < b.name){
                    return -1;
                }
                if(a.name > b.name){
                    return 1;
                }
                return 0;
            })
            
            return dispatch({
                type: GET_ALL_GENRES,
                payload: sortedGenres
            })
        } 
        catch (error) {
            console.log(error);    
        }
        
    }
}


export function orderBy(payload){
    return{
        type: ORDER_BY,
        payload
    }

}


export function filterTotal(payload){
    return{
        type: FILTER,
        payload
    }

}

export function getGameDetail(payload){
    return async function(dispatch){
        return axios.get(`${SERVER_URL}/videogame/${payload}`)
            .then(info => dispatch({
                type: GET_GAME_DETAIL,
                payload: info.data
            }))
            .catch(err =>{
                console.log(err);
            })
    }
}

export function deleteGame(payload){
    return async function(dispatch){
        let response = await axios.put(`${SERVER_URL}/videogame/${payload}`)
        return response; 
    }
}

export function cleanDetail(){
    return{
        type: CLEAN_DETAIL
    }
}

export function cleanGamesToWait(){
    return{
        type: CLEAN_GAMES_TO_WAIT
    }
}

export function cleanAllGames(){
    return{
        type: CLEAN_ALL_GAMES
    }
}


export function createGame(payload){
    return async function(dispatch){
        let response = await axios.post(`${SERVER_URL}/videogame`,payload)
        return response;
      
    }
}

export function saveInput(payload){
    return{
        type: SAVE_INPUT,
        payload
    }
}