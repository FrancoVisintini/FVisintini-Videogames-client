import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {orderBy,filterTotal, resetFilter} from '../../actions/actions.js'
import s from './FilterOrder.module.css'


function FilterOrder({paging}){

    const dispatch=useDispatch()
    const orderType = useSelector(state => state.orderType);
    const filterOriginType = useSelector(state => state.filterOriginType);
    const filterGenreType = useSelector(state => state.filterGenreType);
    const allGenres = useSelector(state => state.allGenres);
    const reset = useSelector(state => state.reset);
    
    const orderSelect = useRef('');
    const originSelect = useRef('');
    const genreSelect = useRef('');

    useEffect(()=>{
        orderSelect.current.value = orderType;
        originSelect.current.value = filterOriginType;
        genreSelect.current.value = filterGenreType;
        //eslint-disable-next-line
    },[reset])
    
    function handleReset(e){
        e.preventDefault();
        dispatch(resetFilter());
        dispatch(orderBy('name initial'));
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderBy(e.target.value));
        paging(1);
    }

    function handleOrigin(e){
        e.preventDefault();
        let filtro = e.target.value+'@'+filterGenreType;
        dispatch(filterTotal(filtro));
        dispatch(orderBy(orderType));
        paging(1);
    }

    function handleGenre(e){
        e.preventDefault();
        let filtro = filterOriginType+'@'+e.target.value;
        dispatch(filterTotal(filtro));
        dispatch(orderBy(orderType));
        paging(1);
    }

    return(
        <div className={s.filterGroup}>
            <select onChange={e => {handleSort(e)}} ref={orderSelect} className={s.FilterOrder}>
                <option value='name initial'>Order by</option>
                <option value='name asc'>Name: A➝Z</option>
                <option value='name desc'>Name: Z➝A</option>
                <option value='rating asc'>Rating: Less➝More</option>
                <option value='rating desc'>Rating: More➝Less</option>
            </select>
            <select onChange={e => {handleOrigin(e)}} ref={originSelect} className={s.FilterOrder}>
                <option value='All'>Filter by Origin</option>
                <option value='All'>All</option>
                <option value='created' >Created by users</option>
                <option value='API'>From API</option>
            </select>
            <select onChange={e => {handleGenre(e)}} ref={genreSelect} className={s.FilterOrder}>
                <option value='All'>Filter by Genre</option>
                <option value='All'>All</option>
                {
                    allGenres?.map(e => (
                        <option key={e.id} value={e.name}>{e.name}</option>
                    ))
                }
            </select>
            <button onClick={e => {handleReset(e)}} className={s.button}>Reset Filters</button>

        </div>
    )

}

export default FilterOrder;