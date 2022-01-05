import Search from "../../components/Search/Search.js";
import {
  findByComponent,
  findByDataTest,
  findByDTextChildren,
  setUp,
} from "../../utils/testUtils.js";

describe("Search", () => {
  let newList;
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      callback: jest.fn((x) => (newList = x)),
      list: [
        {
          id: 1,
          name: "Cream",
          description: "Can be eaten",
          price: 200,
          category: "health",
          preview: "www",
        },
        {
          id: 2,
          name: "Cream",
          description: "Can be eaten",
          price: 200,
          category: "health",
          preview: "www",
        },
        {
          id: 3,
          name: "Cream",
          description: "Can be eaten",
          price: 200,
          category: "health",
          preview: "www",
        },
        {
          id: 4,
          name: "someStuff",
          description: "Canot be eaten",
          price: 200,
          category: "other",
          preview: "www",
        },
      ],
    };

    wrapper = setUp(Search, props);
  });

  describe("Rendering", () => {
    it("Should render search", () => {
      const search = findByDataTest("search", wrapper);
      expect(search.length).toBe(1);
    });
    it("Should render selectByCategory", () => {
      const selectByCategory = findByDataTest("select-by-category", wrapper);
      expect(selectByCategory.length).toBe(1);
    });
    it("Should render searchBar", () => {
      const searchBar = findByComponent("Input", wrapper);
      expect(searchBar.length).toBe(1);
    });
  });

  describe("Filtering", () => {
    describe("Select", () => {
      it("Should filter productlist by category", async () => {
        // Selects and clicks on select component
        const selectByCategory = findByDataTest("select-by-category", wrapper);
        selectByCategory
          .first()
          .simulate("change", { target: { value: "health" } });

        expect(props.callback.mock.calls.length).toBe(1);
        expect(newList.length).toBe(3);
      });
      it("Should select all items in the list", async () => {
        // Selects and clicks on select component
        const selectByCategory = findByDataTest("select-by-category", wrapper);
        selectByCategory
          .first()
          .simulate("change", { target: { value: "all" } });

        expect(props.callback.mock.calls.length).toBe(1);
        expect(newList.length).toBe(4);
      });
    });

    describe("Input", () => {
      // Not tested all possible cases. The implemetation will be changed
      it("Should select all 'Creams'", async () => {
        // Selects and types a search key
        const input = findByComponent("Input", wrapper);
        input
          .first()
          .dive()
          .simulate("change", { target: { value: "Cre" }, name: "Search" });

        expect(props.callback.mock.calls.length).toBe(1);
        expect(newList.length).toBe(3);
      });
      it("Should select all 'Creams' (all lowercase)", async () => {
        // Selects and types a search key
        const input = findByComponent("Input", wrapper);
        input
          .first()
          .dive()
          .simulate("change", { target: { value: "cre" }, name: "Search" });

        expect(props.callback.mock.calls.length).toBe(1);
        expect(newList.length).toBe(3);
      });
      it("Should select all items", async () => {
        // Selects and types a search key
        const input = findByComponent("Input", wrapper);
        input
          .first()
          .dive()
          .simulate("change", { target: { value: "" }, name: "Search" });

        expect(props.callback.mock.calls.length).toBe(1);
        expect(newList.length).toBe(4);
      });
    });
  });
});
