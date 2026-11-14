# GitHub Repo Explorer

A React-based web application that helps developers explore GitHub repositories, discover projects, and view repository information through the GitHub API.

🔗 **Live Demo:** [GitHub Repo Explorer](https://github-repo-explorer-eta-six.vercel.app/)

## 📌 Overview

GitHub Repo Explorer provides a convenient interface for exploring repositories and accessing useful project information. It uses the GitHub API to retrieve repository data and presents it through an interactive web interface.

The project helped me strengthen my skills in React development, API integration, asynchronous JavaScript, and building responsive user interfaces.

## ✨ Features

- **Repository Exploration:** Explore GitHub repositories and their available information.
- **GitHub API Integration:** Retrieve repository data using API requests.
- **Repository Analytics:** Work with repository statistics and activity data where the GitHub API provides them.
- **Interactive UI:** Navigate repository information through a React-based interface.
- **Loading and Error Handling:** Handle API request states and unsuccessful responses.
- **Live Deployment:** Access the application online through Vercel.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Building reusable UI components |
| JavaScript (ES6+) | Application logic and data processing |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layouts |
| GitHub REST API | Fetching repository information and statistics |
| Git & GitHub | Version control and source code management |
| Vercel | Application deployment |

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- Git installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mansoorsk12/github-repo-explorer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd github-repo-explorer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

> Replace the repository URL and directory name above if your actual GitHub repository uses a different name.

## 🔌 API Integration

The application uses the GitHub REST API to retrieve repository information.

Examples of GitHub API endpoints that can be used for repository data and analytics include:

- Repository details: `GET /repos/{owner}/{repo}`
- Contributors: `GET /repos/{owner}/{repo}/stats/contributors`
- Commit activity: `GET /repos/{owner}/{repo}/stats/commit_activity`
- Code frequency: `GET /repos/{owner}/{repo}/stats/code_frequency`

Some statistics endpoints may return an empty response while GitHub calculates the data. API rate limits can also affect requests, particularly when using unauthenticated access.

## 🧠 Key Learnings

- Integrating REST APIs into React applications.
- Managing asynchronous API requests and application state.
- Displaying dynamic data in reusable components.
- Handling loading states, API errors, and rate limits.
- Using Git and GitHub for project development.
- Deploying a frontend application using Vercel.

## 🌐 Live Application

Try the deployed application:

**[Open GitHub Repo Explorer](https://github-repo-explorer-eta-six.vercel.app/)**

## 👨‍💻 Author

**Shaik Mansoor Sadhik**

- GitHub: [Mansoorsk12](https://github.com/Mansoorsk12)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/mansoorsadhik/)

---

⭐ If you find this project useful, consider starring the repository.
---
