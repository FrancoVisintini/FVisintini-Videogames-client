import React from "react";
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import {getGames, getAllGenres} from '../../actions/actions.js'
import SearchBar from '../SearchBar/SearchBar';
import FilterOrder from '../FilterOrder/FilterOrder';
import GameCard  from '../GameCard/GameCard';
import Paging from '../Paging/Paging';
import Loading from "../Loading/Loading.jsx";
import s from './Home.module.css'

function Home(){

    const dispatch = useDispatch();
    const actualState = useSelector(state=>state)

    const gamesToShow = actualState.games

    //defino estados locales para paginar
    const [actualPage, setActualPage] = useState(1);
    //eslint-disable-next-line
    const [gamesPerPage, setGamesPerPage] = useState(15);

    // variables adicionales
    const indexOfLastGameOfActualPage = actualPage * gamesPerPage -1;
    const indexOfFirstGameOfActualPage = indexOfLastGameOfActualPage - gamesPerPage + 1; // 0
    const currentGames = gamesToShow.slice(indexOfFirstGameOfActualPage, indexOfLastGameOfActualPage + 1);
    

    const paging = function(number){
        setActualPage(number)
    };

    useEffect(()=>{
        if(actualState.allGames.length===0){
            dispatch(getGames());    
        }
        if(actualState.allGenres.length===0){
            dispatch(getAllGenres());
        }
        //eslint-disable-next-line 
    },[])
    
    return(
        <div>
            <h1 className={s.titulo}>Find your favourite games!</h1>
            <Link to='/newgame'>
                <button className={s.button}>Create New Game</button>
            </Link>
            
            <SearchBar />
          
            <div className={s.filterBar}>
                <FilterOrder paging={paging}/>
            </div>
            <Paging
                gamesPerPage={gamesPerPage}
                allGames={gamesToShow.length}
                paging={paging}
                actualPage={actualPage}
            />
            <div className={s.cardsContainer}>
            {  
                currentGames.length!==0 ? currentGames.map(game => {
                    return(
                            <GameCard
                                    key={game.id}
                                    id={game.id}
                                    name={game.name}
                                    image={game.image}
                                    genres={game.genres}
                                    rating={game.rating}
                            /> 
                    )
                }) : <Loading/>
                
            }
            </div>
            <Paging
                gamesPerPage={gamesPerPage}
                allGames={gamesToShow.length}
                paging={paging}
                actualPage={actualPage}
            />
        </div>
    )

}

export default Home;