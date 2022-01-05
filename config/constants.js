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
  logout: (userId) => `/users/${userId}/logout`,
  user: (userId) => `/users/${userId}`,
  register: () => "/register",
  orders: (userId) => `/users/${userId}/orders`,
  cart: (userId) => `/users/${userId}/cart`,
  checkout: (userId) => `/users/${userId}/cart/checkout`,
};
