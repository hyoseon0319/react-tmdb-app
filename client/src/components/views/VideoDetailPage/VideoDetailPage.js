import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from "antd";
import Axios from 'axios';
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comments from './Sections/Comment';
// import LikeDislikes from './Sections/LikeDislikes';


function VideoDetailPage(props) {

    //Link 주소에 :videoId라고 적었기 때문에 가져올수 있음
    const videoId = props.match.params.videoId 
    const variable = { videoId: videoId }

    const [VideoDetail, setVideoDetail] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    useEffect(() => {
        
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success) {
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('비디오 정보를 가져오는데 실패했습니다.')
                }
            })

        Axios.post('/api/comment/getComments', variable)
        .then(response => {
                if (response.data.success) {
                    // console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('비디오 정보를 가져오는데 실패했습니다.')
                }
            })
    

    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }


    if(VideoDetail.writer) {
        // 포스트를 올린 사람과 접속자가 같으면 버튼 숨김
        console.log(VideoDetail)
        const subscribeButton = 
        VideoDetail.writer._id !== localStorage.getItem('userId') 
        && 
        <Subscribe userTo={VideoDetail.writer._id} userFrom ={localStorage.getItem('userId')}/>
    
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:'3rem 4rem'}}>
                        <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>

                        <List.Item 
                            actions={[<Subscribe userTo={VideoDetail.writer._id} />]}
                            // actions={[<LikeDislikes Video userId={localStorage.getItem('userId')} videoId ={videoId}/>,subscribeButton]}
                        >
                            <List.Item.Meta 
                                avatar = {<Avatar src={VideoDetail.writer.image}/>}
                                title = {VideoDetail.title}
                                description = {VideoDetail.description}
                            />
                            </List.Item>

                        {/* comments 댓글 */}
                        <Comments 
                            CommentLists={CommentLists} 
                            postId={VideoDetail._id} 
                            refreshFunction={updateComment} 
                        />
                        
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <div style = {{marginTop:'3rem'}}/>
                    <SideVideo/>
                </Col>
            </Row>
    ) 
    } else {
        return (
            <div>...Loading</div>
        )
    }
}

export default VideoDetailPage
