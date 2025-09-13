# Portfolio Backend API - Refactored

A clean, scalable Node.js/Express backend API for a portfolio website with internationalization support.

## 🚀 Features

- **Multi-language Support**: Built-in internationalization with locale-based content delivery
- **Modular Architecture**: Clean separation of concerns with organized folder structure
- **Error Handling**: Comprehensive error handling with custom error classes
- **Input Validation**: Request validation and sanitization middleware
- **Database Abstraction**: Reusable model schemas with common functionality
- **Health Monitoring**: Built-in health check endpoint
- **Graceful Shutdown**: Proper cleanup on server termination
- **CORS Support**: Configurable cross-origin resource sharing

## 📁 Project Structure

```
├── config/
│   ├── database.js          # Database connection management
│   └── environment.js       # Environment configuration
├── controllers/
│   └── controllers.js       # Request handlers with factory patterns
├── middleware/
│   ├── cors.js             # CORS configuration
│   ├── errorHandler.js     # Global error handling
│   └── validation.js       # Input validation middleware
├── models/
│   ├── BaseModel.js        # Reusable schema factory
│   ├── About.js            # About section model
│   ├── Experience.js       # Experience model
│   ├── Footer.js           # Footer model
│   ├── Icons.js            # Icons model
│   ├── Intro.js            # Introduction model
│   ├── Project.js          # Projects model
│   ├── Section.js          # Section model
│   ├── Social.js           # Social links model
│   └── Writing.js          # Writing/blog model
├── routes/
│   └── routes.js           # API route definitions
├── utils/
│   └── responseHelper.js   # Standardized API responses
└── server.js               # Application entry point
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-v2-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=8000
   NODE_ENV=development
   MONGO_DATABASE_USER=your_username
   MONGO_DATABASE_PASSWORD=your_password
   MONGO_DATABASE_CLUSTER=your_cluster
   MONGO_DATABASE_NAME=your_database_name
   CORS_ORIGIN=*
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 📡 API Endpoints

### Health Check
- `GET /health` - Server health status

### Content Endpoints (Require locale parameter)
- `GET /api/intro?locale=en-US` - Introduction content
- `GET /api/about?locale=en-US` - About section content
- `GET /api/section?locale=en-US` - Section content
- `GET /api/experience?locale=en-US` - Experience content
- `GET /api/project?locale=en-US` - Projects content
- `GET /api/writing?locale=en-US` - Writing/blog content
- `GET /api/footer?locale=en-US` - Footer content
- `GET /api/certifications?locale=en-US` - Certifications content

### Simple Endpoints (No locale required)
- `GET /api/social` - Social media links
- `GET /api/icon` - Icon data

## 🌐 Internationalization

The API supports multiple locales. Content endpoints require a `locale` query parameter:

```bash
# English (US)
curl "http://localhost:8000/api/intro?locale=en-US"

# Spanish (Spain)
curl "http://localhost:8000/api/intro?locale=es-ES"
```

If a translation for the requested locale is not found, the API falls back to the default language (en-US).

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3000 |
| `NODE_ENV` | Environment mode | No | development |
| `MONGO_DATABASE_USER` | MongoDB username | Yes | - |
| `MONGO_DATABASE_PASSWORD` | MongoDB password | Yes | - |
| `MONGO_DATABASE_CLUSTER` | MongoDB cluster | Yes | - |
| `MONGO_DATABASE_NAME` | Database name | Yes | - |
| `CORS_ORIGIN` | CORS origin | No | * |

### Database Configuration

The application uses MongoDB with Mongoose ODM. Connection is managed through the `config/database.js` module with automatic reconnection and graceful shutdown.

## 🛡️ Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: Input validation with detailed error messages
- **Database Errors**: Mongoose error handling with user-friendly messages
- **404 Errors**: Proper handling of undefined routes
- **500 Errors**: Internal server errors with optional stack traces in development

### Error Response Format

```json
{
  "success": false,
  "status": "fail|error",
  "message": "Error description",
  "errors": ["Detailed error messages"] // Optional
}
```

## ✅ Success Response Format

```json
{
  "success": true,
  "message": "Success message",
  "data": { /* Response data */ }
}
```

## 🔒 Security Features

- **Input Sanitization**: Removes potentially harmful script tags
- **CORS Protection**: Configurable cross-origin resource sharing
- **Environment Validation**: Ensures required environment variables are present
- **Error Information**: Sensitive error details hidden in production

## 🚀 Deployment

The application is production-ready with:

- Graceful shutdown handling
- Environment-based configuration
- Health check endpoint for monitoring
- Proper error logging
- Database connection management

## 📝 Development

### Adding New Models

1. Create a new model file in `models/` directory
2. Use `createTranslationSchema()` for internationalized content or `createSimpleSchema()` for simple data
3. Add the model to `controllers/controllers.js`
4. Create routes in `routes/routes.js`

### Adding Middleware

1. Create middleware function in `middleware/` directory
2. Export the middleware function
3. Apply to routes in `routes/routes.js` or globally in `server.js`

## 🔄 Refactoring Improvements

This codebase has been refactored with the following improvements:

### ✨ Code Organization
- **Modular Structure**: Separated concerns into logical modules
- **Configuration Management**: Centralized environment and database configuration
- **Middleware Organization**: Dedicated middleware for different concerns

### 🔧 Code Quality
- **DRY Principle**: Eliminated code duplication with factory patterns
- **Error Handling**: Comprehensive error handling with custom error classes
- **Input Validation**: Robust input validation and sanitization
- **Response Standardization**: Consistent API response format

### 🚀 Performance & Scalability
- **Database Connection**: Optimized connection management with pooling
- **Graceful Shutdown**: Proper cleanup on server termination
- **Memory Management**: Efficient resource usage

### 🛡️ Security
- **Input Sanitization**: Protection against XSS attacks
- **Environment Validation**: Ensures secure configuration
- **Error Information**: Controlled error information exposure

## 📄 License

This project is licensed under the ISC License.
