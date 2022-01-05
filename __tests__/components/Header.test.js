import Header from "../../components/Header/Header.js";
import {
  findByComponent,
  findByDataTest,
  findByDTextChildren,
  setUp,
} from "../../utils/testUtils.js";

describe("Header", () => {
  const wrapper = setUp(Header);

  it("Should render header", () => {
    const header = findByDataTest("header", wrapper);
    expect(header.length).toBe(1);
  });
  it("Should render pills", () => {
    const pills = findByDataTest("pills", wrapper);
    expect(pills.length).toBe(1);
  });
  it("Should render tabs", () => {
    const tabs = findByDataTest("tabs", wrapper);
    expect(tabs.length).toBe(1);
  });
  // it("Should render search", () => {
  //   const search = findByComponent("Search", wrapper);
  //   expect(search.length).toBe(1);
  // });
});
