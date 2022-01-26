import { getServerSideProps } from "../../pages/orders";
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
      json: () => {
        return {
          1: {
            shipped: false,
            products: [
              { quantity: 2, product_id: 100, name: "aaa" },
              { quantity: 2, product_id: 1, name: "aaa" },
              { quantity: 2, product_id: 10, name: "aaa" },
            ],
          },
        };
      },
    });

    //* Get props and redirect values of returned object
    const { props, redirect } = await getServerSideProps(context);

    expect(typeof props).toBe("object");
    expect(redirect).toBeUndefined();
    expect(typeof props.items[1]).toBe("object");
  });

  it("Should return empty order items when fetching failed", async () => {
    //* Mock fetch
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    //* Get props and redirect values of returned object
    const { props, redirect } = await getServerSideProps(context);

    expect(typeof props).toBe("object");
    expect(redirect).toBeUndefined();
    expect(props.items[1]).toBeUndefined();
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
