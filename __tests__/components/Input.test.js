import Input from "../../components/Input/Input.js";
import {
  findByComponent,
  findByDataTest,
  findByDTextChildren,
  setUp,
} from "../../utils/testUtils.js";

describe("Search", () => {
  const props = { placeholder: "hhh", type: "search" };
  const wrapper = setUp(Input, props);

  it("Should render input", () => {
    const searchBar = findByDataTest("input", wrapper);
    expect(searchBar.length).toBe(1);
  });
});
