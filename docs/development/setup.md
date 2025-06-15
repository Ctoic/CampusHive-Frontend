# Development Setup Guide

## Prerequisites

### System Requirements
- Python 3.8 or higher
- Node.js 16 or higher
- Git
- PostgreSQL (for production)
- Redis (for caching)

### Development Tools
- VS Code (recommended)
- Postman (for API testing)
- Docker (optional)

## Initial Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/campus-hive.git
cd campus-hive
```

### 2. Set Up Python Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Unix or MacOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Set Up Frontend
```bash
cd frontend
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/campushive
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=your_api_key
JWT_SECRET=your_jwt_secret

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development Workflow

### Running the Development Server

1. Start the Backend:
```bash
cd backend
uvicorn app.main:app --reload
```

2. Start the Frontend:
```bash
cd frontend
npm run dev
```

### Database Setup

1. Initialize the database:
```bash
python scripts/init_db.py
```

2. Run migrations:
```bash
alembic upgrade head
```

### Running Tests

1. Backend Tests:
```bash
pytest
```

2. Frontend Tests:
```bash
cd frontend
npm test
```

## Development Guidelines

### Code Style

#### Python
- Follow PEP 8 guidelines
- Use type hints
- Write docstrings for all functions and classes

#### JavaScript/TypeScript
- Follow ESLint configuration
- Use TypeScript for type safety
- Follow React best practices

### Git Workflow

1. Create a new branch for each feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "feat: your feature description"
```

3. Push to remote:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

### Documentation

- Update API documentation for new endpoints
- Add comments for complex logic
- Update README.md for major changes

## Common Issues and Solutions

### Database Connection Issues
- Check if PostgreSQL is running
- Verify database credentials in .env
- Ensure database exists

### API Connection Issues
- Check if backend server is running
- Verify API URL in frontend configuration
- Check CORS settings

### Frontend Build Issues
- Clear node_modules and reinstall
- Check for version conflicts
- Verify environment variables

## Additional Resources

- [API Documentation](../api/README.md)
- [Architecture Overview](./architecture.md)
- [Contributing Guidelines](./contributing.md)
- [Deployment Guide](../deployment/README.md) 