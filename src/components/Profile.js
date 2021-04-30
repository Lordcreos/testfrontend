import React, { useState,useEffect } from 'react';
import { Modal, Button } from 'antd';

export const ProfileModal = (props) => {
  const { perfilVisible, setPerfilVisible } = props;  

  const showModal = () => {
    setPerfilVisible(true);
  };

  const handleOk = () => {
    setPerfilVisible(false);
  };

  const handleCancel = () => {
    setPerfilVisible(false);
  };

  useEffect(() => {
    console.log(perfilVisible,props.perfilId);
  }, [])

  return (
      <Modal title="Basic Modal" visible={perfilVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
  );
};