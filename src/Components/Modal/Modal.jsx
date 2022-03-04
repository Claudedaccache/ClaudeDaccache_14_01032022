import React from "react";
import styles from "../Modal/Modal.module.css";

function Modal({closeModal, modalText}) {
  return (
    <div className={styles.ModalBody}>
      <div className={styles.modalContainer}>
        <h5 className={styles.modalText}>{modalText}</h5>
          <button  className={styles.closeIcon} onClick={()=> closeModal(false) }> X </button>
      </div>
    </div>
  );
}

export default Modal;
