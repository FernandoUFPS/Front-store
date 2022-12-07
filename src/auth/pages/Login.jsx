import React, { useContext, useState } from "react";
import "../../assets/theme-default.css";
import "../../assets/demo.css";
import "../../assets/page-auth.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Verification from "./Verification";
export const Login = () => {
  const { isLogged, isCreated, isVerify, signUp, login, verify } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [dataVerify, setDataVerify] = useState({
    email: "",
    code: "",
  });
  const [modal, setModal] = useState(false);

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const onSignUp = async () => {
    await signUp(data);
    if (isCreated) {
      setDataVerify({ ...dataVerify, email: data.email });
      setModal(true);
    }
  };
  const onSignIn = async () => {
    await login(data);
    if (isLogged) {
      navigate("/dashboard", { replace: true });
    }
  };
  const onVerify = async () => {
    await verify(dataVerify);
    if (isVerify) {
      navigate("/dashboard", { replace: true });
    }
  };
  return (
    <>
      <div className="container-xxl">
        {modal ? (
          <Verification
            modal={modal}
            data={dataVerify}
            setData={setDataVerify}
            onSubmit={onVerify}
          />
        ) : null}
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <form className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      onChange={(e) => handleData(e)}
                      placeholder="Correo electronico"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="password">
                        Contraseña
                      </label>

                      <small role={"button"} style={{ color: "#696cff" }}>
                        Forgot Password?
                      </small>
                    </div>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={(e) => handleData(e)}
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="bx bx-hide"></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember-me"
                      />
                      <label className="form-check-label" htmlFor="remember-me">
                        Recuerdame
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary d-grid w-100"
                      type="button"
                      onClick={() => onSignIn()}
                    >
                      Iniciar sesion
                    </button>
                  </div>
                </form>

                <p className="text-center">
                  <span>No tienes cuenta? </span>

                  <span
                    role={"button"}
                    style={{ color: "#696cff" }}
                    onClick={() => onSignUp()}
                  >
                    Registrate
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
