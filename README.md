# Quizzify API Server

[![Build Status](https://travis-ci.org/{your_username}/{your_repo}.svg?branch=master)](https://travis-ci.org/{your_username}/{your_repo})
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Quizzify API Server is a RESTful API server developed using Nest JS and MongoDB, designed to handle quiz-related functionalities. It provides endpoints to create quizzes, manage questions and answers, and track user progress. This API server can be used as a backend for any quiz application or learning platform.

## Features

- User authentication and authorization using JWT (JSON Web Tokens)
- Create, update, and delete quizzes
- Manage questions and answers for each quiz
- Track user progress and scores
- Flexible and scalable architecture built with Nest JS
- Integration with MongoDB for data storage

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/{your_username}/{your_repo}.git
   ```

2. Install the dependencies:

   ```bash
   cd {your_repo}
   npm install
   ```

3. Set up the environment variables:
   
   - Rename the `.env.example` file to `.env`.
   - Update the values in the `.env` file to match your configuration.

4. Start the development server:

   ```bash
   npm run start:dev
   ```

   The server will be running at `http://localhost:3000` by default.

5. (Optional) Run the tests:

   ```bash
   npm run test
   ```

## API Documentation

The API documentation is generated using Swagger and can be accessed by running the server and visiting `http://localhost:3000/docs` in your browser. It provides detailed information about the available endpoints, request payloads, and response structures.

## Authentication

The API server uses JWT (JSON Web Tokens) for authentication. To access protected endpoints, you need to include an `Authorization` header with the value `Bearer <token>`, where `<token>` is the JWT obtained after a successful login.

## Usage

To use the Quizzify API Server, you can make HTTP requests to the available endpoints using a tool like cURL or an API client like Postman or Insomnia.

For example, to create a new quiz, you can send a `POST` request to the `/quizzes` endpoint with the necessary payload:

```http
POST /quizzes HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "My Quiz",
  "description": "A quiz about general knowledge",
  "questions": [
    {
      "text": "What is the capital of France?",
      "answers": [
        {
          "text": "Paris",
          "isCorrect": true
        },
        {
          "text": "London",
          "isCorrect": false
        },
        {
          "text": "Madrid",
          "isCorrect": false
        },
        {
          "text": "Berlin",
          "isCorrect": false
        }
      ]
    },
    ...
  ]
}
```

Please refer to the API documentation for a complete list of available endpoints and their respective payloads.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request to this repository.

Before submitting a pull request, make sure to:

- Follow the existing coding style and conventions.
- Write clear commit messages and provide a detailed description of your changes.
- Update the documentation if necessary.

## License

This

 project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
