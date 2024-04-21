import { GiHamburgerMenu } from "react-icons/gi";
import "./nav.css";
import Sidebar from "../sidebar/Sidebar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

const nav = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div
          className="me-5"
          onClick={() => {
            setClick(!click);
          }}
        >
          {click && <GiHamburgerMenu size={30} />}
          {!click && <MdCancel size={30} />}
        </div>

        <a className="navbar-brand" href="#">
          7Eagle
        </a>

        <div
          className="collapse navbar-collapse justify-content-center "
          id="navbarNav"
        >
          <ul className="navbar-nav  rounded-5 ">
            <li className="nav-item active ">
              <Link className="nav-link " to={"/home"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/home/user/view"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/home/products/view"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/home/category/view"} className="nav-link">
                {" "}
                Category
              </Link>
            </li>
          </ul>
        </div>
        <div className="back ">
          <button className="btn btn-secondary">
            <Link
              to={".."}
              className="btn btn-secondary rounded"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              back
            </Link>
          </button>
        </div>
      </nav>

      <div className="row data">
        <div className="col-2">
          <Sidebar click={click} />
        </div>
        <div className={`${click ? "" : "col-10"} `}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default nav;
