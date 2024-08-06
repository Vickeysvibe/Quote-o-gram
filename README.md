# Quote-o-gram

Quote-o-gram is a text-based social media platform where users can share and discover inspiring quotes.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)


## Features

- User authentication and authorization
- Create, read, update, and delete posts
- Like and comment on posts
- Responsive design

## Getting Started

### Prerequisites

- Node.js >= 14.x
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/Quote-o-gram.git
   cd Quote-o-gram
   ```

2. **Install dependencies for the client and server:**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `server` directory and add the following:

   ```plaintext
   NODE_ENV=development
   PORT=8888
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**

   ```bash
   # Run server
   cd server
   npm start


   # Run client
   cd ../client
   npm start

   ```

## Usage

1. **Register and log in to your account.**
2. **Create a new post with your favorite quote.**
3. **Browse and interact with posts from other users.**
