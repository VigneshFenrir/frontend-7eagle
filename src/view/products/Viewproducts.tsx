import axios from "axios";
import { useEffect, useState } from "react";
import { FaMessage, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

interface Prod {
  name: string;
  category: string;
  _id: string;
}

const Viewproducts = () => {
  const [user, setuser] = useState<Prod[]>([]);

  const [currentuser, setCurrentuser] = useState<Prod>();
  const [msg, setMsg] = useState();
  const [pageLinks, setPagelinks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [totalitem, setTotalitem] = useState("");
  const usersPerPage = 10;
  var pageRange = [];

  useEffect(() => {
    enroll(1);
    pagination();
  }, []);

  const pageLinkClick = (page: number) => {
    enroll(page);
  };
  async function enroll(page: number) {
    try {
      console.log(page);
      setCurrentPage(page);
      console.log(currentPage);
      let result = await axios.get(
        `http://localhost:4000/products?page=${page}`
      );
      console.log(result);
      setuser(result.data);
    } catch (err) {
      console.log(err);
    }
  }
  // let totalitems
  async function pagination() {
    try {
      let totalCount = await axios.get("http://localhost:4000/products/total");
      const totalitems = totalCount.data;
      setTotalitem(totalitems);

      let pgCount = Math.ceil(totalitems / usersPerPage);

      pageRange = [...Array(pgCount).keys()].map((i) => i + 1);

      setPagelinks(pageRange);
    } catch (err) {
      console.log(err);
    }
  }
  const handledelete = (user: Prod) => {
    setCurrentuser(user);

    deleteitem();
  };
  const deleteitem = async () => {
    let results = await axios.delete(
      "http://localhost:4000/products/" + currentuser
    );
    // console.log(results);
    console.log("result:", results.data);
    setMsg(results.data);
    enroll(1);
  };

  const adduser = () => {
    navigate("/home/products/add");
  };

  return (
    <>
      {msg && <p className="alert alert-success">{msg}</p>}
      <div className=" bg-white   rounded-4 ">
        <div className="d-flex  justify-content-between border-bottom">
          <h2 className=" h2 text-dark  p-2 px-3">
            Products <span className="h5 text-success">({totalitem})</span>
          </h2>
          <button className="btn m-3  btn-info" onClick={adduser}>
            Add Products
          </button>
        </div>
        <div className=" bg-light   ">
          <table className="table ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user: any) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.category.categoryname}</td>
                  <td>
                    <Link
                      to={`/home/products/update/${user._id}`}
                      className="text-warning d-inline h3 "
                    >
                      <FaMessage />
                    </Link>
                    <Link
                      className="text-danger d-inline ms-3 h3 "
                      onClick={() => handledelete(user._id)}
                      to={""}
                    >
                      <FaTrash />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination justify-content-center  ">
          {pageLinks.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`page-button m-1 px-2 ${
                currentPage === pageNumber ? "bg-dark" : ""
              } text-info  rounded-2`}
              onClick={() => pageLinkClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Viewproducts;
