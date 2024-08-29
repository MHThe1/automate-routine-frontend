# Automate Routine Frontend

## 🚀 Live Demo
Live at: https://automate-routine.vercel.app/

## Overview

This frontend project is built using React and TailwindCSS and serves as the user interface for the course scheduling application. It interacts with the Django REST API backend to allow users to generate, view, and download routines based on their course preferences and scheduling needs.

## Features

- **User Interface**: Clean and modern design using React and TailwindCSS.
- **Form Inputs**: Allows users to enter course codes and details, select preferences, and generate schedules.
- **Pagination**: Displays paginated results for large sets of routines.
- **PDF Generation**: Option to download routines as PDF files.
- **Screenshots**: Capture and download routines as images.

## Installation

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/your-frontend-repository.git
    cd your-frontend-repository
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

    or, if you prefer yarn:

    ```bash
    yarn install
    ```

3. **Configure environment variables**

    Create a `.env` file in the root directory of the project and add the following environment variables:

    ```env
    REACT_APP_API_URL=http://localhost:8000/api
    ```

    Ensure you replace `http://localhost:8000/api` with the URL of your Django REST API backend if it differs.

4. **Run the development server**

    ```bash
    npm start
    ```

    or, if you prefer yarn:

    ```bash
    yarn start
    ```

5. **Open the application**

    Navigate to `http://localhost:3000` in your browser to view the application.

## Usage

### Form Inputs

The frontend provides input fields for users to enter multiple course codes and details. Users can specify their preferences, such as:

- **Course Codes**: Up to four (scaleable) course codes with optional details.
- **Avoid Time**: Time periods to avoid when generating routines.
- **Avoid Days**: Time periods to avoid when generating routines.
- **Min Days**: Minimum number of days a routine should span.
- **Max Days**: Maximum number of days a routine should span.

### Generating Routines

Click the "Generate Routine" button to send the form data to the backend and retrieve the generated routines. The results will be displayed in a paginated table format.

### Download Options

- **Download as Image**: Click the "Download Routine" button to capture and download the current routine as an image.

## Components

- **FormComponent**: Handles user input and form submission.
- **PaginationComponent**: Manages pagination controls for the routine results.
- **RoutineTable**: Displays the generated routines in a table format.
- **RoutineSnap**: A hidden component used to capture routines for image downloads.

## Development

### Running Tests

You can run tests using:

```bash
npm test
```

or, if you prefer yarn:

```bash
yarn test
```

## Code Style

Ensure that your code follows the project's coding standards and style guides. Use tools like ESLint and Prettier for linting and formatting.

## Contributing

Feel free to fork the repository, open issues, and submit pull requests. Ensure that any new features or fixes are well-tested and documented.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## 📧 Contact
If you have any questions, feel free to reach out:

Email: mehedihtanvir@gmail.com

GitHub: MHThe1

