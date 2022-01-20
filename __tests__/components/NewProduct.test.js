import NewProduct from "../../components/NewProduct/NewProduct.js";
import {
  findByComponent,
  findByDataTest,
  findByDTextChildren,
  setUp,
} from "../../utils/testUtils.js";

describe("NewProduct", () => {
  let wrapper;
  let props;

  //* Mock body object
  //   const body = {
  //     name: "",
  //     description: "",
  //     price: 1,
  //     category: "",
  //     preview: "",
  //   };
  beforeEach(() => {
    //* Reset fetch mock
    fetch.resetMocks();

    //* Mock alert
    global.alert = jest.fn();

    props = {
      callback: jest.fn(),
    };
    wrapper = setUp(NewProduct, props);
  });

  it("Should render a button", () => {
    const button = findByDataTest("add-button", wrapper);
    expect(button.length).toBe(1);
  });
  it("Should render a form", () => {
    //* Locate button and click it
    const button = findByDataTest("add-button", wrapper);
    expect(button.length).toBe(1);
    button.first().dive().simulate("click");

    //* Update wrapper
    wrapper.update();
    let form = findByComponent("form", wrapper);
    expect(form.length).toBe(1);

    //* Locate all inputs
    const inputs = findByComponent("Input", wrapper);
    expect(inputs.length).toBe(5);

    //* Now it should close the form box
    const cancelButton = findByDataTest("cancel-button", wrapper);
    expect(cancelButton.length).toBe(1);
    cancelButton.first().dive().simulate("click");

    //* Update wrapper
    wrapper.update();
    form = findByComponent("form", wrapper);
    expect(form.length).toBe(0);
  });
  it("Should call callback when response is ok", async () => {
    //? Mocking fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => {
        return {};
      },
    });

    //* Locate button and click it
    const button = findByDataTest("add-button", wrapper);
    expect(button.length).toBe(1);
    button.first().dive().simulate("click");

    //* Update wrapper
    wrapper.update();

    //* Locate all inputs and fill them out with an apropriate value
    const nameInput = findByDataTest("name-input", wrapper).first();
    nameInput.dive().simulate("change", { target: { value: "spam" } });
    const descInput = findByDataTest("description-input", wrapper).first();
    descInput.dive().simulate("change", { target: { value: "spam" } });
    const priceInput = findByDataTest("name-input", wrapper).first();
    priceInput.dive().simulate("change", { target: { value: 1 } });
    const catInput = findByDataTest("name-input", wrapper).first();
    catInput.dive().simulate("change", { target: { value: "spam" } });
    const previewInput = findByDataTest("name-input", wrapper).first();
    previewInput.dive().simulate("change", { target: { value: "spam" } });

    //* Now it should close the form box
    //? Submitting the form
    const form = findByComponent("form", wrapper);
    form.simulate("submit", { preventDefault: jest.fn() });

    //? This will execute async function in NewProduct.js immidiately
    await new Promise((res) => setImmediate(res));
    expect(props.callback.mock.calls.length).toBe(1);
  });
  it("Should NOT call callback when response is NOT ok", () => {
    //? Mocking fetch
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => {
        return {};
      },
    });

    //* Locate button and click it
    const button = findByDataTest("add-button", wrapper);
    expect(button.length).toBe(1);
    button.first().dive().simulate("click");

    //* Update wrapper
    wrapper.update();

    //* Locate all inputs and fill them out with an apropriate value
    const nameInput = findByDataTest("name-input", wrapper).first();
    nameInput.dive().simulate("change", { target: { value: "spam" } });
    const descInput = findByDataTest("description-input", wrapper).first();
    descInput.dive().simulate("change", { target: { value: "spam" } });
    const priceInput = findByDataTest("name-input", wrapper).first();
    priceInput.dive().simulate("change", { target: { value: 1 } });
    const catInput = findByDataTest("name-input", wrapper).first();
    catInput.dive().simulate("change", { target: { value: "spam" } });
    const previewInput = findByDataTest("name-input", wrapper).first();
    previewInput.dive().simulate("change", { target: { value: "spam" } });

    //* Now it should close the form box
    //? Submitting the form
    const form = findByComponent("form", wrapper);
    form.simulate("submit", { preventDefault: jest.fn() });

    expect(props.callback.mock.calls.length).toBe(0);
  });
});
