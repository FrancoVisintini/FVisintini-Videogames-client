import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import { cleanGamesToWait, resetFilter, saveInput, searchGameByName } from "../../actions/actions.js";
import s from './SearchBar.module.css'

function SearchBar(){

    const history = useHistory()
    const dispatch = useDispatch()
    const [localInput, setLocalInput] = useState('')

    const searchInput = useSelector(state => state.searchInput);
    const reset = useSelector(state => state.reset);

    useEffect(()=>{
        setLocalInput(searchInput)
        //eslint-disable-next-line
    },[reset])

    function handleChange(e){
        e.preventDefault();
        setLocalInput(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault();
        dispatch(saveInput(localInput))
        dispatch(resetFilter())
        if(localInput){
            dispatch(cleanGamesToWait())
            dispatch(searchGameByName(localInput));
        }
        
        history.push('../home')
    }

    function handleCleanInput(e){
        e.preventDefault();
        setLocalInput('');
    }

    return(
        <div className={s.SBar}>
            <input type='text' placeholder="Search..." value={localInput} onChange={e => {handleChange(e)}} className={s.SBinput}/>
            <button type="submit" onClick={e => handleCleanInput(e)} className={s.buttonX}>X</button>
            <button type='submit' onClick={e => handleSubmit(e)} className={s.SBbutton}>GO</button>
        </div>
    )

}

export default SearchBar;