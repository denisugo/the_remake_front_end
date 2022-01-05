## Links

This is the client app. It should work with [this API](https://github.com/denisugo/back_end_portfolio)

## Getting Started

This app was build with Next js framework, tested with Jest and Selenium.

Docs could be found in _Docs_ folder.

## Initial setup

To make it work, you should create _next.config.js_ at the root of this project and paste this:

```
 module.exports = {
     reactStrictMode: true,
     images: { domains: ["images.unsplash.com"], },
     env: {
         HOST: "http://localhost:4000/api/v1",
         THIS: "http://localhost:3000",
         STRIPE_PK: "Your_Stripe_PK_Key",
         },
    };
```

## Preview

![Preview](/docs/portfolio.gif)

## Pros

- Lightwight
- SEO friendly
- A11y friendly
- Good color combination

## Cons

- Not all components are equally good: some were created earlier, that is why they can contain some mistakes, that were cought and replaced by a better solution in other components. For example `data-testid` can be duplicated.

- Poor design: Because of time pressure, I was unable to create very elaborate elements, high fidelity wireframings and a mobile (tablet) version of the app. So that it is just a Next js showcase project.

## TODO:

- Improve design.
- Catch mistakes in components.
- Allow user to delete their account.
- Recreate all components that contains `form ` item. It is importtant for the following todo.
- Improve tests. Some tests requirs _teardown_ phase. Not all component have 100% test coverage.
- Add mobile version
- Add admin flow
- Refactor selenium test suits
