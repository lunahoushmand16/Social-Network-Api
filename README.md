# Kanban-Board-JWTs-Application

## Description

This is a backend API for a social networking web application. It allows users to share thoughts, react to friends' thoughts, and manage a friend list. The project is built using Express.js, MongoDB with Mongoose, and TypeScript. This application is tested via Insomnia and connects to a local MongoDB instance.

- **Motivation:** Build a real-world NoSQL application simulating the backend of a social media platform.
- **Purpose:** To demonstrate mastery of CRUD operations, schema design, and embedded documents using Mongoose.
- **Problem Solved:** Enables managing users, their thoughts, reactions, and social relationships all through API calls.
- **What I Learned:** Mongoose subdocuments, virtuals, Express routing, TypeScript integration, top-level async/await, and error handling in REST APIs.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
- [Link For Video](#link-for-video-section)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/lunahoushmand16/Social-Network-Api
   ```
2. Navigate to the project folder:
   ```sh
   cd Social-Network-Api 
   ```
3. Install dependencies:
    ```sh
   npm install
   ```
4. Start the MongoDB server (if not already running):
   ```env
   mongod
   ```
5. Start the application:

   ```sh
   npm run start
   ```

## Usage

- Use Insomnia to test the following API routes:

    - Friends: Add/Remove Friends

    - Thoughts: Create, Get All, Get by ID, Update, Delete

    - Reactions: Add/Delete Reactions to Thoughts

- All data is stored in MongoDB and visible via MongoDB Compass

### Screenshots:

![]()
![]()

## Credits

- Created by **[Luna Houshmans](https://github.com/lunahoushmand16)**
- Built with: 
  - **[Express.js](https://expressjs.com/)**
  - **[TypeScript](https://www.typescriptlang.org/)**
  - **[Mongoose](https://mongoosejs.com/)**
  - **[MongoDB Compass](https://www.mongodb.com/products/tools/compass)**

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Badges

![GitHub repo size](https://img.shields.io/github/repo-size/lunahoushmand16/Social-Network-Api)
![GitHub contributors](https://img.shields.io/github/contributors/lunahoushmand16/Social-Network-Api)
![GitHub stars](https://img.shields.io/github/stars/lunahoushmand16/Social-Network-Api?style=social)

## Features

- Full RESTful API for social network

- Create users with unique usernames and emails

- Add and remove friends

- Create thoughts and embedded reactions

- Schema validations and error handling

- Virtual fields for reaction and friend counts

- Time-stamped documents with formatted createdAt

- Modular file structure with ESM + TypeScript

## How to Contribute

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m 'Add feature X'`
4. Push changes: `git push origin feature-name`
5. Open a pull request

## Tests

1. Use [Insomnia](https://insomnia.rest/) to test all API endpoints
2. Confirm that creating, updating, and deleting users works as expected
3. Verify relationships (friends & thoughts) update properly
4. Test error messages and schema validations
5. View data in MongoDB Compass for visual verification

## Link For Video

[Live Demo Video]()