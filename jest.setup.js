import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});
