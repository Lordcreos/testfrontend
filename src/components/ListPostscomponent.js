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
  const [hashtags, setHashtags] = useState([])
  const [loading, setLoading] = useState(false);
  const [perfilVisible, setPerfilVisible] = useState(false);
  const [perfilId, setPerfilId] = useState("");
  const [perfil, setPerfil] = useState([])
  const [comentVisible, setcomentVisible] = useState(false);
  const [comentId, setcomentId] = useState("");
  const [hashtagVisible, sethashtagVisible] = useState(false);
  const [hashtagId, sethashtagId] = useState("");
  const [likesVisible, setlikesVisible] = useState(false);
  const [likesId, setlikesId] = useState("");

  const showPerfil = (id) => {
    setPerfilId(id)
    setPerfilVisible(true)
    fetchDummyData(`user/${id}`,setLoading, setPerfil);
  }
  const showComents = async (id) => {
    setcomentId(id);
    setcomentVisible(true);
    fetchDummyData(`post/${id}/comment`,setLoading,setComments);
  }

  const showHashtags = (id) => {
    sethashtagId(id)
    sethashtagVisible(true)
    fetchDummyData(`post/${id}/comment`,setLoading,setHashtags);
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
    setComments([]);
  };


  useEffect(() => {
    fetchDummyData(`post?page=${1}&limit=${10}`, setLoading, setPosts);
  }, [])

  return (
    <>
     
      <Modal title="Perfil" visible={perfilVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...{(perfilId)}</p>
        

      </Modal>
      <Modal title="coment" visible={comentVisible} onOk={handleOk} onCancel={handleCancel}>
        <Row >
        {comments.map((comment) => 
          <Col flex="1 1 20px " key={comment.id}>
            <Card style={{ width: 300 }}>
              <Meta
                avatar={<Avatar src={comment.owner.picture} />}
                title={`${comment.publishDate} `}
                description={comment.message}
                onClick={()=>{showComents(comment.id)}}/>
            </Card>
          </Col>
        ) }
        
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
                <CommentOutlined key="comments" onClick={()=>{showComents(post.id)}} />,
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