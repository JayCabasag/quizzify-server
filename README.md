# Quizzify Server

Welcome to the Quizzify Server repository! This repository contains the source code for a Web API server built using Nest JS and Mongo DB Atlas. Quizzify Server provides the backend functionality for the Quizzify application, allowing users to create, manage, and participate in quizzes.

## Getting Started

To get started with Quizzify Server, follow the steps below:

### Prerequisites

Make sure you have the following tools installed on your system:

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository using the following command:

```bash
git clone https://github.com/JayCabasag/quizzify-server.git
```

2. Change into the project directory:

```bash
cd quizzify-server
```

3. Install the dependencies:

```bash
npm install
```

### Configuration

Before running the server, you need to configure the MongoDB connection. Open the `.env` file in the project root directory and provide your MongoDB Atlas connection URI. You can obtain the connection URI from your MongoDB Atlas account.

```
MONGODB_URI=<your-mongodb-atlas-connection-uri>
```

### Starting the Server

To start the server, run the following command:

```bash
npm run start
```

This will start the server and it will be accessible at `http://localhost:4200`.

## Usage

Once the server is running, you can use it to interact with the Quizzify application by making HTTP requests to the available endpoints. Here are some of the main endpoints:

- `/quizzes`: This endpoint allows you to create new quizzes, retrieve a list of quizzes, and perform other CRUD operations on quizzes.
- `/users`: This endpoint allows you to manage user accounts, including user registration and authentication.
- `/questions`: This endpoint handles operations related to quiz questions, such as creating, updating, and deleting questions.

Please refer to the documentation or the source code for a complete list of available endpoints and their usage.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request to this repository. Make sure to follow the existing coding style and conventions.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This project was built using [Nest JS](https://nestjs.com/), a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- MongoDB Atlas was used as the database for this project. MongoDB Atlas is a cloud-based, fully managed MongoDB service provided by MongoDB.

Feel free to explore the codebase and adapt it to your needs. If you have any questions or need further assistance, please don't hesitate to reach out. Happy coding!
