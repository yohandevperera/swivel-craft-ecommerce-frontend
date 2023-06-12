import { Route, Routes } from "react-router-dom";
import Home from "../../../pages/home";
import UserManagement from "../../../pages/user-management";
import CraftManagement from "../../../pages/crafts-management";
import CraftCategoryManagement from "../../../pages/craft-category-management";
import LoginAndSignUp from "../../../pages/login-and-signup";
import Checkout from "../../../pages/checkout";
import OrderManagement from "../../../pages/order-management";
import _ from "lodash";
import ValidateRoutes from "../../atoms/route-validator";
import AdminHomepage from "../../../pages/admin-home";

/**
 * Usage - This component is used as a wrapper to wrap all the routes that are used in the frontend.
 *
 * Description - The component is build based on the react-router-dom
 
 */

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <>
          <Route
            path="/admin"
            element={
              <ValidateRoutes type="admin-route">
                <AdminHomepage />
              </ValidateRoutes>
            }
          />
          <Route
            path="/admin/user-management"
            element={
              <ValidateRoutes type="admin-route">
                <UserManagement />
              </ValidateRoutes>
            }
          />
          <Route
            path="/admin/craft-management/"
            element={
              <ValidateRoutes type="admin-route">
                <CraftManagement />
              </ValidateRoutes>
            }
          />
          <Route
            path="/admin/craft-category-management/"
            element={
              <ValidateRoutes type="admin-route">
                <CraftCategoryManagement />
              </ValidateRoutes>
            }
          />
          <Route
            path="admin/order-management/"
            element={
              <ValidateRoutes type="admin-route">
                <OrderManagement />
              </ValidateRoutes>
            }
          />
          <Route path="/login" element={<LoginAndSignUp />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/checkout"
            element={
              <ValidateRoutes type="user-route">
                <Checkout />
              </ValidateRoutes>
            }
          />
        </>
      </Routes>
    </>
  );
};

export default AppRoutes;
