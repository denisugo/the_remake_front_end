import { getServerSideProps } from "../../pages/product";
import * as jwt from "jsonwebtoken";

describe("getServerSideProps in product.js", () => {
  let context;

  beforeEach(() => {
    //* Setup fetch
    fetch.resetMocks();

    //* jwt setup
    jwt.default.verify = jest.fn();

    //* Setup context
    context = {
      req: {
        cookies: { "connect.sid": "asswa", user: "assw" },
        headers: { "user-agent": "android" },
      },
      query: {
        id: 1,
        name: "alacazar",
        description: "font",
        price: "210",
        preview: "www",
      },
    };
  });

  it("Should return product details", async () => {
    //* Get props and redirect values of returned object
    const { props, redirect } = await getServerSideProps(context);

    expect(typeof props).toBe("object");
    expect(redirect).toBeUndefined();
    expect(props.user).not.toBe(null);
    expect(props.id).toBe(context.query.id);
  });

  it("Should return redirect if product query is not provided", async () => {
    //* Erase query from context object
    delete context.query;
    //* Get props and redirect values of returned object
    const { props, redirect } = await getServerSideProps(context);

    expect(props).toBeUndefined();
    expect(typeof redirect).toBe("object");
  });

  it("Should return details but not set up a user if no cookie provided", async () => {
    //* Erase cookie from context object
    context.req.cookies = {};
    //* Get props values of returned object
    const { props } = await getServerSideProps(context);

    expect(props.id).toBe(context.query.id);
    expect(props.user).toBe(null);
  });
});
