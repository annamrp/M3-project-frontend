import React from "react";
import Popup from "reactjs-popup";

const HowToplay= () => (
  <Popup trigger={<img className="info-icon" src="/img/info.png" alt="info icon"/>} position="left top">
     {close => (
      <div className="popup">
        {/* <a href='#' className="close" onClick={close}>
          &times;
        </a> */}
        <div className="content" >
          <h3 className="pop-up-heading">How to play:</h3>
          <p>Just think of an action that a player will have to get his victim to perform and thus be eliminated 
            (like let the Macarena sing ...).</p>
          <p>When the game starts, you will receive a target and a random mission that 
            you must complete. If successful, you will receive the target and the mission of your victim.</p>
          <p>Eliminate everyone from the game before they kill you!</p>

          <h3 className="pop-up-subheading">Good luck!</h3>
        
        </div>
     
      </div>
    )}
  </Popup>
);

export default HowToplay;