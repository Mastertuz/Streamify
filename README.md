# Streamify

A full-stack MERN application with TypeScript support for real-time communication and language learning.

## Project Structure

```
├── backend/          # Node.js + Express + TypeScript API
├── frontend/         # React + TypeScript frontend
└── README.md         # This file
```

## Backend (Node.js + Express + TypeScript)

Located in `/backend` directory.

### Features
- TypeScript support
- Express.js REST API
- MongoDB with Mongoose ODM
- JWT Authentication
- User management
- Cookie-based sessions
- Environment configuration

### Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser

### Getting Started

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with your environment variables:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Frontend (React + TypeScript)

Located in `/frontend` directory.

### Features
- React 18
- TypeScript support
- Vite build tool
- Modern React patterns

### Tech Stack
- React
- TypeScript
- Vite
- ESLint

### Getting Started

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/onboarding` - User onboarding (protected)

## Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mastertuz/Streamify.git
   cd Streamify
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables in `backend/.env`

5. Start both servers:
   - Backend: `npm run dev` (from backend directory)
   - Frontend: `npm run dev` (from frontend directory)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
