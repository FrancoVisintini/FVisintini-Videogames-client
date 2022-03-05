import React, { useEffect, useState } from "react";
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux'
import {getAllGenres, createGame, getAllPlatforms, cleanAllGames} from '../../actions/actions.js'
import Loading from "../Loading/Loading.jsx";
import s from './CreateGame.module.css'

let submitTry=0;

function isDate(texto) {

    let partes = (texto || '').split('-').map(e => parseInt(e));
    let fecha = new Date(partes[0], --partes[1], partes[2]);
    let hoy = new Date (Date.now());
    
    if (partes.length === 3 && fecha
     && partes[2] === fecha.getDate()
     && partes[1] === fecha.getMonth()
     && partes[0] === fecha.getFullYear()
     && fecha.getFullYear()>=1970){
        if(fecha<=hoy){
            return 'OK'
        } return 'future';
    }
    
    return 'not_date';
}


function validate(input){
    let problem = {};

    if(input.name!=='' && (!/^[a-zA-Z0-9 :]+$/.test(input.name))){
        problem.name='The game name cannot include special characters';
    }else if(input.name==='' && (input.released!=='' || input.rating!=='' || input.description!=='' || submitTry>0)){
        problem.name='Insert a name';
    }else if(input.name!==''){
        problem.name='OK';        
    }else{
        problem.name='';
    }

    if(input.released!==""){
        switch(isDate(input.released)){
            case 'future':
                problem.released='The date cannot be in the future';
                break;
            case 'not_date':
                problem.released='Insert a valid date. Format yyyy-mm-dd';
                break;
            default:
                problem.released='OK'
        }
    }else{
        problem.released='OK'
    }

    if(input.rating!=="" && (input.rating<1 || input.rating>5)){
        problem.rating='The rating must be between 1 and 5'
    }else if(input.rating==='' && (submitTry>0 || input.description!=='')){
        problem.rating='Insert a rating value';  
    }else if(input.rating!==''){
        problem.rating='OK'
    }else{
        problem.rating=''
    }

    
    if(input.description==='' && submitTry>0){
        problem.description ='Insert a description';
    }else if(input.description!==''){
        problem.description='OK';        
    }else{
        problem.description='';
    }


    if(input.platforms.length===0 && submitTry===0){
        problem.platforms = ''
    }else if(input.platforms.length===0){
        problem.platforms = 'Choose at least one platform'
    }else{
        problem.platforms = 'OK'
    }

    if(input.genre.length===0 && submitTry===0){
        problem.genre = ''
    }else if(input.genre.length===0){
        problem.genre = 'Select at least one genre'
    }else{
        problem.genre = 'OK'
    }


    return problem;
}



function CreateGame(){

    const dispatch = useDispatch();
    const history = useHistory();
    
    const allGenres = useSelector(state => state.allGenres);
    const allPlatforms = useSelector(state => state.allPlatforms);
    

    useEffect(()=>{
        if(allGenres.length===0){
            dispatch(getAllGenres());
        }
        if(allPlatforms.length===0){
            dispatch(getAllPlatforms())
        }
        submitTry=0;
       //eslint-disable-next-line 
    },[]);

    const [input, setInput] = useState({
        name:'',
        image:'',
        description:'',
        rating:'',
        released:'',        
        genre:[],
        platforms:[]
    });

    const [errors, setErrors] = useState({
        name:'',
        rating:'',
        released:'',        
        genre:'',
        platforms:''
    });

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    function handleCheck(e){
        setInput({
            ...input,
            platforms: e.target.checked ? [...input.platforms, e.target.value] 
                        : [...input.platforms.filter(p=> p !== e.target.value)]
        })
        setErrors(validate({
            ...input,
            platforms: e.target.checked ? [...input.platforms, e.target.value] 
                        : [...input.platforms.filter(p=> p !== e.target.value)]
        }))
    }

    function handleSelect(e){
        if(!input.genre.includes(e.target.value)){
            setInput({
                ...input,
                genre: [...input.genre, e.target.value] 
            })
            setErrors(validate({
                ...input,
                genre: [...input.genre, e.target.value]
            }))
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            genre: [...input.genre.filter(g=> g !== e)]
        })
        setErrors(validate({
            ...input,
            genre: [...input.genre.filter(g=> g !== e)]
        }))
    }


    async function handleSubmit(e){
        e.preventDefault();
        submitTry++;
        setErrors(validate({
            ...input
        }))
        for(let clave in errors){
            if(errors[clave]!=='OK'){
                return alert('Please complete all mandatory fields (*)')
            }
        }
        
        try{
            dispatch(createGame(input));
            alert('Game Created!')
            setInput({
                name:'',
                image:'',
                description:'',
                rating:'',
                released:'',        
                genre:[],
                platforms:[]
            })
            dispatch(cleanAllGames());
            history.push('/home');
        }
        catch(error){
            console.log(error);
            alert('Error')
        }
        
    }

    return(
        <div>
            <Link to='/home'>Go Back!</Link>
            <h2 className={s.titulo}>Create a new video game</h2>
            {
                allPlatforms.length!==0 ?
                <div>
                <p className={s.subtitulo}>The fields indicated with * are required</p>
                <form onSubmit={e=>{handleSubmit(e)}}>
                    <div className={s.gameForm}>
                        <div className={s.block1}>
                            <div className={s.block2}>
                                <input
                                        type='text'
                                        name='name'
                                        value={input.name}
                                        placeholder="Your game name...(*)"
                                        onChange={e => {handleChange(e)}}
                                        className={s.formInput}
                                        
                                />
                                {errors.name!=='OK' ? <p className={s.error}>{errors.name}</p> : <p className={s.noError}>{errors.name}</p> }
                                
                            </div>
                            <div className={s.block2}>
                                <input
                                    type='text'
                                    name='released'
                                    value={input.released}
                                    placeholder='Release at yyyy-mm-dd...'
                                    onChange={e => {handleChange(e)}}
                                    className={s.formInput}
                                />
                                {errors.released!=='OK' ? <p className={s.error}>{errors.released}</p> : <p className={s.noError}>{errors.released}</p> }
                            </div>
                            <div className={s.block2}>
                                <input
                                    type='number'
                                    name='rating'
                                    value={input.rating}
                                    placeholder='Rating from 1 to 5...(*)'
                                    onChange={e => {handleChange(e)}}
                                    className={s.formInput}
                                />
                                {errors.rating!=='OK' ? <p className={s.error}>{errors.rating}</p> : <p className={s.noError}>{errors.rating}</p> }
                            </div>
                            <div className={s.block2}>
                                <input
                                    type='text'
                                    name='image'
                                    value={input.image}
                                    placeholder='Image url...'
                                    onChange={e => {handleChange(e)}}
                                    className={s.formInput}
                                />
                                <p className={s.noError}></p>
                            </div>
                            <div className={s.block2}>
                                <textarea rows="5" cols="60"
                                    type='text'
                                    name='description'
                                    value={input.description}
                                    onChange={e => {handleChange(e)}}
                                    placeholder='Write a description of the game...(*)'
                                    className={s.description}
                                />
                                {errors.description!=='OK' ? <p className={s.error}>{errors.description}</p> : <p className={s.noError}>{errors.description}</p> }
                            </div>
                        </div>
                        
                        <div className={s.block3}>
                            <div className={s.platforms}>
                                <label className={s.titlePlat}>Platforms   (*)</label>
                                <br/>
                                <div className={s.grilla}>
                                {allPlatforms.map(e=> {
                                    
                                    let label = e[0].toUpperCase()+e.slice(1);
                                    return(
                                            <label key={label} className={s.itemP}>
                                                <input
                                                    type='checkbox'
                                                    value={label}
                                                    name={label}
                                                    onChange={p => {handleCheck(p)}}
                                                />{label}
                                            </label>
                                    )
                                    
                                })}
                                </div>
                                {errors.platforms!=='OK' ? <p className={s.error}>{errors.platforms}</p> : <p className={s.noError}>{errors.platforms}</p> }
                            </div>
                            <div className={s.genres}>
                                <div className={s.options}>
                                    <label>Genres  (*): </label>
                                    <select onChange={g => {handleSelect(g)}}>
                                        {allGenres.map(e => (
                                            <option key={e.id} value={e.name}>{e.name}</option>
                                        ))}
                                    </select>
                                    {errors.genre!=='OK' ? <p className={s.error}>{errors.genre}</p> : <p className={s.noError}>{errors.genre}</p>}  
                                </div>
                                
                                <div className={s.selected}>
                                    {input.genre.map(e => 
                                        <span className={s.itemG} key={e}>
                                            <span>{e} </span>
                                            <button className={s.buttonX} onClick={()=> handleDelete(e)}>x</button>
                                        </span>
                                    )}
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>                    
                    <button type ='submit' className={s.button}>Create Game</button>      
                
                </form>
                </div>                        
                    
                    
                : <Loading/>
                
            }
            
        </div>
    )

}

export default CreateGame;