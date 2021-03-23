import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {


    const [Video, setVideo] = useState([]);//배열형

    useEffect(() => {
        let subscriptionVariables = {
            userFrom : localStorage.getItem('userId')
        }


        Axios.post('/api/video/getSubscriptionVideos', subscriptionVariables )
        .then(response => {
            if(response.data.success){
                console.log(response.data);
                setVideo(response.data.videos);
            }else{
                alert("비디오 가져오기를 실패 했습니다.")
            }
        })
    },[]);

    const renderCards = Video.map((video,index) => {
        // console.log("video",video.writer.image)

        var minutes = Math.floor(video.duration/60);
        var seconds = Math.floor((video.duration - minutes*60));

        return <Col lg={6} md = {8} xs={24} key={video._id}>
                <a href={`/video/${video._id}`}>
                    <div style={{position:'relative'}}>
                        <img style={{width:'100%'}} 
                            src={`http://localhost:5000/${video.thumbnail}`}  
                            alt="thumbnail"/>
                            <div
                            className="duration"
                            style={{
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                margin: '4px',
                                color: '#fff',
                                backgroundColor: 'rgba(17, 17, 17, 0.8)',
                                opacity: 0.8,
                                padding: '2px 4px',
                                borderRadius: '2px',
                                letterSpacing: '0.5px',
                                fontSize: '12px',
                                fontWeight: '500',
                                lineHeight: '12px',
                            }}
                            >
                            <span>{minutes}:{seconds}</span>
                        </div>
                    </div>
                </a>
            <br/>
            <Meta 
                avatar={  <Avatar src={video.writer.image} /> }
                title ={video.title}
            />
            <span>
                {video.writer.name}
            </span>
            <br/>
            <span style={{ marginLeft:'3rem' }}>{ video.views }views</span> -
            <span>{moment(video.createdAt).format("MMM Do YY")}</span>
            </Col>
    })
    
    return (
        <div style = {{ width : '85%', margin : "3rem auto" }}>
            <Title level={2} > Subscription Videos </Title>
            <hr/>
            {/* <Row gutter ={[32,16]}>
               {Video.length > 0 ? renderCards : <div>...Loading</div>} 
            </Row> */}
            <Row gutter={16}>
            {renderCards}
            </Row>
         </div>
    )
}

export default SubscriptionPage
