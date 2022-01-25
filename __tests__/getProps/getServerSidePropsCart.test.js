import { getServerSideProps } from "../../pages/cart";
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
    };
  });

  it("Should return cart items and set up a user", async () => {
    //* Mock fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => [
        { quantity: 2, price: 100 },
        { quantity: 1, price: 50 },
        { quantity: 4, price: 25 },
      ],
    });

    //* Get props and redirect values of returned object
    const { props, redirect } = await getServerSideProps(context);

    expect(typeof props).toBe("object");
    expect(redirect).toBeUndefined();
    expect(props.user).not.toBe(null);
    expect(typeof props.cartItems[0]).toBe("object");
  });

  it("Should return empty cart items array when fetching failed", async () => {
    //* Mock fetch
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    //* Get props and redirect values of returned object
    const { props, redirect } = await getServerSideProps(context);

    expect(typeof props).toBe("object");
    expect(redirect).toBeUndefined();
    expect(props.user).not.toBe(null);
    expect(props.cartItems[0]).toBeUndefined();
  });

  it("Should return redirect if no cookie provided", async () => {
    //* Erase cookie from context object
    context.req.cookies = {};

    //* Get props and redirect values of returned object
    const { props, redirect } = await getServerSideProps(context);

    expect(props).toBeUndefined();
    expect(redirect).not.toBeUndefined();
  });
});
