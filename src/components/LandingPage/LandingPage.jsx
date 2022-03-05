import React from "react";
import { Link } from "react-router-dom";
import { getAllGenres, getGames } from "../../actions/actions";
import { connect } from "react-redux";
import s from './LandingPage.module.css'

class LandingPage extends React.Component{

    componentDidMount(){
        this.props.getAllGenres()
    }

    render(){
        return(
            <div className={s.landing}>
                <div className={s.head}>
                    <h1 className={s.titulo}>The Videogames Page</h1>
                    <h3 className={s.henry}>Henry Individual Project</h3>
                    
                    <Link to='/home'>
                        <button className={s.button}>Let's go!</button>
                    </Link>
                </div>
                
                <h6 className={s.pie}>Made by Franco Visintini</h6>   
            </div>
        )
    }
}

export const mapDispatchToProps = {
    getAllGenres,
    getGames
}

export default connect(null, mapDispatchToProps)(LandingPage);