export const routes = {
  home: "/",
  product: "/product",
  login: "/login",
  user: "/user",
  cart: "/cart",
  orders: "/orders",
  registration: "/registration",
  checkout: "/checkout",
};

export const endpoints = {
  products: () => "/products",
  login: () => "/login",
  logout: () => `/users/logout`,
  user: () => `/users`,
  register: () => "/register",
  orders: (userId) => `/users/${userId}/orders`,
  cart: (userId) => `/users/${userId}/cart`,
  checkout: (userId) => `/users/${userId}/cart/checkout`,
};

export const jwtConfig = {
  key: "microcat",
  maxAge: 60 * 60 * 24, //? one day in seconds
};
