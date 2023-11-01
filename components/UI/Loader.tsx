import React from "react";
import "./../../assets/Loader.css";

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => (
  <div className={`loader ${className}`}></div>
);

export default Loader;
