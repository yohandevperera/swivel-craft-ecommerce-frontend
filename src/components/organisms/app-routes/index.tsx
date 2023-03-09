import { Route, Routes } from "react-router-dom";
import Home from "../../../pages/home";
import EmployeeForm from "../../../pages/employee-form-page";

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
        <Route path="/employee-add" element={<EmployeeForm type="add" />} />
        <Route
          path="/employee-edit/:id"
          element={<EmployeeForm type="edit" />}
        />
        <Route />
      </Routes>
    </>
  );
};

export default AppRoutes;
