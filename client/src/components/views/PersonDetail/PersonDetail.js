import React, {useEffect, useState} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MovieInfo from '../MovieDetail/Sections/MovieInfo'
import PersonInfo from '../PersonDetail/Section/PersonInfo'
import GridCards from '../commons/GridCards';
import { Row } from "antd";


function PersonDetail(props) {
    console.log(props)
    console.log(props.match)
    let personId = props.match.params.personId
    const [Persons, setPersons] = useState([])

    useEffect(() => {
        // console.log(props.match)

        let endpointPer = `${API_URL}person/${personId}?api_key=${API_KEY}`

        fetch(endpointPer)
        .then(response => response.json())
        .then(response => {
            console.log('person 정보',response)
            setPersons(response)
    
        })

    
}, []);





    return (
        <div>
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <PersonInfo
                        person={Persons}
                    />
                </div>
            </div>     
        </div>
    )
}

export default PersonDetail
