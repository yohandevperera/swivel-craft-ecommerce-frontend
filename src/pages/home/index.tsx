import Header from "../../components/atoms/header";
import PageHelmet from "../../components/atoms/helmet";
import EmployeeDataView from "../../components/templates/employees-data-view";


/**
 * Usage - This component will directly call the PageHelmet, Header and EmployeeDataView components.
 *
 * Description - The component is build based on custom components
 *
 */

const Home: React.FC = () => (
  <>
    <PageHelmet />
    <Header title="Employee Manager" />
    <EmployeeDataView />
  </>
);

export default Home;
