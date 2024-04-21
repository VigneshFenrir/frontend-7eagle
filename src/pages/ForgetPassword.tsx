import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [userid, setuserid] = useState();
  const [emailed, setEmailed] = useState();
  const navigate = useNavigate();

  const sendemail = async (e: FormEvent) => {
    e.preventDefault();
    console.log("err");
    try {
      let sendingmail = await axios.post(
        "http://localhost:4000/forgetpassword",
        user
      );
      if (sendingmail.data.success) {
        console.log("data success");
        setEmailed(sendingmail.data.email);
        setUser({ ...user, email: "" });
        setError("");
        setStep(2);
      }
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const verifyotp = async (e: FormEvent) => {
    e.preventDefault();
    console.log("verify");
    try {
      let sendotp = await axios.post(
        "http://localhost:4000/forgetpassword/verifyotp",
        user,
        emailed
      );
      if (sendotp.data.success) {
        console.log("dont send");
        setuserid(sendotp.data.userid);
        setUser({ ...user, email: "", otp: "" });
        setError("");
        setStep(3);
      }
      console.log(sendotp);
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  //   console.log(userid);
  const updatepassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let updatepass = await axios.put(
        "http://localhost:4000/forgetpassword/updatepassword/" + userid,
        user
      );
      console.log(updatepass);

      setUser({ ...user, email: "", otp: "" });
      navigate("/");
      setError(updatepass.data);
    } catch (err: any) {
      console.log(err);
      setError(err.response.data);
    }
  };
  const reverse = () => {
    navigate("/");
  };

  if (step === 1) {
    return (
      <div className="  vh-100 bg-body-tertiary text-center d-flex justify-content-center align-items-center backgroundimg">
        <div className=" w-50 py-5 d-flex flex-column bg-white border  rounded gradient ">
          <div className="arrow text-end">
            <FaArrowAltCircleLeft size={45} onClick={reverse} />
          </div>

          <h2 className="mb-3 py-3">Forget Password</h2>

          <form className=" text-center form-group " onSubmit={sendemail}>
            <div className="row justify-content-center">
              <div className="col-5">
                <input
                  className="form-control text-center "
                  type="email"
                  placeholder="Enter Your Mail Id"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            {error && <p className="text-danger mt-3">{error}</p>}
            <div className="row justify-content-center">
              <div className="col-5">
                <button className="btn btn-success form-submit my-4 text-white px-5">
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="  vh-100 bg-body-tertiary text-center d-flex justify-content-center align-items-center backgroundimg">
        <div className=" w-50 py-5 d-flex flex-column bg-white border  rounded gradient">
          <h2 className="pb-2">Verify OTP</h2>
          <form className=" text-center form-group " onSubmit={verifyotp}>
            <div className="row justify-content-center">
              <p className="h5 pb-2">
                Mail Sending :<span className="text-info"> {emailed}</span>
              </p>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control text-center "
                  placeholder="Enter Your OTP"
                  value={user.otp}
                  onChange={(e) => setUser({ ...user, otp: e.target.value })}
                />
              </div>
            </div>

            {error && <p className="text-danger mt-3">{error}</p>}
            <div className="row justify-content-center">
              <div className="col-5">
                <button className="btn btn-primary form-submit my-4 text-white px-5">
                  verify
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (step === 3) {
    return (
      <div className="  vh-100 bg-body-tertiary text-center d-flex justify-content-center align-items-center backgroundimg">
        <div
          className=" w-50 py-5 d-flex flex-column bg-white border gradient rounded"
          onSubmit={updatepassword}
        >
          <h2 className="mb-3 py-3">Reset Password</h2>
          <form className=" text-center form-group ">
            <div className="row justify-content-center">
              <div className="col-5">
                <input
                  type="password"
                  className="form-control  "
                  placeholder="Enter New Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className=" row justify-content-center pt-4">
              <div className="col-5">
                <input
                  type="password"
                  className="form-control  "
                  placeholder="Enter confirm Password"
                  value={user.confirm_password}
                  onChange={(e) =>
                    setUser({ ...user, confirm_password: e.target.value })
                  }
                />
              </div>
            </div>

            {error && <p className="text-danger mt-3">{error}</p>}
            <div className="row justify-content-center">
              <div className="col-5">
                <button className="btn btn-success form-submit my-4 text-white px-5">
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ForgetPassword;
