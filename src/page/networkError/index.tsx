import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { message } from '@/providers';

const NetworkError: React.FC = () => {
  const navigate = useNavigate();
  function refresh() {
    if (navigator.onLine) {
      navigate('/');
    } else {
      message.error('Please check your network connection and try again.');
    }
  }
  return (
    <Result
      status="500"
      title="Network Error"
      subTitle="Sorry, there was a problem with the network."
      extra={
        <Button type="primary" onClick={refresh}>
          Refresh
        </Button>
      }
    />
  );
};

export default NetworkError;
