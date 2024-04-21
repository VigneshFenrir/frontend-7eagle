import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import "react-bootstrap";
import Addproducts from "./view/products/Addproducts";
import Updateproducts from "./view/products/Updateproducts";
import Viewproducts from "./view/products/Viewproducts";
import Addcategory from "./view/categories/Addcategory";
import Viewcategory from "./view/categories/Viewcategory";
import Updatecategory from "./view/categories/Updatecategory";
import Adduser from "./view/users/Adduser";
import Viewusers from "./view/users/Viewusers";
import Updateuser from "./view/users/Updateuser";
import Registeruser from "./pages/Registeruser";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Registeruser />}></Route>

        <Route path="/forgetpassword" element={<ForgetPassword />}></Route>

        <Route path="/home" element={<Dashboard />}>
          <Route index path="" element={<WelcomePage />}></Route>
          <Route path="products">
            <Route path="add" element={<Addproducts />}></Route>
            <Route path="view" element={<Viewproducts />}></Route>
            <Route path="update/:id" element={<Updateproducts />}></Route>
          </Route>

          <Route path="category">
            <Route index path="add" element={<Addcategory />}></Route>
            <Route path="view" element={<Viewcategory />}></Route>
            <Route path="update/:id" element={<Updatecategory />}></Route>
          </Route>

          <Route path="user">
            <Route index path="add" element={<Adduser />}></Route>
            <Route path="view" element={<Viewusers />}></Route>
            <Route path="update/:id" element={<Updateuser />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
