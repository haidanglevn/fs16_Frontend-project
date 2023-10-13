# E-commerce Front End Project

![Home - Dark Theme](https://github.com/haidanglevn/fs16_6-frontend-project/assets/24937536/b12afe5d-bce7-478b-8193-3a24ba7baa6b)

## Introduction

This is a wrap-up frontend project for Integrify Frontend Module. The task is to made a fully-featured React-Redux E-commerce app using [Platzi Fake Store API](https://fakeapi.platzi.com/).

Check out the live website [here](https://ecomecho.netlify.app/).

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Screenshots](#screenshots)
- [Architecture & Design](#architecture--design)
  - [Folder Structure](#folder-structure)
  - [Data Flow](#data-flow)
  - [Component Structure](#component-structure)
- [Testing](#testing)
- [Deployment](#deployment)

## Getting Started

### Prerequisites

- [NodeJS & Node Package Manager](https://nodejs.dev/en/download/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

### Installation

You can visit the deployed version, or follow these steps to set it up as local repository.

1. Clone the repository:
   ```bash
   git clone https://github.com/haidanglevn/fs16_Frontend-project.git
   ```
2. Install all the dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm start
   ```
4. (Optional) Run all the tests:
   ```bash
   npm run test
   ```

## Features

### Tech stacks:

- React
- Redux: for state management
- Material UI: for styling

### Features for normal customer:

- Fetch all products, filter them by price order and categories
- Add products to cart, edit its quantities, empty the cart, purchase all item in cart (not ready yet)
- Register for new account with email, Login, Logout, Edit profile info (not ready yet)
- Light & Dark Theme
- Responsive layout from phone, tablet and laptop screens

### Features for admin:

- All normal customer features
- Access to admin panel, where you can add new products, edit or delete products

## Screenshots

Home page:
![Home - Light Theme](https://github.com/haidanglevn/fs16_6-frontend-project/assets/24937536/78916058-53ee-4533-9312-7a513b5b4a14)

Product Single:
![Product Single - Light Theme](https://github.com/haidanglevn/fs16_6-frontend-project/assets/24937536/61b3848f-aae3-432e-a071-fce4fc3aabf3)

Profile Page:
![Profile - Light Theme](https://github.com/haidanglevn/fs16_6-frontend-project/assets/24937536/f271b2be-d307-4b57-b8ea-2dd4cef771a3)

Cart Page:
![Cart - Light Theme](https://github.com/haidanglevn/fs16_6-frontend-project/assets/24937536/7a08adfb-6dce-4cb5-bf47-a949e3550d5b)

Admin Panel:
![Admin Panel - Light Theme](https://github.com/haidanglevn/fs16_6-frontend-project/assets/24937536/d8d76c2f-2666-499a-8e7f-20fea6781a86)
![CreateNewProduct - Light Theme](https://github.com/haidanglevn/fs16_6-frontend-project/assets/24937536/e87624f1-5f14-4b5e-8570-284a74783a8a)
![Admin Panel (Mobile) - Light Theme](https://github.com/haidanglevn/fs16_6-frontend-project/assets/24937536/0ffed0a5-8012-41e7-b88a-b11f13f2a0bb)

## Architecture & Design

### Folder Structure

- 📂 `root-directory/`
  - 📂 `src/`
    - 📂 `assets/`
      - 📂 `images/`
        - 📷 `bearSorry.png`
        - 📷 `empty-cart.png`
        - 📷 `icon-cart.svg`
        - 📷 `image-avatar.png`
        - 📷 `loading.gif`
        - 📷 `Logo.svg`
    - 📂 `components/`
      - 📄 `CartEmpty.tsx`
      - 📄 `Footer.tsx`
      - 📄 `Header.tsx`
      - 📄 `Layout.tsx`
      - 📄 `ProductCard.tsx`
      - 📄 `Register.tsx`
      - 📄 `SearchBar.tsx`
      - 📄 `SelectCategory.tsx`
      - 📄 `SelectItemsPerPage.tsx`
      - 📄 `SelectPriceOrder.tsx`
    - 📂 `hooks/`
      - 📄 `useScreenSizes.ts`
    - 📂 `pages/`
      - 📄 `AdminPage.tsx`
      - 📄 `CartPage.tsx`
      - 📄 `Login.tsx`
      - 📄 `ProductPage.tsx`
      - 📄 `ProductSingle.tsx`
      - 📄 `ProfilePage.tsx`
    - 📂 `redux/`
      - 📄 `store.ts`
      - 📄 `utils.ts`
      - 📂 `slices/`
        - 📄 `cartSlice.ts`
        - 📄 `categorySlice.ts`
        - 📄 `userSlice.ts`
        - 📄 `productSlice.ts`
    - 📂 `tests/`
      - 📂 `mocks/`
        - 📄 `handlers.ts`
        - 📄 `server.ts`
        - 📄 `mockData.ts`
      - 📄 `cartReducer.test.ts`
      - 📄 `categoryReducer.test.ts`
      - 📄 `productReducer.test.ts`
      - 📄 `userReducer.test.ts`
    - 📂 `types/`
      - 📄 `cartSlice.ts`
      - 📄 `categorySlice.ts`
      - 📄 `productSlice.ts`
      - 📄 `userSlice.ts`
    - 📂 `ultilities/`
      - 📄 `trimString.tsx`
    - 📄 `App.tsx`
    - 📄 `index.css`
  - 📄 `README.md`
  - 📄 `package.json`
  - 📄 `.gitignore`

### Data Flow

Coming soon

## Testing

Unit tests are made for all 4 reducers.

## Deployment

The app is deployed in Netlify. Live page is here: [https://ecomecho.netlify.app/](https://ecomecho.netlify.app/)
