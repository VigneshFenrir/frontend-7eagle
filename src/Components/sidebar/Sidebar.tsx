import { Link } from "react-router-dom";
import "./Sidebar.css";

interface Props {
  click: boolean;
}

const Sidebar = ({ click }: Props) => {
  console.log(click);
  return (
    <>
      <div
        className={` container-fluid border sidebar  ${click ? "left" : ""}`}
      >
        <aside>
          <Link className="text-black " to={"/home"}>
            Dashboard
          </Link>
          <ul className="list-group list-group-flush dashaside">
            <li className="list-group-item ">
              <ul className="list-group list-group-flush ">
                <li className="list-group-item">
                  Products
                  <ul className="list-group list-group-flush hovering">
                    <li className="list-group-item ">
                      <Link to={"/home/products/view"}>View products</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to={"/home/products/add"}>Add products</Link>
                    </li>
                  </ul>
                </li>
                <li className="list-group-item ">
                  Category
                  <ul className="list-group list-group-flush hovering ">
                    <li className="list-group-item">
                      <Link to={"/home/category/view"}>View Category</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to={"/home/category/add"}>Add Category</Link>
                    </li>
                  </ul>
                </li>
                <li className="list-group-item">
                  User
                  <ul className="list-group list-group-flush hovering">
                    <li className="list-group-item">
                      <Link to={"/home/user/view"}>View User</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to={"/home/user/add"}>Add User</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
