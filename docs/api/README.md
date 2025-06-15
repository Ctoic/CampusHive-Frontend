# Campus Hive API Documentation

## Overview
The Campus Hive API provides endpoints for both student and faculty interactions with the chatbot system. This documentation covers all available endpoints, authentication methods, and usage examples.

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication
All API requests require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### Student Endpoints

#### Get Academic Information
```http
GET /student/academic-info
```
Returns comprehensive academic information including courses, programs, and requirements.

#### Get Faculty Profiles
```http
GET /student/faculty-profiles
```
Returns detailed information about faculty members and their expertise.

#### Get Course Schedule
```http
GET /student/schedule
```
Returns the current semester's course schedule.

### Faculty Endpoints

#### Create Announcement
```http
POST /faculty/announcements
```
Create and send announcements to specific classes.

#### Manage Assessments
```http
POST /faculty/assessments
```
Create and manage exams and quizzes.

#### Check Course Compliance
```http
GET /faculty/course-compliance
```
Verify course outline compliance with CLOs and PLOs.

### Common Endpoints

#### Chat Interface
```http
POST /chat
```
Main endpoint for interacting with the chatbot.

#### Publication Updates
```http
GET /publications
```
Get latest publication updates from faculty members.

## Error Handling
The API uses standard HTTP response codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## WebSocket Events
The API also supports real-time updates through WebSocket connections:

```javascript
const ws = new WebSocket('ws://localhost:8000/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle real-time updates
};
```

## Examples

### Python Example
```python
import requests

headers = {
    'Authorization': 'Bearer your_token',
    'Content-Type': 'application/json'
}

response = requests.get(
    'http://localhost:8000/api/v1/student/academic-info',
    headers=headers
)

print(response.json())
```

### JavaScript Example
```javascript
const response = await fetch('http://localhost:8000/api/v1/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your_token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'What are the course requirements for Computer Science?'
  })
});

const data = await response.json();
console.log(data);
```

## Best Practices
1. Always handle errors appropriately
2. Implement retry logic for failed requests
3. Cache responses when possible
4. Use WebSocket for real-time updates
5. Implement proper rate limiting on the client side

## Support
For API support, contact:
- Email: api-support@campushive.com
- Documentation: https://docs.campushive.com/api 