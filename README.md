# The remake (front-end)

## Overview

This is the remake of my previous portfolio project. It is aimed for improving all the cons of the project. The Sql database remains the same, back-end part should be slightly upgraded, front-end will also get more features.

## Features

- JWT instead of redux
- Oauth
- Description of each function
- Simple back-end structure

## Comment styling

- // Should be used for commenting unused parts of code
- //\* Should be used for short describing of code parts, generally for introductions
- //? Should be used for more detailed describing of code
- // TODO: Should be used for leaving certain tasks within code
- //! Should be used for indicating of high priority notes

## Roadmap

### Front-end

- Refactor and add a fully functional validation on inputs
- Comment each component
- JWT should expire

### Back-end

- Refactor all middlewares
- Remove roles in SQL, so it can be published onto Heroku
- Cookie session should expire
- Get rid of query tests and refactor middleware tests

## Getting Started

This app was build with Next js framework, tested with Jest and Selenium.

Docs could be found in _Docs_ folder.

### Links

This is the client app. It should work with [this API](https://github.com/denisugo/the_remake_back-end)

### Initial setup

To make it work, you should setup the environment variables that are provided in the following lines:

```
NEXT_PUBLIC_HOST= http://localhost:4000/api/v1
NEXT_PUBLIC_THIS= http://localhost:3000
SNEXT_PUBLIC_TRIPE_PK= our_Stripe_PK_Key

```

## Preview

![Preview](/docs/portfolio.gif)

 <br />

## Pros

- Lightwight
- SEO friendly
- A11y friendly
- Good color combination

## Pros & Cons

### Cons

- Poor design: Because of time pressure, I was unable to create very elaborate elements, high fidelity wireframings and a mobile (tablet) version of the app. So that it is just a Next js showcase project.

### Pros

- Anything else

### TODO:

- Improve design.
- Catch mistakes in components.
- Allow user to delete their account.
- Recreate all components that contains `form ` item. It is importtant for the following todo.
- Improve tests. Some tests requirs _teardown_ phase. Not all component have 100% test coverage.
- Add mobile version
