import './Post.css';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {images} from '../../images';
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from 'axios';


var user = "구리"
var title = "주방 청소 유용한 정보 공유합니다."
var content = "오늘은 주방 청소할 때 유용한 정보를 공유할거에요."
var reg_date = "2022-04-13 21:23:17"
var view = "1000"
var like = 500

async function getPost() {
	return fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/docPost.json')
	.then(response => { return response.json();})
	.then(response => { 
                      var obj = response;
                      console.log(obj);

                      user = obj[0].nick_name;
                      title = obj[0].title;
                      content = obj[0].content;
                      reg_date = obj[0].reg_date;
                      view = obj[0].view;
                      like = obj[0].like;
                      
                    });
}

async function requestPost(id){
  axios.post("http://holo.dothome.co.kr/findDocPost.php", JSON.stringify({postid: id}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(function(body) {
        console.log(body);
      })
      .catch(function(error) {
        console.log(error);
      });
}

function increaseHeart(id){
  var temp = Number(like);
  temp = temp + 1;
  like = temp.toString();

  axios.post("http://holo.dothome.co.kr/likeDoc.php", JSON.stringify({id: id, user: user}),{
    withCredentials: false,
    headers: {"Content-Type": "application/json"}
  })
    .then(function(body) {
      console.log(body);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function decreaseHeart(id){
  if(like > 0){
    var temp = Number(like);
    temp = temp - 1;
    like = temp.toString();
  }

  axios.post("http://holo.dothome.co.kr/likeDocCancel.php", JSON.stringify({id: id, user: user}),{
    withCredentials: false,
    headers: {"Content-Type": "application/json"}
  })
    .then(function(body) {
      console.log(body);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function Post() {
  const {id} = useParams();
  const [heart, setHeart] = useState(false);

  //console.log(id);
  requestPost(id);

  getPost();

  return (
    <div>
      <div className="postHeaderBar">
        <div>생활백서</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postUser"><img src={images.user} alt="User"/>{user}</div>
      <div className="postRegDate">{reg_date}</div>
      <div className="postContent">
        {content}
        <div className="postEtc">
            <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
            {heart
              ? <AiFillHeart className="heartIcon red" onClick={() => { setHeart(false); decreaseHeart(id);}}/>
              : <AiOutlineHeart className="heartIcon" onClick={() => { setHeart(true); increaseHeart(id); }}/>
            }
            {like}
        </div>
      </div>
    </div>
  );
}

export default Post;