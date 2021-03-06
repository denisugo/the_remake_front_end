import Nav from "../../../components/Nav/Nav.js";
import { routes } from "../../../config/constants.js";
import {
  findByComponent,
  findByDataTest,
  findByDTextChildren,
  setUp,
} from "../../../utils/testUtils.js";

describe("Nav", () => {
  const props = { user: null };

  let wrapper = setUp(Nav, props);
  wrapper = findByComponent("NavDesktop", wrapper).first().dive();

  it("Should render the nav", () => {
    const nav = findByDataTest("nav", wrapper);
    expect(nav.length).toBe(1);
  });

  it("Should render the navigation", () => {
    const navigation = findByDataTest("navigation", wrapper);
    expect(navigation.length).toBe(1);
  });

  it("Should render link to /login", () => {
    const login = findByComponent("Link", wrapper).at(2);
    expect(login.length).toBe(1);
    expect(login.get(0).props).toHaveProperty("href", routes.login);

    const cart = findByComponent("Link", wrapper).at(1);
    expect(cart.length).toBe(1);
    expect(cart.get(0).props).toHaveProperty("href", routes.login);
  });

  it("Should render link to /user", () => {
    //* reassign values
    const props = { user: { id: 1 } };

    let wrapper = setUp(Nav, props);
    wrapper = findByComponent("NavDesktop", wrapper).first().dive();

    const user = findByComponent("Link", wrapper).at(2);
    expect(user.length).toBe(1);
    expect(user.get(0).props).toHaveProperty("href", routes.user);

    const cart = findByComponent("Link", wrapper).at(1);
    expect(cart.length).toBe(1);
    expect(cart.get(0).props).toHaveProperty("href", routes.cart);
  });

  it("Should render the logo", () => {
    const logo = findByDataTest("logo", wrapper);
    expect(logo.length).toBe(1);
  });
});
