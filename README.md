# Campus Hive

An intelligent RAG-based chatbot system designed to enhance the academic experience for both students and faculty members at universities.

## 🌟 Features

### For Students
- Comprehensive academic information access
- Course and program details
- Faculty profiles and expertise
- Real-time schedule updates
- Research and publication tracking
- University policy information

### For Faculty
- Daily task management
- Class announcement system
- Course outline compliance checker
- Assessment creation and management
- Publication tracking
- Schedule management

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/campus-hive.git
cd campus-hive
```

```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Initialize the database
```bash
python scripts/init_db.py
```

## 📁 Project Structure

```
campus-hive/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json

## 🔧 Configuration

### Environment Variables
```env
# Database
CHROMA_DB_PATH=./data/chroma
OPENAI_API_KEY=your_api_key

# Server
PORT=8000
HOST=localhost

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🛠️ Development


```

### Running the Frontend
```bash
cd frontend
npm run dev
```

## 📚 Documentation

### API Documentation
- [API Reference](docs/api/README.md)
- [Authentication](docs/api/auth.md)
- [Endpoints](docs/api/endpoints.md)

### Development Guide
- [Setup Guide](docs/development/setup.md)
- [Architecture](docs/development/architecture.md)
- [Contributing](docs/development/contributing.md)

### Deployment
- [Deployment Guide](docs/deployment/README.md)
- [Docker Setup](docs/deployment/docker.md)
- [Production Checklist](docs/deployment/production.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 📞 Support

For support, email support@campushive.com or join our Slack channel.

## 🔄 Updates

### Latest Updates
- Added voice interface support
- Implemented real-time publication tracking
- Enhanced faculty assistant features
- Improved student information retrieval

### Roadmap
- [ ] Multi-language support
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Integration with popular LMS systems
