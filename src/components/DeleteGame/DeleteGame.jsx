import React from "react";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {deleteGame, cleanAllGames, resetFilter} from '../../actions/actions.js'
import s from './DeleteGame.module.css'


function DeleteGame(payload){

    const id = payload.id

    const dispatch = useDispatch();
    const history = useHistory()

    function handleDetele(e){
        e.preventDefault();
        if(id.length>10){
            try {
                dispatch(deleteGame(id))
                dispatch(resetFilter());
                dispatch(cleanAllGames())
                alert('Videogame has been deleted')
                history.push('/home');    
            } catch (error) {
                alert(`sorry, we couldn't delete the videogame`)   
            }
        }else{
            alert('Videogames from API cannot be deleted')
        } 
    }

    return(
        <button className={s.buttonX} onClick={e => {handleDetele(e)}}>Delete Game</button>
    )
}

export default DeleteGame;