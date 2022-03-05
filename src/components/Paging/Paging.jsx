import React from "react";
import s from './Paging.module.css';

export default function Paging ({gamesPerPage,allGames, paging, actualPage}){

    let pages=[];

    for(let i=1; i<=Math.ceil(allGames/gamesPerPage);i++){
        pages.push(i);
    }

    return(
        <div className={s.pagination}>
                { pages && pages.map(number => ( 
                    <span className='number' key={number}>
                        <button onClick={() => paging(number)}  className={number===actualPage ? s.actualPage : s.pageNumb} >{number}</button>
                    </span> 
                ))}
        </div>
    )
}