# Royal Retail Store

A full-stack e-commerce application built with Next.js and Express.js, featuring a modern design and comprehensive shopping functionality.

## 🚀 Features

- **Frontend**: Next.js 14 with TypeScript, TailwindCSS, and Radix UI
- **Backend**: Express.js with MongoDB and JWT authentication
- **Auto-scrolling hero carousel** with hover pause functionality
- **Responsive design** with sticky navigation
- **Shopping cart** with real-time updates
- **Product management** with categories and variants
- **User authentication** with role-based access (admin/customer)
- **Image upload** with GridFS and AWS S3 support

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   
   # JWT Configuration (Generate secure secrets)
   ACCESS_TOKEN_SECRET=your_secure_access_token_secret_here
   REFRESH_TOKEN_SECRET=your_secure_refresh_token_secret_here
   
   # Admin Configuration
   ADMIN_EMAIL=admin@yourdomain.com
   
   # AWS S3 Configuration (Optional)
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_S3_BUCKET_NAME=your_bucket_name
   AWS_REGION=us-east-1
   
   # Frontend URL (for CORS in production)
   FRONTEND_URL=https://yourdomain.com
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables in `.env.local`:**
   ```env
   BACKEND_API=http://localhost:5000
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔐 Security Features

- **Environment-based configuration** (no hardcoded secrets)
- **Secure CORS setup** with environment-specific origins
- **JWT token authentication** with secure secret management
- **Role-based access control**
- **Input validation** with express-validator
- **Password hashing** with bcrypt

## 📦 API Documentation

The API documentation is available at `http://localhost:5000/api-docs` when the backend server is running.

## 🎨 Recent Improvements

- ✅ **Auto-scrolling hero carousel** with pause on hover
- ✅ **Cleaned up console.log statements** for production readiness
- ✅ **Fixed security vulnerabilities** (removed hardcoded credentials)
- ✅ **Improved CORS configuration** for better security
- ✅ **Environment-based admin setup**
- ✅ **Enhanced error handling** throughout the application

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in environment
2. Configure proper `MONGODB_URI` for production database
3. Set secure JWT secrets
4. Configure `FRONTEND_URL` for CORS

### Frontend
1. Run `npm run build` to create production build
2. Configure proper `BACKEND_API` URL
3. Deploy to your preferred hosting service

## 🔧 Development

### Database Seeding
The first user to register with the email specified in `ADMIN_EMAIL` will automatically be granted admin privileges.

### File Structure
```
royal-retails-store/
├── backend/
│   ├── server/
│   │   ├── Routes/         # API routes
│   │   ├── Models/         # Database models
│   │   ├── MiddleWare/     # Authentication middleware
│   │   ├── Config/         # Configuration files
│   │   └── utility/        # Helper utilities
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js 13+ app router
│   │   ├── components/    # React components
│   │   ├── actions/       # Server actions
│   │   └── types/         # TypeScript definitions
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Known Issues

Please check the Issues section of this repository for known bugs and feature requests.
