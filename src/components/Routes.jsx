import { useRoutes } from "react-router-dom";
import AllProducts from "../pages/AllProducts";
import SingleProduct from "../pages/SingleProduct";
import AllUsersCarts from "../pages/AllUsersCarts";

export default function Routes() {

  let element = useRoutes([
    {
      path: "products",
      element: <AllProducts />
    },
    {
      path: ":id",
      element: <SingleProduct />
    },

    { path: "carts",
      element: <AllUsersCarts />
    },

    { path: "*", 
      element: <AllProducts />
    },
  ]);

  return element;
}