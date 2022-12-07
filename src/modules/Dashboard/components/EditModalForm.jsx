import React from "react";
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
const EditModalForm = ({
  modal,
  toggle,
  data,
  setData,
  categories,
  onSubmit,
  discount,
  setDiscount,
}) => {
  const getCategory = (id) => {
    let temp = {};
    temp = categories.find((element) => element.id == id);
    return temp;
  };
  const handleData = (e) => {
    const { name, value, checked } = e.target;
    if (name === "price") {
      setData({ ...data, [name]: Number(value) });
      return;
    }
    if (name === "isOffSale") {
      setDiscount({ ...discount, [name]: checked });
      return;
    }
    if (name === "percent") {
      setDiscount({ ...discount, [name]: value });
      return;
    }
    if (name === "category") {
      setData({ ...data, [name]: getCategory(value) });
      return;
    }
    setData({ ...data, [name]: value });
  };
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Editar Producto</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={data?.name}
                className="form-control"
                onChange={(e) => handleData(e)}
              />
            </div>
          </div>
          <div className="row g-2 mb-3">
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
                type="number"
                name="price"
                value={data?.price}
                className="form-control"
                onChange={(e) => handleData(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <input
                type="checkbox"
                name="isOffSale"
                checked={discount?.isOffSale}
                className="form-check-input me-1"
                onChange={(e) => handleData(e)}
              />
              <label htmlFor="nameBasic" className="form-check-label">
                Aplicar promocion de descuento
              </label>
            </div>
          </div>
          {discount && discount.isOffSale ? (
            <div className="row">
              <div className="col">
                <label htmlFor="nameBasic" className="form-label">
                  % Descuento
                </label>
                <input
                  type="number"
                  name="percent"
                  value={discount?.percent}
                  className="form-control"
                  onChange={(e) => handleData(e)}
                />
              </div>
            </div>
          ) : null}
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
    </>
  );
};

export default EditModalForm;
