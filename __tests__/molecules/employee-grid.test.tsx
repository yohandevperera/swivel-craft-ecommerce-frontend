import "@testing-library/jest-dom";
import React from "react";
import AppRoutes from "../../src/components/organisms/app-routes";
import { EmployeeType } from "../../src/services/employee";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../../src/redux/store/configureStore";
import GridItem from "../../src/components/molecules/grid-item";
import renderer from "react-test-renderer";


// Sample data set to check the grid view
const employee: EmployeeType = {
  email: "Darrin_Rippin@gmail.com",
  firstname: "Henri",
  gender: "M",
  lastname: "Rodriguez",
  phone: "+94771277218",
  photo: "https://randomuser.me/api/portraits/men/92.jpg",
  _id: "63ff04ffb8e613034a3ea943",
};

// the store instance created to access the redux store
const store = configureStore();

// test snapshot to validate the data grid view
describe("Employee grid snapshot", () => {
  it("should render the employee gird with the meta test data", () => {
    const domTree = renderer
      .create(
        <>
          <Provider store={store}>
            <BrowserRouter>
              <AppRoutes />
              <GridItem item={employee} handleDelete={() => {}} />
            </BrowserRouter>
          </Provider>
        </>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
