import Header from "../../components/atoms/header";
import PageHelmet from "../../components/atoms/helmet";
import CraftDataView from "../../components/templates/crafts-data-view";

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
    <CraftDataView />
  </>
);

export default Home;
