import React from "react";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

// user
const Adduser = React.lazy(() => import("./view/users/Adduser"));
const Viewusers = React.lazy(() => import("./view/users/Viewusers"));
const Updateuser = React.lazy(() => import("./view/users/Updateuser"));

// products
const Addproducts = React.lazy(() => import("./view/products/Addproducts"));
const Viewproducts = React.lazy(() => import("./view/products/Viewproducts"));
const Updateproducts = React.lazy(
  () => import("./view/products/Updateproducts")
);

//category

const Addcategory = React.lazy(() => import("./view/categories/Addcategory"));
const Viewcategory = React.lazy(() => import("./view/categories/Viewcategory"));
const Updatecategory = React.lazy(
  () => import("./view/categories/Updatecategory")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/user/add", name: "Add user", element: Adduser },
  { path: "/user/view", name: "View user", element: Viewusers },
  { path: "/user/update/:id", name: "Update user", element: Updateuser },
  { path: "/category/view", name: "View category", element: Viewcategory },
  { path: "/category/add", name: "Add category", element: Addcategory },
  {
    path: "/category/update/:id",
    name: "Update category",
    element: Updatecategory,
  },
  { path: "/products/add", name: "Add product", element: Addproducts },
  { path: "/products/view", name: "View products", element: Viewproducts },
  {
    path: "/products/update/:id",
    name: "Update product",
    element: Updateproducts,
  },
];

export default routes;
