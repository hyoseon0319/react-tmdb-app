import React, {useEffect, useState} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from '../MovieDetail/Sections/MovieInfo'
import GridCards from '../commons/GridCards';
import Favorite from '../MovieDetail/Sections/Favorite'
import { Row } from "antd";

function MovieDetail(props) {
    console.log('props--', props)
    console.log('props.match--', props.match.params)
    //movie 아이디를 가져온다.
    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        console.log(props.match)
        console.log('없지롱',localStorage.getItem('userId'))
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}` 
        
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('cast 정보 내놔======',response.cast)
                setCasts(response.cast)
            })

    }, []);

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    };
    
    return (
        <div>
            {/* Header */}
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} //영화이미지
                title={Movie.original_title} //영화타이틀
                text={Movie.overview} //영화소개 
            />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* Movie Info */}
                <MovieInfo
                    movie={Movie}
                />
                <br />

                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

            {
                ActorToggle &&
                <Row gutter={[16,16]} >
                    {Casts && 
                        Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={
                                        cast.profile_path 
                                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                                        : 'https://cdn.icon-icons.com/icons2/1893/PNG/512/scientistavatar_120780.png'
                                    }
                                    characterName={cast.name}
                                    personId={cast.id}
                                />
                            </React.Fragment>
                    ))}
                </Row>
            }
            </div>
        </div>
    )
}

export default MovieDetail
