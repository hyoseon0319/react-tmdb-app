import React from 'react'
import { Col } from 'antd';
import "./GridCards.css"
 


function GridCards(props) {

    console.log('match--',props.match)
    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24} >
                <div style={{position: 'relative'}} >
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
    
                    </a>
                </div>
    
            </Col>
        )    
    } else {
        return (
            <Col lg={6} md={8} xs={24} >
                <div style={{position: 'relative'}} >
                    <a href={`/person/${props.personId}`}>
                        <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.characterName} />
                    </a>
                </div>
            </Col>
        )
    }
}

export default GridCards
