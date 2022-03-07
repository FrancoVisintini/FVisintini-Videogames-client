import React from "react";
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import { getGameDetail, cleanDetail} from "../../actions/actions";
import Loading from "../Loading/Loading";
import SearchBar from "../SearchBar/SearchBar.jsx";
import DeleteGame from "../DeleteGame/DeleteGame";
import s from './GameDetail.module.css'

class GameDetail extends React.Component{

    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getGameDetail(id)
    }

    componentWillUnmount(){
        this.props.cleanDetail()
    }

    render(){
        const detail = this.props.detail;
        const id = this.props.match.params.id;

        return(
            <div>
                {
                    detail.length!==0 ?
                    <div>
                        <br/>
                        <Link to='/home' className={s.item}>Go Back!</Link>
                        <SearchBar/>
                        <div className={s.titleBar}>                                                                
                            <h2 className={s.title}>{detail.name}</h2>
                            <DeleteGame id={id}/>
                        </div>
                        <div className={s.totalDetalle}>
                            <div className={s.ImagGenPlat}>
                                <img src={detail.image} alt='not found' className={s.image}/>
                                <ul className={s.GenPlat} >
                                    <li className={s.item}>
                                        <span className={s.titleItem}>Genres: </span>
                                        <span>{detail.genres?.join(', ')}</span>
                                    </li>
                                    <li className={s.item}>
                                        <span className={s.titleItem}>Released at: </span>
                                        <span>{detail.released}</span>
                                    </li>
                                    <li className={s.item}>
                                        <span className={s.titleItem}>Rating: </span>
                                        <span>{detail.rating}</span>
                                    </li>
                                    <li className={s.item}>
                                        <span className={s.titleItem}>Platforms: </span>
                                        <span>{detail.platforms?.join(', ')}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className={s.description}>
                                <h4 className={s.titleItem}>Description:</h4>
                                <p className={s.pDescription}>{detail.description}</p>
                            </div>
                        </div>
                        
                        
                    </div>
                    : <Loading/>
                }
                             

            </div>
        )
    }
    
}
    
export const mapDispatchToProps = {
        getGameDetail,
        cleanDetail
}

export const mapStateToProps = state => ({
    detail: state.detail,
    complete : false
});
    
export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
    
   
