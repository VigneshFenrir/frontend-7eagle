import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registeruser = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const reg = (e: FormEvent) => {
    e.preventDefault();

    async function regis() {
      try {
        console.log("reg");
        console.log(register);
        let result = await axios.post(
          "http://localhost:4000/login/signin",
          register
        );
        console.log("result:", result);
        if (register.password !== register.confirm_password) {
          setError("Password Doesn't Match");
          return;
        }
        navigate("/home");
        setMsg(result.data);
      } catch (err: any) {
        console.log(err);
        console.log("error:", err.response.data);
        setError(err.response.data);
        console.log(err.response.data.message);
      }
    }

    regis();
  };
  return (
    <>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <div className="container ">
          <div className="row justify-content-center ">
            <div className="col-8 border p-5">
              <form action="" className="">
                <div className="text-center">
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name"
                      value={register.name}
                      onChange={(e) => {
                        setRegister({ ...register, name: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={register.email}
                      onChange={(e) => {
                        setRegister({ ...register, email: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Phone</label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      placeholder="Phone Number"
                      className="form-control"
                      value={register.mobile}
                      onChange={(e) => {
                        setRegister({ ...register, mobile: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      autoComplete="new-password"
                      value={register.password}
                      onChange={(e) => {
                        setRegister({ ...register, password: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Confirm Password
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      placeholder="Repeat password"
                      className="form-control"
                      autoComplete="new-password"
                      value={register.confirm_password}
                      onChange={(e) => {
                        setRegister({
                          ...register,
                          confirm_password: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div>
                  {msg && <p className="text-success">{msg}</p>}
                  {!msg && <p className="text-danger">{error}</p>}
                </div>
                <div className="text-center">
                  <button className="btn btn-success" onClick={reg}>
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registeruser;
