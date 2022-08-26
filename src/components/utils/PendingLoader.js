import React from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;

const PendingLoader = () => {
  return (
    <div className="sweet-loading d-flex justify-content-center"
    >
        <span style={{height:"100vh", marginTop:'35vh' ,marginLeft:'-15vw'}} >
            <PacmanLoader color="#F5735A" loading={true}size={100} />
        </span>
    </div>
  );
}

export default PendingLoader;