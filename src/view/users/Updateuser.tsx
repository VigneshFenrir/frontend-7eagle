import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const Updateuser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile: "",
  });
  const [error, setError] = useState();
  const [msg, setMsg] = useState();

  useEffect(() => {
    enroll();
  }, []);

  async function enroll() {
    try {
      let result = await axios.get("http://localhost:4000/login/signin/" + id);
      // console.log("result:", result);
      setUser(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  const updateuser = (e: FormEvent) => {
    e.preventDefault();
    console.log("update");
    update();

    // console.log(user)

    if (!error) {
      msg && navigate("/course/view");
    }
  };
  async function update() {
    try {
      let asser = await axios.put(
        "http://localhost:4000/login/signin/" + id,
        user
      );
      console.log(asser);
      setMsg(asser.data);
    } catch (error: any) {
      console.log(error);
      console.log("error:", error.response.data);
      setError(error.response.data);
    }
  }
  return (
    <>
      <div>
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>
      <div className=" bg-white  border border-secondary rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className=" h2  text-dark p-2 px-3">Update User</h2>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  // placeholder={user.name}
                  value={user.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
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
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
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
                  value={user.mobile}
                  onChange={(e) => {
                    setUser({ ...user, mobile: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input
                  type="password"
                  // placeholder="Password"
                  className="form-control"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
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
                  // placeholder="Repeat password"
                  className="form-control"
                  autoComplete="new-password"
                  value={user.confirm_password}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      confirm_password: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="text-start ms-5 my-3 px-5">
            <button className="btn btn-primary mt-4 px-2" onClick={updateuser}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Updateuser;
