import AppRoutes from "./components/organisms/app-routes";
import { ToastContainer } from "react-toastify";
import * as Sentry from "@sentry/react";

const App: React.FC = () => (
  <>
    <ToastContainer />
    <AppRoutes />
  </>
);

export default Sentry.withProfiler(App);
