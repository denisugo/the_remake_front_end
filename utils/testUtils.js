import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
const { By } = require("selenium-webdriver");

//import ProductSlice from "../features/ProductSlice/ProductSlice";
import UserSlice from "../features/UserSlice/UserSlice";

export const setUp = (Component, props, path) => {
  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};
// export const setUpRedux = (Component, props) => {
//   const store = configureStore({
//     reducer: {
//       user: UserSlice,
//       //TODO: Add reducers
//     },
//   });

//   const wrapper = mount(
//     <Provider store={store}>
//       <Component {...props} />
//     </Provider>
//   );

//   return wrapper;
// };

export const findByDataTestSelenium = async (attr, driver) => {
  const elements = await driver.findElements(By.css(`[data-testid='${attr}']`));
  return elements;
};
export const findByComponentSelenium = async (componentCssName, driver) => {
  const elements = await driver.findElements(By.css(`${componentCssName}`));
  return elements;
};
export const findByDataTest = (attr, wrapper) => {
  const elements = wrapper.find(`[data-testid='${attr}']`);
  return elements;
};
export const findByTextChildren = (text, wrapper) => {
  const elements = wrapper.find({ children: text });
  return elements;
};
export const findByComponent = (componentName, wrapper) => {
  const elements = wrapper.find(componentName);
  return elements;
};
