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
  product: (id) => `/products/${id}`,
  login: () => "/login",
  facebook: () => "/login/facebook",
  logout: () => `/users/logout`,
  user: () => `/users`,
  register: () => "/register",
  orders: () => `/users/orders`,
  cart: () => `/users/cart`,
  checkout: () => `/users/cart/checkout`,
};

export const jwtConfig = {
  key: "microcat",
  maxAge: 60 * 60 * 24, //? one day in seconds
};
