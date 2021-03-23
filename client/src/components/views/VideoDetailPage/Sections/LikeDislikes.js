import React, { useEffect, useState } from 'react'
import {Tooltip, Icon} from 'antd'
import Axios from 'axios'
function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);

    let variable={ };

    if(props.Video){//비디오에서 왓을때
        variable = {videoId :props.videoId, userId : props.userId}
    }else{//댓글에서 왔을때
        variable = {commentId :props.commentId, userId : props.userId}
    }

    useEffect(() => {
        //좋아요 정보
        Axios.post('/api/like/getLikes',variable)
        .then(response=>{
            if(response.data.success){
                //  1. 좋아요 숫자
                setLikes(response.data.likes.length) //좋아요 갯수
                //  2. 내가 좋아요 눌렀는지 안눌렀는지
                response.data.likes.map(like=>{
                    if(like.userId === props.userId){
                        setLikeAction('liked');
                    }
                })
            }else{
                alert('Like에 정보를 가져오지 못했습니다.')
            }
        })
        //싫어요 정보
        Axios.post('/api/like/getDislikes',variable)
        .then(response=>{
            if(response.data.success){
                //  1. 싫어요 숫자
                setDislikes(response.data.dislikes.length) 
                //  2. 내가 싫어요 눌렀는지 안눌렀는지
                response.data.dislikes.map(dislike=>{
                    if(dislike.userId === props.userId){
                        setDislikeAction('disliked');
                    }
                })
            }else{
                alert('disLike에 정보를 가져오지 못했습니다.')
            }
        })


    }, [Likes,Dislikes])

    const onLikeHandler =()=>{

        if(LikeAction===null){ //좋아요가 눌러져 있지 않는 경우
            Axios.post("/api/like/upLike",variable)
            .then(response=>{
                if(response.data.success){
                    setLikes(Likes+1);
                    setLikeAction('liked');

                    if(DislikeAction !==null){ //싫어요가 눌러져 있는 경우
                        //싫어요 삭제
                        setDislikeAction(null);
                        setDislikes(Dislikes-1);
                    }
                }else{
                    alert("좋아요 이벤트가 정상적이지 않습니다.")
                }
            })
        }else{
            Axios.post("/api/like/unLike",variable)
            .then(response=>{
                if(response.data.success){
                    setLikes(Likes-1);
                    setLikeAction(null)
                }else{
                    alert("이벤트가 정상적이지 않습니다.")
                }
            })
        }
    }

    const onDislikeHandler=()=>{ 
        if(DislikeAction !== null){
            Axios.post('/api/like/unDislike',variable)
            .then(response=>{
                if(response.data.success){
                        setDislikes(Dislikes-1);
                        setDislikeAction(null)
                }else{
                    alert("싫어요 이벤트가 정상적이지 않습니다.")
                }
             })
        }else{
            Axios.post("/api/like/upDisLike",variable)
            .then(response=>{
                if(response.data.success){
                    setDislikes(Dislikes+1);
                    setDislikeAction(null);
                    if(LikeAction !==null){
                        setLikeAction(null);
                        setLikes(Likes-1);
                    }
                }else{
                    alert("이벤트가 정상적이지 않습니다.")
                }
            })
        }
    }

    return (
        <div>
            <span >
                <Tooltip title="좋아요">
                    <Icon type="like"
                    theme={LikeAction ==='liked' ? "filled" : 'outlined'}
                    onClick={onLikeHandler}
                    />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}>{Likes}</span>
            </span>
            <span style={{paddingLeft:'2px', paddingRight:'2px'}}/>
            <span >
                <Tooltip title="싫어요">
                    <Icon type="dislike"
                    theme={DislikeAction ==='disliked' ? "filled" : 'outlined'}
                    onClick={onDislikeHandler}
                    />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}>{Dislikes}</span>
            </span>
            <span style={{paddingLeft:'2px', paddingRight:'2px'}}/>
        </div>
    )
}

export default LikeDislikes