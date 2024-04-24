import React from 'react';
import { ColorRing } from 'react-loader-spinner';

interface LoaderProps {
  height: string;
  width:string;
}
const Loader:React.FC<LoaderProps> = ({height,width}) => {
  return (
    <ColorRing
      visible={true}
      height={height}
      width={width}
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#fcefef', '#FFFFFFFF', '#c9c4c4', '#fcefef', '#FFFFFFFF']}
    />
  );
};

export default Loader;