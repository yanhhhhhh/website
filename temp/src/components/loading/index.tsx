import { Spin } from 'antd';

const MyLoadingComponent = ({
  isLoading,
  error,
}: {
  isLoading: boolean;
  error?: any;
}) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <div>
        <Spin fullscreen={true} />
      </div>
    );
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};
export default MyLoadingComponent;
