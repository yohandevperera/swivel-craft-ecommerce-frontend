import { Route, Routes } from "react-router-dom";
import Home from "../../../pages/home";
import UserManagement from "../../../pages/user-management";
import CraftManagement from "../../../pages/crafts-management";
import CraftCategoryManagement from "../../../pages/craft-category-management";
import LoginAndSignUp from "../../../pages/login-and-signup";
import Checkout from "../../../pages/checkout";

/**
 * Usage - This component is used as a wrapper to wrap all the routes that are used in the frontend.
 *
 * Description - The component is build based on the react-router-dom
 
 */

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/craft-management/" element={<CraftManagement />} />
        <Route path="/login" element={<LoginAndSignUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/admin/craft-category-management/"
          element={<CraftCategoryManagement />}
        />
        <Route />
      </Routes>
    </>
  );
};

export default AppRoutes;
