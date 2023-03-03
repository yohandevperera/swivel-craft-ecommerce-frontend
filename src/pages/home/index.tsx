import Header from "../../components/atoms/header";
import PageHelmet from "../../components/atoms/helmet";
import EmployeeDataView from "../../components/templates/employees-data-view";

const Home: React.FC = () => (
  <>
    <PageHelmet />
    <Header title="Employee Manager" />
    <EmployeeDataView />
  </>
);

export default Home;
