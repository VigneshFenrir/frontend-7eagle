import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  const savepost = (e: FormEvent) => {
    e.preventDefault();
    async function post() {
      console.log(login);
      try {
        let result = await axios.post("http://localhost:4000/login", login);
        console.log("result:", result);
        navigate("/home");

        setMsg(result.data);
      } catch (error: any) {
        console.log(error);

        setError(error.response.data);

        setLogin({
          email: "",
          password: "",
        });
      }
    }

    post();
  };

  const forgetpassword = () => {
    navigate("/forgetpassword");
  };
  const register = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="container bg-info w-50 my-5 p-3 rounded shadow">
        <h1 className="text-center  my-3">Login</h1>
        <form action="" onSubmit={savepost} className="">
          <div className="row flex-column align-items-center">
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary">
                E-mail
              </label>
              <input
                type="mail"
                className="form-control"
                value={login.email}
                onChange={(e) => {
                  setLogin({ ...login, email: e.target.value });
                }}
              />
            </div>
            <div className="form-group col-5">
              <label
                htmlFor=""
                className="form-label text-secondary text-bold "
              >
                Password
              </label>
              <input
                type="password"
                className="form-control "
                value={login.password}
                onChange={(e) => {
                  setLogin({ ...login, password: e.target.value });
                }}
              />
            </div>
            <div className="text-center">
              {msg && <p className="text-success">{msg}</p>}
              {!msg && <p className="text-danger">{error}</p>}
            </div>
            <div className="text-center">
              <button className="btn btn-primary">submit</button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="text-end ">
            <button className="btn text-primary border me-4" onClick={register}>
              SignIn
            </button>
            <button
              className="btn text-danger border "
              onClick={forgetpassword}
            >
              forgetpassword ?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
