# Deployment Guide

## Overview
This guide covers the deployment process for Campus Hive in different environments (Development, Staging, and Production).

## Prerequisites

### System Requirements
- Linux server (Ubuntu 20.04 LTS recommended)
- Docker and Docker Compose
- Nginx
- SSL certificate
- Domain name

### Required Services
- PostgreSQL
- Redis
- ChromaDB
- OpenAI API access

## Deployment Options

### 1. Docker Deployment (Recommended)

#### Using Docker Compose
```bash
# Clone the repository
git clone https://github.com/yourusername/campus-hive.git
cd campus-hive

# Create .env file
cp .env.example .env
# Edit .env with production values

# Build and start containers
docker-compose -f docker-compose.prod.yml up -d
```

#### Docker Compose Configuration
```yaml
version: '3.8'

services:
  backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/campushive
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    environment:
      - NEXT_PUBLIC_API_URL=https://api.campushive.com

  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 2. Manual Deployment

#### Backend Deployment
```bash
# Install system dependencies
sudo apt update
sudo apt install python3.8 python3.8-venv nginx

# Set up Python environment
python3.8 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Set up Gunicorn
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

#### Frontend Deployment
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Build frontend
cd frontend
npm install
npm run build
```

## Nginx Configuration

```nginx
server {
    listen 80;
    server_name campushive.com www.campushive.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL Configuration

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d campushive.com -d www.campushive.com
```

## Monitoring and Maintenance

### Health Checks
```bash
# Check backend health
curl https://api.campushive.com/health

# Check frontend status
curl https://campushive.com/status
```

### Backup Procedures
```bash
# Database backup
pg_dump -U postgres campushive > backup.sql

# ChromaDB backup
cp -r /path/to/chroma/data /path/to/backup
```

### Logging
```bash
# View backend logs
docker-compose logs -f backend

# View frontend logs
docker-compose logs -f frontend
```

## Scaling

### Horizontal Scaling
- Use load balancer (e.g., Nginx, HAProxy)
- Implement database replication
- Use Redis for session management

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching strategies

## Security Considerations

1. **SSL/TLS**
   - Enable HTTPS
   - Use strong cipher suites
   - Implement HSTS

2. **Firewall**
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

3. **Security Headers**
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN";
   add_header X-XSS-Protection "1; mode=block";
   add_header X-Content-Type-Options "nosniff";
   ```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check PostgreSQL logs
   - Verify connection string
   - Check firewall rules

2. **API Timeouts**
   - Check server resources
   - Verify network connectivity
   - Review Nginx configuration

3. **Memory Issues**
   - Monitor system resources
   - Check for memory leaks
   - Optimize application code

## Rollback Procedures

```bash
# Revert to previous version
git checkout <previous-version>
docker-compose down
docker-compose up -d

# Restore database backup
psql -U postgres campushive < backup.sql
```

## Support

For deployment support:
- Email: deploy-support@campushive.com
- Documentation: https://docs.campushive.com/deployment
- Slack: #deployment-support 