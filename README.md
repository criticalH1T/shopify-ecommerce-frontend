# ECommerce Frontend

## Overview
Welcome to our e-commerce platform, a comprehensive solution for online shopping that combines a user-friendly interface with robust functionality. This project is designed to emulate the seamless experience of popular e-commerce websites while offering additional features for both users and administrators.

### Key features

**1. User Registration and Authentication:**
- Users are required to register and authenticate to access certain features.
- User profiles ensure a personalized shopping experience and streamline the checkout process.

**2. Shopping Cart Functionality:**
- Users can easily browse through a wide range of products and add them to their shopping cart.
- Intuitive cart management allows users to review, modify, and remove items before proceeding to checkout.

**3. Secure Checkout with PayPal Integration:**
- Seamless and secure checkout process for users.
- Integration with PayPal (using the sandbox for development) to facilitate secure and convenient payment transactions.

**4. Responsive Design for Multiple Devices:**
- The platform is designed with a responsive layout, ensuring a seamless and visually appealing experience across various devices, including mobile phones, tablets, and desktop computers.

**5. Local Storage for Shopping Cart:**
- Implemented local storage to persist the shopping cart data even when the user refreshes the page or closes the browser.
- Users can pick up right where they left off, with their selected items still in the cart, enhancing the overall user experience.

**6. Session Storage and HTTP-only Cookie for JWT:**
- Authentication is managed using session storage, ensuring a secure and seamless login experience for users.
- Interactions with HTTP-only cookies which store sensitive information in a JWT and enhance the overall security of user authentication.

**7. Custom SCSS Styles:**
- All CSS styles have been crafted using SCSS without relying on any pre-existing frameworks.
- This approach showcases our skills in maintaining a clean and modular stylesheet for improved maintainability and customization.
- The project's user interface draws inspiration from the [Shopify "Taste" template](https://themes.shopify.com/themes/taste/styles/default/preview), ensuring a visually appealing and user-friendly design.

**8. Admin Dashboard with CRUD Functionality:**
- Administrators have access to a powerful dashboard for easy management of product-related data.
- CRUD (Create, Read, Update, Delete) operations enable administrators to manipulate product information without the need for direct database queries.

## Getting started
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Technologies Used:

- **Frontend:**
  - Framework: Angular 16.2
  - Styling: SCSS
  - State Management:
    - Custom implementation using services and parent-child component communication
  - UI Components:
    - Bootstrap Icons
  - Responsive Design:
    - Custom implementation using media queries
  - API Requests:
    - RxJS for handling asynchronous operations
    - Angular HttpClient for making API requests

- **Backend:**
  - Framework: Java with Spring Boot
  - Build Tool: Gradle
  - Java Version: 17
  - Key Dependencies:
    - Spring Boot Starter Data JPA
    - Spring Boot Starter Web
    - Lombok
    - PostgreSQL
    - Spring Boot Starter Validation
    - Spring Boot Starter Security
    - Spring Boot Starter Test
    - MapStruct 
    - JWT API 
    - Spring Boot Configuration Processor

- **Database:**
  - PostgreSQL 16.1

## How to Contribute:

We welcome contributions from the community to enhance and improve our e-commerce platform. Please refer to the [Contribution Guidelines](link/to/contribution/guidelines) for more information on how you can get involved.

Thank you for exploring our e-commerce platform. We hope you enjoy the shopping experience!
