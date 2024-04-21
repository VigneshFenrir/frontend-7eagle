import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const Updatecategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [item, setItem] = useState({
    categoryname: "",
    price: "",
  });
  const [error, setError] = useState();
  const [msg, setMsg] = useState();

  useEffect(() => {
    enroll();
  }, []);

  async function enroll() {
    try {
      let result = await axios.get("http://localhost:4000/categories/" + id);
      console.log("result:", result);
      setItem(result.data);
      console.log(item);
    } catch (err) {
      console.log(err);
    }
  }

  const updatecategory = (e: FormEvent) => {
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
        "http://localhost:4000/categories/" + id,
        item
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
                  placeholder={item.categoryname}
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
                  placeholder={item.price}
                  value={item.price}
                  onChange={(e) => {
                    setItem({ ...item, price: e.target.value });
                  }}
                  className="form-control ms-4 "
                />
              </div>
            </div>
          </div>

          <div className="text-start ms-5 my-3 px-5">
            <button
              className="btn btn-primary mt-4 px-2"
              onClick={updatecategory}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Updatecategory;
