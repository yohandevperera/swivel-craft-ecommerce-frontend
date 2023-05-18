import Header from "../../components/atoms/header";
import PageHelmet from "../../components/atoms/helmet";
import UserManagement from "../user-management";

/**
 * Usage - This component will directly call the PageHelmet, Header and CraftDataView components.
 *
 * Description - The component is build based on custom components
 *
 */

const Home: React.FC = () => (
  <>
    <PageHelmet />
    <Header title="Craft Manager" />
    <UserManagement />
    {/* <CraftDataView /> */}
  </>
);

export default Home;
