import { Helmet } from "react-helmet";

const PageHelmet: React.FC = () => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Employee Manager</title>
    </Helmet>
  );
};

export default PageHelmet;
