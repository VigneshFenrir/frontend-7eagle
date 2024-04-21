import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Addproducts = () => {
  const [item, setItem] = useState({
    name: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [cat, setCat] = useState<HTMLSelectElement[]>([]);
  // console.log(cat);

  useEffect(() => {
    categoriesAdd();
  }, []);

  async function categoriesAdd() {
    try {
      const categories = await axios.get("http://localhost:4000/categories");
      console.log(categories);
      setCat(categories.data);
    } catch (err: any) {
      console.log(err);
    }
  }

  const addProd = (e: FormEvent) => {
    e.preventDefault();
    async function addItem() {
      try {
        let result = await axios.post("http://localhost:4000/products", item);
        console.log("result:", result);
        setMsg(result.data);
        setItem({
          name: "",
          category: "",
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
    navigate("/home/products/view");
  };

  return (
    <>
      <div>
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>

      <div className=" bg-white  border shadow rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className="h2 px-3 my-3 ">Add Product</h2>
          <button className="btn btn-secondary m-3" onClick={viewall}>
            View Products
          </button>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h6">
            <div>
              <label htmlFor="" className=" form-label">
                Name :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder=" Name"
                value={item.name}
                onChange={(e) => {
                  setItem({ ...item, name: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 h6 ">
            <label htmlFor="" className=" form-label text-bold">
              Category :
            </label>
            <div className="me-3">
              <select
                name="coursename"
                id=""
                className="form-select mx-3  "
                onChange={(e) => {
                  setItem({ ...item, category: e.target.value });
                }}
              >
                <option value="">category</option>
                {cat.map((categories: any) => (
                  <option key={categories._id} value={categories._id}>
                    {categories.categoryname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-start  my-3 px-5">
            <button className="btn btn-primary mt-4 px-3 " onClick={addProd}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addproducts;
