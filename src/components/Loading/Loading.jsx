import React from "react";
import s from './Loading.module.css'

export default function Loading(){
    
        return(
            <div>
                <h3 className={s.title}>Loading...</h3>
                <img className={s.image} src='https://acegif.com/wp-content/uploads/loading-87.gif' alt='not found'/>
            </div>
        )
    
}



