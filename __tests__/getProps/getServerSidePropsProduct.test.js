import { getServerSideProps } from "../../pages/product";

import * as UserSlice from "../../features/UserSlice/UserSlice";

describe("getServerSideProps in product.js", () => {
  let context;

  beforeEach(() => {
    //  Setup for fetch redux
    fetch.resetMocks();
    //  Setup for react redux
    // UserSlice.getUser = jest.fn().mockReturnValue({ type: "", payload: {} });
    UserSlice.selectUser = jest.fn().mockReturnValue({ id: 1 });
    // Setup for context
    context = {
      req: { cookies: { "connect.sid": "asswa" } },
      res: { setHeader: jest.fn() },
      query: { id: 1 },
    };
  });

  it("Should return product details", async () => {
    const { props, redirect } = await getServerSideProps(context);

    expect(typeof props).toBe("object");
    expect(redirect).toBeUndefined();
    expect(props.user).not.toBe(null);
    expect(props.id).toBe(context.query.id);
    expect(UserSlice.selectUser.mock.calls.length).toBe(1);
  });

  it("Should return redirect if product id is not provided", async () => {
    delete context.query.id;
    const { props, redirect } = await getServerSideProps(context);

    expect(props.id).toBeUndefined();
    expect(typeof redirect).toBe("object");
    expect(UserSlice.selectUser.mock.calls.length).toBe(0);
  });

  it("Should return details but not set up a user if no cookie provided", async () => {
    UserSlice.selectUser = jest.fn().mockReturnValue(null);

    const { props } = await getServerSideProps(context);

    expect(props.id).not.toBeUndefined();
    expect(props.user).toBe(null);
    expect(UserSlice.selectUser.mock.calls.length).toBe(1);
    expect(context.res.setHeader.mock.calls.length).toBe(1);
  });
});
