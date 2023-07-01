# Quizzify Server

Welcome to the Quizzify Server repository! This repository contains the source code for a Web API server built using Nest.js and MongoDB Atlas. Quizzify Server provides the backend functionality for the Quizzify application, allowing users to create, manage, and participate in quizzes.

## Prerequisites

Before running the Quizzify Server, ensure that you have the following installed:

- Node.js (v14 or above)
- npm (Node Package Manager)
- MongoDB Atlas account (or a local MongoDB installation)

## Getting Started

To get started with the Quizzify Server, follow these steps:

1. Clone the repository to your local machine:
   ```shell
   git clone https://github.com/your-username/quizzify-server.git
   ```

2. Navigate to the project directory:
   ```shell
   cd quizzify-server
   ```

3. Install the project dependencies:
   ```shell
   npm install
   ```

4. Create a `.env` file in the project root and provide the necessary environment variables. Below is an example of the required variables:

   ```plaintext
   MONGODB_URI=<your_mongodb_uri>
   PORT=<server_port>
   ```

   Replace `<your_mongodb_uri>` with the connection URI for your MongoDB database, and `<server_port>` with the desired port number for the server to listen on (e.g., `3000`).

5. Start the server:
   ```shell
   npm run start
   ```

6. The Quizzify Server should now be running locally at the specified port. You can access the server endpoints using a tool like Postman or cURL.

## Usage

The Quizzify Server provides the following API endpoints:

- `GET /api/v1/quizzes` - Retrieve a list of all quizzes.
- `GET /api/v1/quizzes/:id` - Retrieve a specific quiz by its ID.
- `POST /api/v1/quizzes` - Create a new quiz.
- `PUT /api/v1/quizzes/:id` - Update an existing quiz.
- `DELETE /api/v1/quizzes/:id` - Delete a quiz.

Refer to the API documentation or the source code for further details on how to use these endpoints.

## Contributing

Contributions to the Quizzify Server are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request. Please ensure to follow the project's code style and conventions.

## License

The Quizzify Server is open-source software released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it as per the terms of the license.

## Acknowledgements

The Quizzify Server was developed by [Your Name](https://github.com/your-username). Special thanks to the Nest.js and MongoDB communities for their excellent tools and resources.

Enjoy using the Quizzify Server and happy quizzing!