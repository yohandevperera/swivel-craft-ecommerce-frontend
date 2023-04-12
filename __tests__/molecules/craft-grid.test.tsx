import "@testing-library/jest-dom";
import React from "react";
import AppRoutes from "../../src/components/organisms/app-routes";
import { CraftType } from "../../src/services/crafts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../../src/redux/store/configureStore";
import GridItem from "../../src/components/molecules/grid-item";
import renderer from "react-test-renderer";

// Sample data set to check the grid view
const craft: CraftType = {
  _id: "6435a142030702dfc3032abe",
  name: "Painted Wine Bottle Vases",
  categoryId: "64229dfa1f396b074aea09c4",
  description: "",
  qty: 10,
  price: 3000,
  photo: "",
};

// the store instance created to access the redux store
const store = configureStore();

// test snapshot to validate the data grid view
describe("Craft grid snapshot", () => {
  it("should render the craft gird with the meta test data", () => {
    const domTree = renderer
      .create(
        <>
          <Provider store={store}>
            <BrowserRouter>
              <AppRoutes />
              <GridItem item={craft} handleAddToCart={() => {}} />
            </BrowserRouter>
          </Provider>
        </>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
