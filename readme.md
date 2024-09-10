# React Native POS System

## Project Description

This project is a front-end design for a restaurant Point of Sale (POS) system and online ordering platform built using React Native. It features an intuitive and visually appealing order-taking page designed to streamline the process of managing orders in a restaurant setting.

## Features

- Mobile-friendly order-taking interface
- Menu navigation and item selection
- Shopping cart functionality
- Order submission process
- Responsive design for both iOS and Android devices
- Styled with TailwindCSS for a modern, clean look
- Mock backend using JSON Server for menu items, categories, and order submission

## Technologies Used

- React Native
- TailwindCSS
- JSON Server (for mock backend)

## Project Structure

```
resturantPOS/
├── .expo/
├── .idea/
├── assets/
├── node_modules/
├── screens/
│   ├── checkoutScreen/
│   │   ├── billDetails.tsx
│   │   ├── cartItemCard.tsx
│   │   ├── CheckoutScreen.tsx
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   └── recommendationList.tsx
│   ├── landingScreen/
│   │   └── landingScreen.tsx
│   ├── menuScreen/
│   │   ├── cuisines.tsx
│   │   ├── foodAdvertisement.tsx
│   │   ├── goToCartBar.tsx
│   │   ├── header.tsx
│   │   ├── menuItem.tsx
│   │   └── menuScreen.tsx
│   └── OrderPlaced/
│       └── orderPlaced.tsx
├── .gitignore
├── app.config.js
├── App.js
├── babel.config.js
├── db.json
├── eas.json
```

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/avneet-singh843/resturantPOS.git
   cd resturantPOS
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a .env file in the root directory of the project:

   ```
   touch .env
   ```

4. Open the .env file and add the API base URL using your local IP address:

   ```
   API_BASE_URL=http://your-local-ip:3000
   ```

   Replace `your-local-ip` with your actual local IP address. You can find your IP address by:

   - On macOS/Linux: Open terminal and type `ifconfig`
   - On Windows: Open command prompt and type `ipconfig`

5. Start the JSON Server (mock backend):

   ```
   json-server --watch db.json --port 3000
   ```

6. Run the React Native app:
   ```
   npx expo start
   ```

## Screens

- **Landing Screen**: The initial screen users see when opening the app.
- **Menu Screen**: Displays food items, categories, and a cart bar.
- **Checkout Screen**: Shows order details, allows for modifications, and handles payment.
- **Order Placed**: Confirmation screen after a successful order.

## Configuration Files

- `app.config.js`: Expo configuration file
- `App.js`: Main application component
- `babel.config.js`: Babel configuration for the project
- `db.json`: Mock database for JSON Server
- `env.js`: Environment variable handling

## Screenshots

| ![1. Landing screen](https://github.com/user-attachments/assets/21942a33-555a-4bed-88dc-4f6020ca4aee) | ![2a. Menu](https://github.com/user-attachments/assets/096d9485-8b44-4f53-9527-0697facc0649)          |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| ![2b. Menu](https://github.com/user-attachments/assets/537c0cd1-0e5b-4130-b518-a11e75c8213f)          | ![3a. Checkout Cart](https://github.com/user-attachments/assets/9fe648d6-453c-4d32-871b-8fdf52d8de62) |
| ![3b. Checkout Cart](https://github.com/user-attachments/assets/de7a4cc9-bcd4-4e26-a142-cf97e6660643) | ![4. Order Placed](https://github.com/user-attachments/assets/be45ae8e-e86d-4355-bb4d-11639f066c3a)   |

## Demo Video

1. IOS

https://github.com/user-attachments/assets/74758270-d39f-43d5-ad53-18b794fc1933

2.  Android

https://github.com/user-attachments/assets/2e5fc494-39f4-4a5d-825a-847cbd20e788

## Design Choices and Implementation Notes

1. Consistent Branding: The app maintains a strong and cohesive brand identity through the prominent "Urban Cafe" logo and the use of a consistent color scheme, primarily blue, across the different screens.

2. Intuitive Navigation: The clear organization of the menu items, the intuitive quantity adjustment controls, and the seamless transition from the menu to the checkout screen enable users to navigate the app efficiently.

3. Visually Appealing Presentation: The use of appetizing food illustrations and icons enhances the visual appeal of the menu, making it easy for users to quickly identify and select their desired items.

4. Smooth User Experience: The implementation of smooth animations and transitions, such as the order confirmation screen, contributes to a polished and engaging user experience, making the app feel responsive and delightful to use.

5. Streamlined Checkout: The checkout screen provides a clear summary of the user's order, allowing them to review and complete the purchase with a single "Place Order" button, ensuring a straightforward checkout process.

## Contact

For any questions or feedback, please contact Avneet Singh at https://x.com/singhavneet317.
