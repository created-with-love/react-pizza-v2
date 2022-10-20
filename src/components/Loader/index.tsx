import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

interface ILoaderProps {
  loading?: boolean;
  size?: number;
  color?: string;
}

const Loader: React.FC<ILoaderProps> = props => {
  const {loading = true, size = 250, color = "#ffffff"} = props;
  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={size}
    />
  )
};

export default Loader;