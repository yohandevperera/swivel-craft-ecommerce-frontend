import AppRoutes from "./components/organisms/app-routes";
import { ToastContainer } from "react-toastify";
import * as Sentry from "@sentry/react";

/**
 * Description & Usage - This component will directly call the custom component
 * AppRoutes and ToastContainer for notifcations.
 *
 */
const App: React.FC = () => (
  <>
    <ToastContainer />
    <AppRoutes />
  </>
);

export default Sentry.withProfiler(App);
