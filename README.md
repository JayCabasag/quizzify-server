# Quizzify Server

Welcome to the Quizzify Server! This server API has been developed using Nest.js and MongoDB to provide a powerful and efficient backend for the Quizzify application.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
Before you proceed with the installation, please make sure you have the following prerequisites:

- Node.js (>=12.0.0)
- MongoDB

## Installation
To get started with the Quizzify Server, follow these steps:

1. Clone the repository to your local machine:
   ```shell
   git clone https://github.com/your-username/quizzify-server.git
   ```

2. Navigate to the project directory:
   ```shell
   cd quizzify-server
   ```

3. Install the dependencies:
   ```shell
   npm install
   ```

## Configuration
The server can be configured using environment variables. Create a `.env` file in the root directory of the project and set the following variables:

- `PORT`: The port number on which the server will run (default: `3000`).
- `MONGODB_URI`: The URI of the MongoDB database.

Example `.env` file:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/quizzify
```

## Usage
To start the Quizzify Server, run the following command:
```shell
npm start
```

The server will start running on the configured port (default: `3000`). You can now access the API using the specified endpoints.

## Endpoints
The following endpoints are available in the Quizzify Server API:

- `GET /questions`: Retrieve all questions.
- `GET /questions/:id`: Retrieve a question by ID.
- `POST /questions`: Create a new question.
- `PUT /questions/:id`: Update a question by ID.
- `DELETE /questions/:id`: Delete a question by ID.

Please refer to the API documentation or source code for more details on the request/response structure and available endpoints.

## Contributing
Contributions to the Quizzify Server are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

When contributing, please ensure to follow the existing coding style and conventions. Also, make sure to update the documentation and tests as needed.

## License
The Quizzify Server is open-source software released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and distribute it as per your needs. See the `LICENSE` file for more details.
