import React from "react";
import Popup from "reactjs-popup";

const HowToplay= () => (
  <Popup trigger={<img className="info-icon" src="img/info.png" alt="info icon"/>} position="left top">
     {close => (
      <div className="popup">
        {/* <a href='#' className="close" onClick={close}>
          &times;
        </a> */}
        <div className="content" >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
        
        </div>
     
      </div>
    )}
  </Popup>
);

export default HowToplay;