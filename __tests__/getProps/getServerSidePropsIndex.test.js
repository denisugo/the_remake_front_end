import { getServerSideProps } from "../../pages/index";

import * as UserSlice from "../../features/UserSlice/UserSlice";

describe("getServerSideProps in index.js", () => {
  let context;

  beforeEach(() => {
    //* Setup for fetch
    fetch.resetMocks();
    //  Setup for react redux
    // UserSlice.initUser = jest.fn().mockReturnValue({ type: "", payload: {} });
    // // Setup for context
    // context = {
    //   req: { cookies: { "connect.sid": "asswa" } },
    //   res: { setHeader: jest.fn() },
    // };
  });

  it("Should return list", async () => {
    //? This mocks a fetch call within the getServerSideProps function
    //? It returns the array with two mock products
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => [{}, {}],

      // json: () => {
      //   return { user: {}, products: [{}, {}] };
      // },
    });

    //? Retrieving props from getServerSideProps's returned object
    const { props } = await getServerSideProps(context);

    expect(typeof props).toBe("object");
    // expect(props.user).not.toBe(null);
    expect(Array.isArray(props.list)).toBe(true);
    // expect(UserSlice.initUser.mock.calls.length).toBe(1);
    // expect(props.isMobile).toBe(false);
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
    // expect(UserSlice.initUser.mock.calls.length).toBe(0);
    // expect(props.isMobile).toBe(false);
  });

  // it("Should return a list but not set up a user if no cookie provided", async () => {
  //   context.req.cookies = {};
  //   fetch.mockResolvedValueOnce({
  //     ok: true,
  //     json: () => {
  //       return { user: undefined, products: [{}, {}] };
  //     },
  //   });

  //   const { props } = await getServerSideProps(context);

  //   expect(typeof props).toBe("object");
  //   expect(props.list).not.toBe(null);
  //   // expect(UserSlice.initUser.mock.calls.length).toBe(0);
  //   // expect(context.res.setHeader.mock.calls.length).toBe(0);
  //   // expect(props.isMobile).toBe(false);
  // });
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
