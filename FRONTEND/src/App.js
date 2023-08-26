import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Pagenotfound } from "./pages/Pagenotfound";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import { Dashboard } from "./pages/user/Dashboard";
import PrivateRoute from "./component/Route/Private";
import { Forgotpassword } from "./pages/Auth/Forgotpassword";
import { Admindashboard } from "./pages/Admin/Admindashboard";
import Adminroute from "./component/Route/Adminroute";
import { CreateCategory } from "./pages/Admin/CreateCategory";
import { CreateProduct } from "./pages/Admin/CreateProduct";
import { User } from "./pages/Admin/User";
import { Profile } from "./pages/user/Profile";
import { Order } from "./pages/user/Order";
import { ProductsList } from "./pages/Admin/ProductsList";
import { Updateproduct } from "./pages/Admin/Updateproduct";
import { SearchResult } from "./pages/SearchResult";
import { Productdetail } from "./component/Productdetail";
import { CategoryProduct } from "./pages/CategoryProduct";
import { CartPage } from "./pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<Productdetail />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Order />} />
        </Route>

        <Route path="/dashboard" element={<Adminroute />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route
            path="admin/update-product/:slug"
            element={<Updateproduct />}
          />
          <Route path="admin/product-list" element={<ProductsList />} />
          <Route path="admin/users" element={<User />} />
        </Route>

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
