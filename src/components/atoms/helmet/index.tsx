import { Helmet } from "react-helmet";


/**
 * Usage - This component can be used as a
 * global title for to display the page name in the tab of a browser.
 *
 * Description - The component is build based on the third party library react-helmet
 *
 */

const PageHelmet: React.FC = () => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Employee Manager</title>
    </Helmet>
  );
};

export default PageHelmet;
