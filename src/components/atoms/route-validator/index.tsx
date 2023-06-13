import _ from "lodash";
import ErrorTemplate from "../../templates/error-tempate";


/**
 * Usage - This component can be used as a
 * global component to validate routes based on the localStorage userObject.
 *
 * Description - The component is build based HTML components and material ui components
 * 
 * @props children @typedef any
 * @props type @typedef "admin-route" | "user-route"
 */

const ValidateRoutes: React.FC<{
  children: any;
  type: "admin-route" | "user-route";
}> = (props) => {
  const userObject = JSON.parse(localStorage.getItem("userObject") || "{}");
  if (_.isEmpty(userObject)) {
    return (
      <ErrorTemplate
        errorText="Please Login to continue the checkout"
        statusCode={401}
      />
    );
  }
  const userRole: "ADMIN" | "USER" = userObject.userRole;
  if (userRole === "ADMIN" && props.type === "admin-route") {
    return props.children;
  } else if (userRole === "USER" && props.type === "user-route") {
    return props.children;
  } else {
    return (
      <ErrorTemplate
        errorText="The navigated site is only for admins"
        statusCode={403}
      />
    );
  }
};

export default ValidateRoutes;
