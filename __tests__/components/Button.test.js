import Search from "../../components/Button/Button.js";
import {
  findByDataTest,
  findByDTextChildren,
  setUp,
} from "../../utils/testUtils.js";

describe("Button", () => {
  const props = {
    height: 100,
    width: 200,
    text: "Hello",
    callback: jest.fn(),
  };
  const wrapper = setUp(Search, props);

  it("Should render button", () => {
    const button = findByDataTest("button", wrapper);
    expect(button.length).toBe(1);
  });
  it("Should call calback", () => {
    const button = findByDataTest("button", wrapper);
    button.simulate("click");
    expect(props.callback.mock.calls.length).toBe(1);
    button.simulate("select");
    expect(props.callback.mock.calls.length).toBe(2);
  });
});
