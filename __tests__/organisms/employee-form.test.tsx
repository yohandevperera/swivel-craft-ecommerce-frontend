import "@testing-library/jest-dom";
import React from "react";
import AppRoutes from "../../src/components/organisms/app-routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../../src/redux/store/configureStore";
import EmployeeForm from "../../src/components/organisms/employee-form";
import renderer from "react-test-renderer";
  
// the store instance created to access the redux store
const store = configureStore();


// test snapshot to validate the add employee form
describe("Employee add form snapshot", () => {
  it("should render the employee add form feilds", () => {
    const domTree = renderer
      .create(
        <>
          <Provider store={store}>
            <BrowserRouter>
              <AppRoutes />
              <EmployeeForm type="add" onFormSubmit={() => {}} />
            </BrowserRouter>
          </Provider>
        </>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
