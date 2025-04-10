# CredPal Fintech Application

This is a full-stack fintech application built with **NestJS** for the backend and **React** (with TypeScript) for the frontend. The application includes features such as user authentication, wallet management, and transaction handling.

---

## 🚀 **Features**

### Backend (NestJS)
- User authentication (JWT-based)
- Wallet management (balance retrieval, funding)
- Transaction management (deposit, withdrawal, transfer)
- API documentation with Swagger
- MySQL database integration with TypeORM

### Frontend (React)
- User registration and login with form validation (Formik + Yup)
- Wallet dashboard with balance display and funding options
- Transaction history with filters and pagination
- Responsive design with TailwindCSS and DaisyUI
- Theme toggle (light/dark mode)

---

## 🛠️ **Tech Stack**

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: MySQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Validation**: Class-validator
- **Documentation**: Swagger

### Frontend
- **Framework**: [React](https://reactjs.org/) with TypeScript
- **State Management**: Context API
- **Form Handling**: Formik + Yup
- **Styling**: TailwindCSS + DaisyUI
- **Routing**: React Router

---

## 📂 **Folder Structure**

### Backend
```
cred-pal-backend/
├── src/
│   ├── auth/           # Authentication module
│   ├── users/          # User module
│   ├── wallet/         # Wallet module
│   ├── transactions/   # Transactions module
│   ├── app.module.ts   # Main application module
│   └── main.ts         # Application entry point
├── test/               # E2E tests
├── .env                # Environment variables
└── package.json        # Backend dependencies and scripts
```

### Frontend
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # Context API for auth and theme
│   ├── pages/          # Application pages (login, register, dashboard)
│   ├── services/       # Axios API calls
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── tailwind.config.js  # TailwindCSS configuration
└── package.json        # Frontend dependencies and scripts
```

---

## ⚙️ **Setup Instructions**

### Prerequisites
- Node.js (v18+)
- MySQL (v8+)
- Yarn (preferred) or npm

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd cred-pal-backend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=credpal
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   yarn start:dev
   ```
5. Access the Swagger API documentation at `http://localhost:3000/api/docs`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn dev
   ```
4. Open the application in your browser at `http://localhost:5173`.

---

## 🧪 **Testing**

### Backend
- Run unit tests:
  ```bash
  yarn test
  ```
- Run e2e tests:
  ```bash
  yarn test:e2e
  ```

### Frontend
- Add unit tests for components and API logic using Jest or Vitest.

---

## 📖 **API Endpoints**

### Authentication
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login and retrieve a JWT token

### Wallet
- `GET /wallet/balance`: Retrieve wallet balance
- `POST /wallet/fund`: Fund the wallet

### Transactions
- `POST /transactions/deposit/:userId`: Deposit funds
- `POST /transactions/withdraw/:userId`: Withdraw funds
- `POST /transactions/transfer/:senderId/:receiverId`: Transfer funds
- `GET /transactions/balance/:userId`: Get user balance

---

## 🎨 **Frontend Features**

### Pages
- **Login**: User login with form validation
- **Register**: User registration with form validation
- **Dashboard**: Wallet balance, transaction history, and funding options


---

## 📝 **Future Enhancements**
- Add unit tests for frontend components
- Implement real-time updates for wallet balance and transactions
- Add multi-language support
- Enhance error handling and user feedback

---


