import ReactModal from "react-modal";
import { useState } from "react";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);

  function handleModal(){
    setShowModal((p) => !p);
  }

  return (
    <div className="footer">
      <p>Copyright 2023 - John Ipson</p>
      <p className="contact-button" onClick={handleModal}>Contact</p>
      {/* <NavLink activeClassName="active-link" to="/contact">Contact</NavLink> */}

      <ReactModal 
        isOpen={showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={handleModal}
        className="contact-modal"
        overlayClassName="Overlay"
      >
        <form>
          <div className="input-wrapper">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="input-wrapper">
            <label htmlFor="email">Email Address: </label>
            <input type="email" name="email" id="email" />
          </div>
          
          <div className="input-wrapper">
            <label htmlFor="message">Message: </label>
            <textarea name="message" id="message" rows="10" cols="60"/>
          </div>

          <div className="buttons-wrapper">
            <button onClick={handleModal}>Submit</button>
            <button className="cancel-button" onClick={handleModal}>Cancel</button>

          </div>
        </form>
      </ReactModal>

    </div>
  );
}
