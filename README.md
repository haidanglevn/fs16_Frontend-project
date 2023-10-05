# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

This project requires implementation of TypeScript and SASS.

## Requirement

1. Use the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to create an e-commerce website. Read the documentation and learn how to use the different endpoints.
2. Create at lease 4 pages (can be more if you want): Page for all products, product page,
   profile page (only available if user logins), and cart page (cart page could be a page or a modal)
3. Create Redux store for following features:
   - product reducer: get all products, find a single products, filter products by
     categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
   - user reducer: register and login
   - cart reducer: add product to cart, remove products, update products's quantity in cart
4. When adding routers to your application, programatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
5. Implement unit testing for the reducers
6. Deploy the application and rewrite README file.

## Bonus

1. Use context API to switch theme
2. Use pagination when fetching/displaying all the products
3. Implement performance optimization where applicable (redux-persist, RTK(react-toolkit)-query?)

## Docs

https://github.com/rt2zz/redux-persist

## Done

- [x] Product reducer: fetch all products, find single product, sort by price order/category
- [x] Cart reducer: add to cart, remove (all)
- [x] User reducer: login/logout
- [x] Product reducer (admin): create, update and delete a product
- [x] Admin panel: Datagrid?
- [x] User reducer: register
- [x] Toast
- [x] Cart reducer: remove one product/ change quantity
- [x] Register form: validate input?, check if email is available?
- [x] Router Protected routes for profile

## Next to be done

- [ ] Single Product page: data can be passed from all products, or fetched from API, in case user use the link to come to the page
- [ ] Unit testing for the reducer: Cart, Profile done
- [ ] Styling with MUI
- [ ] Pagination
- [ ] Modal
- [ ] Theme
- [ ] Header: Autocomplete with search results
- [ ] Loading screen
- [ ] Deploy
- [ ] Checkout mock function
- [ ] Hero page?

## Finalize (both functions & styling)

- [ ] Header
- [ ] Product Page
- [ ] Cart Page
- [ ] Header
- [ ] Header
