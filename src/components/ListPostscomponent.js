import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Divider, Button, Tooltip, Card, Avatar,Modal } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, CommentOutlined, NumberOutlined, HeartOutlined } from '@ant-design/icons';
import { fetchDummyData } from "../services/dummyapi"
import 'antd/dist/antd.css';
import {ProfileModal} from "./Profile"

const { Meta } = Card;

const styleButtons = {
  borderRadius: 5,

}

export const ListPostsComponent = (props) => {
  const { mode, clickLetter } = props;
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false);
  const [perfilVisible, setPerfilVisible] = useState(false);
  const [perfilId, setPerfilId] = useState("");
  const [comentVisible, setcomentVisible] = useState(false);
  const [comentId, setcomentId] = useState("");
  const [hashtagVisible, sethashtagVisible] = useState(false);
  const [hashtagId, sethashtagId] = useState("");
  const [likesVisible, setlikesVisible] = useState(false);
  const [likesId, setlikesId] = useState("");

  const LogPosts = () => {
    console.log(getComments);
  }

  const showPerfil = (id) => {
    setPerfilId(id)
    setPerfilVisible(true)
  }
  const showComents = (id) => {
    setcomentId(id)
    setcomentVisible(true)
    const getComments = (id) => {
      fetchDummyData(`/post/${id}/comment`)
        .then((res) => setComments(res?.data))
        .catch()
        .finally();
    };
    const handlemirar = (id) => {
       getComments(id);
      
    };
    
  }
  const showHashtags = (id) => {
    sethashtagId(id)
    sethashtagVisible(true)
  }
  const showLikes = (id) => {
    setlikesId(id)
    setlikesVisible(true)
  }



  

  const handleOk = () => {
    setPerfilVisible(false);
    setcomentVisible(false);
    sethashtagVisible(false);
    setlikesVisible(false);
  };

  const handleCancel = () => {
    setPerfilVisible(false);
    setcomentVisible(false);
    sethashtagVisible(false);
    setlikesVisible(false);
  };
  const getComments = (postId) => {
    fetchDummyData(`/post/${postId}/comment`)
      .then((res) => setComments(res?.data))
      .catch()
      .finally();
  };
  const handlemirar = (id) => {
     getComments(id);
    
  };
  useEffect(() => {
    fetchDummyData(`post?page=${1}&limit=${10}`, setLoading, setPosts)
    /* /user/{userId} */
  }, [])

  return (
    <>
     
      <Modal title="Perfil" visible={perfilVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...{(perfilId)}</p>
        

      </Modal>
      <Modal title="coment" visible={comentVisible} onOk={handleOk} onCancel={handleCancel} onmirar={handlemirar}>
        <p>Some contents...</p>
        <p>Some contentsaasdaasdasdsdasdasdaas...</p>
        <p>Some contents...{comentId}</p>
        <Row >
        {comments.map((comment) => 
          <Col flex="1 1 20px " key={comment.id}>
            <Card
              style={{ width: 300 }}
              
              
            >
              <Meta
                avatar={<Avatar src={comment.owner.owner} />}
                title={`${comment.owner.publishDate} `}
                description={comment.message}
                onClick={()=>{showComents(comment.owner.id)}}/>
            </Card>
          </Col>
        ) }: null
        
      </Row>
       
      
      </Modal>
      <Modal title="coment" visible={hashtagVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some hastags 1231232123123221...</p>
        <p>Some contents...{hashtagId}</p>

      </Modal>
      <Modal title="coment" visible={likesVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Likes</p>
        <p>Some contents...{likesId}</p>

      </Modal>
      <Divider>Posts</Divider>
      <Row >
       {posts ? posts.map((post) =>
          <Col flex="1 1 20px " key={post.id}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src={post.image}
                />
              }
              actions={[
                <CommentOutlined key="comments" onClick={()=>{showComents(post.owner.id)}} />,
                <NumberOutlined key="hashtag" onClick={()=>{showHashtags(post.owner.id)}}/>,
                <HeartOutlined key="likes" onClick={()=>{showLikes(post.owner.id)}}/>,
              ]}
            >
              <Meta
                avatar={<Avatar src={post.owner.picture} />}
                title={`${post.owner.firstName} ${post.owner.lastName}`}
                description={post.text}
                onClick={()=>{showPerfil(post.owner.id)}}/>
            </Card>
          </Col>
        ) : null
        }
      </Row>
    </>

  )
}