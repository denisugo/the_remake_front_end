import { getServerSideProps } from "../../pages/index";
import * as jwt from "jsonwebtoken";

describe("getServerSideProps in index.js", () => {
  let context;

  beforeEach(() => {
    //* Setup for fetch
    fetch.resetMocks();

    //* jwt setup
    jwt.default.verify = jest.fn().mockReturnValueOnce({});

    //* Setup for context
    context = {
      req: { cookies: { user: "asswa" } },
      // res: { setHeader: jest.fn() },
    };
  });

  it("Should return a list and set up a user", async () => {
    //? This mocks a fetch call within the getServerSideProps function
    //? It returns the array with two mock products
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => [{}, {}],
    });

    //? Retrieving props from getServerSideProps's returned object
    const { props } = await getServerSideProps(context);

    expect(typeof props).toBe("object");
    expect(typeof props.user).not.toBe("undefined");
    expect(Array.isArray(props.list)).toBe(true);
  });

  it("Should return null in list if response is not ok ", async () => {
    //? This mocks a fetch call within the getServerSideProps function
    //? It returns the array with two mock products
    //? But this time it return with a server error (ok = false)
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => [{}, {}],
    });

    //? Retrieving props from getServerSideProps's returned object
    const { props } = await getServerSideProps(context);

    expect(typeof props).toBe("object");
    expect(JSON.stringify(props.list)).toBe(JSON.stringify([]));
    expect(typeof props.user).toBe("undefined");
    // expect(UserSlice.initUser.mock.calls.length).toBe(0);
    // expect(props.isMobile).toBe(false);
  });

  it("Should return a list but not set up a user if no cookie provided", async () => {
    //? Removing cookie
    context.req.cookies = {};

    //? This mocks a fetch call within the getServerSideProps function
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => {
        return [{}, {}];
      },
    });

    const { props } = await getServerSideProps(context);

    expect(typeof props).toBe("object");
    expect(props.list).not.toBe(null);
    expect(typeof props.user).toBe("undefined");
  });
  // it("Should return a list but not set up a user and delete cookie if provided cookie is incorrect", async () => {
  //   context.req.cookies = { "connect.sid": "afsd" };
  //   fetch.mockResolvedValueOnce({
  //     ok: true,
  //     json: () => {
  //       return { user: undefined, products: [{}, {}] };
  //     },
  //   });

  //   const { props } = await getServerSideProps(context);

  //   expect(typeof props).toBe("object");
  //   expect(props.list).not.toBe(null);
  //   expect(UserSlice.initUser.mock.calls.length).toBe(0);
  //   expect(context.res.setHeader.mock.calls.length).toBe(1);
  //   // expect(props.isMobile).toBe(false);
  // });
});
