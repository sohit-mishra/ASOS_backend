# ASOS E-Commerce API

An e-commerce API built with Node.js, Express, and MongoDB, providing endpoints for user authentication, product management, coupons, offers, cart management, address management, reviews, order processing, and payments.

## Table of Contents
- [ASOS E-Commerce API](#asos-e-commerce-api)
  - [Table of Contents](#table-of-contents)
  - [#Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Set Up Environment Variables](#set-up-environment-variables)
    - [Start the Server](#start-the-server)
- [Environment-Variables](#environment-variables)
- [Usage](#usage)
  - [Base URL](#base-url)
  - [Authentication](#authentication)
    - [Sign Up](#sign-up)
    - [Login](#login)
    - [Refresh Token](#refresh-token)
    - [Logout](#logout)
    - [Get User Profile](#get-user-profile)
    - [Update User Profile](#update-user-profile)
  - [Products](#products)
    - [Get All Products](#get-all-products)
    - [Get Product by ID](#get-product-by-id)
    - [Create Product](#create-product)
    - [Update Product](#update-product)
    - [Delete Product](#delete-product)
  - [Coupons](#coupons)
    - [Get Coupon by Code](#get-coupon-by-code)
    - [Create Coupon](#create-coupon)
    - [Create Coupon (Admin)](#create-coupon-admin)
    - [Update Coupon](#update-coupon)
    - [Delete Coupon](#delete-coupon)
  - [Offers](#offers)
    - [Get All Offers](#get-all-offers)
    - [Create Offer](#create-offer)
    - [Create Offer (Linked to another resource)](#create-offer-linked-to-another-resource)
    - [Update Offer](#update-offer)
    - [Delete Offer](#delete-offer)
  - [Cart](#cart)
    - [Get User Cart](#get-user-cart)
    - [Add to Cart](#add-to-cart)
    - [Update Cart Item](#update-cart-item)
    - [Delete Cart Item](#delete-cart-item)
  - [Address Management](#address-management)
    - [Get All Addresses](#get-all-addresses)
    - [Create Address](#create-address)
    - [Update Address](#update-address)
    - [Delete Address](#delete-address)
  - [Reviews](#reviews)
    - [Get Reviews by Product ID](#get-reviews-by-product-id)
    - [Add Review](#add-review)
    - [Delete Review](#delete-review)
  - [Orders](#orders)
    - [Get User Orders](#get-user-orders)
    - [Create Order](#create-order)
    - [Update Order](#update-order)
  - [Payment](#payment)
    - [Create Payment](#create-payment)
    - [Verify Payment](#verify-payment)
  - [Contributing](#contributing)
  - [License](#license)

---

## #Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/ASOS-ecommerce-api.git
cd ASOS-ecommerce-api
```

### Install Dependencies
```bash
npm install
```

### Set Up Environment Variables

Rename .envExample.txt to .env and add your configuration values.

### Start the Server
```
nodemon index.js
```

The server will run on http://localhost:3001.

# Environment-Variables
Set up your .env file with the following variables:

``` 
PORT=
MONGOURI = 
JWT_SECRET =
CLOUDINARY_CLOUD_NAME= 
CLOUDINARY_API_KEY= 
CLOUDINARY_API_SECRET= 
STRIPE_SECRET_KEY= 
CORS_ORIGIN=
CORS_METHODS=GET,POST,PUT,DELETE
CORS_CREDENTIALS=true
```

# Usage
After starting the server, you can access the API endpoints through http://localhost:3001. You can test endpoints using tools like Postman or curl.

## Base URL
The base URL for the API is: `http://localhost:3001`

## Authentication

### Sign Up
- **POST** `/api/auth/signup`
- **Description:** Create a new user account.

### Login
- **POST** `/api/auth/login`
- **Description:** Log in an existing user.

### Refresh Token
- **POST** `/api/auth/refreshtoken`
- **Description:** Refresh the authentication token.

### Logout
- **POST** `/api/auth/logout`
- **Description:** Log out the current user.

### Get User Profile
- **GET** `/api/auth/profile/:userId`
- **Description:** Get the profile of a user by ID.

### Update User Profile
- **PUT** `/api/auth/profile/:userId`
- **Description:** Update the profile of a user by ID.

## Products

### Get All Products
- **GET** `/api/product/`
- **Description:** Retrieve a list of all products.

### Get Product by ID
- **GET** `/api/product/:id`
- **Description:** Retrieve a specific product by ID.

### Create Product
- **POST** `/api/product/`
- **Description:** Create a new product.

### Update Product
- **PUT** `/api/product/:id`
- **Description:** Update a product by ID.

### Delete Product
- **DELETE** `/api/product/:id`
- **Description:** Delete a product by ID.

## Coupons

### Get Coupon by Code
- **GET** `/api/coupon/:code`
- **Description:** Retrieve a coupon by its code.

### Create Coupon
- **POST** `/api/coupon/:userId`
- **Description:** Create a new coupon for a user.

### Create Coupon (Admin)
- **POST** `/api/coupon/`
- **Description:** Create a new coupon (admin access).

### Update Coupon
- **PUT** `/api/coupon/:couponId`
- **Description:** Update a coupon by ID.

### Delete Coupon
- **DELETE** `/api/coupon/:couponId`
- **Description:** Delete a coupon by ID.

## Offers

### Get All Offers
- **GET** `/api/offer/`
- **Description:** Retrieve a list of all offers.

### Create Offer
- **POST** `/api/offer/`
- **Description:** Create a new offer.

### Create Offer (Linked to another resource)
- **POST** `/api/offer/:CreateId`
- **Description:** Create an offer linked to another resource.

### Update Offer
- **PUT** `/api/offer/:id`
- **Description:** Update an offer by ID.

### Delete Offer
- **DELETE** `/api/offer/:id`
- **Description:** Delete an offer by ID.

## Cart

### Get User Cart
- **GET** `/api/cart/:userId`
- **Description:** Retrieve the cart for a user by ID.

### Add to Cart
- **POST** `/api/cart/add`
- **Description:** Add a product to the cart.

### Update Cart Item
- **PUT** `/api/cart/:id`
- **Description:** Update a cart item by ID.

### Delete Cart Item
- **DELETE** `/api/cart/:id`
- **Description:** Delete a cart item by ID.

## Address Management

### Get All Addresses
- **GET** `/api/address/`
- **Description:** Retrieve a list of all addresses.

### Create Address
- **POST** `/api/address/`
- **Description:** Create a new address.

### Update Address
- **PUT** `/api/address/:id/:id`
- **Description:** Update an address by ID.

### Delete Address
- **DELETE** `/api/address/:id`
- **Description:** Delete an address by ID.

## Reviews

### Get Reviews by Product ID
- **GET** `/api/review/:productId`
- **Description:** Retrieve reviews for a specific product by ID.

### Add Review
- **POST** `/api/review/:productId/:userId`
- **Description:** Add a review for a product by product ID and user ID.

### Delete Review
- **DELETE** `/api/review/:id`
- **Description:** Delete a review by ID.

## Orders

### Get User Orders
- **GET** `/api/order/:userId`
- **Description:** Retrieve all orders for a user by ID.

### Create Order
- **POST** `/api/order/`
- **Description:** Create a new order.

### Update Order
- **PUT** `/api/order/:orderId`
- **Description:** Update an order by ID.

## Payment

### Create Payment
- **POST** `/api/payment/create`
- **Description:** Create a new payment.

### Verify Payment
- **POST** `/api/payment/verify`
- **Description:** Verify a payment.

## Contributing
Feel free to fork the repository and submit pull requests for any features or bug fixes.

## License
This project is licensed under the MIT License.
