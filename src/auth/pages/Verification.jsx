import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
const Verification = ({ modal, onSubmit, data, setData }) => {
  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <>
      <Modal isOpen={modal} centered={true}>
        <ModalHeader>Verificacion de 2 pasos</ModalHeader>
        <ModalBody>
          <p className="mb-4">
            Hemos enviado un codigo de 6 digitos a tu correo. Por favor
            ingresalo.
          </p>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Codigo
              </label>
              <input
                type="number"
                name="code"
                className="form-control"
                onChange={(e) => handleData(e)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSubmit()}
          >
            Verificar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Verification;
