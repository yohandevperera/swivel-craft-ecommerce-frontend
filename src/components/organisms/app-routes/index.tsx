import { Route, Routes } from "react-router-dom";
import Home from "../../../pages/home";

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
        <Route />
      </Routes>
    </>
  );
};

export default AppRoutes;
