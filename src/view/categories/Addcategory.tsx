import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Addcategory = () => {
  const [item, setItem] = useState({
    categoryname: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const addCat = (e: FormEvent) => {
    e.preventDefault();
    async function addItem() {
      try {
        let result = await axios.post("http://localhost:4000/categories", item);
        console.log("result:", result);
        setMsg(result.data);
        setItem({
          categoryname: "",
          price: "",
        });
      } catch (err: any) {
        console.log(err);
        console.log("error:", err.response.data);
        setError(err.response.data);
      }
    }

    addItem();
  };

  const viewall = () => {
    navigate("/home/category/view");
  };

  return (
    <>
      <div>
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>

      <div className=" bg-white  border shadow rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className="h2 px-3 my-3 ">Add Category</h2>
          <button className="btn btn-secondary m-3" onClick={viewall}>
            View Category
          </button>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h6">
            <div>
              <label htmlFor="" className=" form-label">
                Category Name :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder="category Name"
                value={item.categoryname}
                onChange={(e) => {
                  setItem({ ...item, categoryname: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 h6 ">
            <label htmlFor="" className=" form-label text-bold">
              Price :
            </label>
            <div className="me-3">
              <input
                type="text"
                placeholder="Price"
                value={item.price}
                onChange={(e) => {
                  setItem({ ...item, price: e.target.value });
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>

          <div className="text-start  my-3 px-5">
            <button className="btn btn-primary mt-4 px-3 " onClick={addCat}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addcategory;
