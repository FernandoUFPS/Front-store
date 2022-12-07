import React, { useState } from "react";
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalForm = ({ data, setData, onSubmit, toggle, open, categories }) => {
  const getCategory = (id) => {
    let temp = {};
    temp = categories.find((element) => element.id == id);
    return temp;
  };
  const handleData = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setData({ ...data, [name]: getCategory(value) });
      return;
    }
    if (name === "price") {
      setData({ ...data, [name]: Number(value) });
      return;
    }
    setData({ ...data, [name]: value });
  };
  return (
    <div className="mt-3">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#basicModal"
        onClick={toggle}
      >
        Agregar
      </button>
      <Modal isOpen={open} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Agregar Producto</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => handleData(e)}
              />
            </div>
          </div>
          <div className="row g-2">
            <div className="col mb-0">
              <label htmlFor="emailBasic" className="form-label">
                Categoria
              </label>
              <Input
                type="select"
                name="category"
                value={data?.category?.id}
                className="form-control"
                onChange={(e) => handleData(e)}
              >
                <option value={0}>Seleccionar categoria</option>
                {categories && categories.length > 0
                  ? categories.map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    ))
                  : null}
              </Input>
            </div>
            <div className="col mb-0">
              <label htmlFor="dobBasic" className="form-label">
                Precio
              </label>
              <input
                type="text"
                name="price"
                className="form-control"
                onChange={(e) => handleData(e)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            onClick={toggle}
          >
            Cerrar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSubmit()}
          >
            Guardar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalForm;
