# Dashboard UI

Welcome to the Dashboard UI project! This repository contains the code for a front-end web application that displays data fetched from a backend API. The application presents an overview of teams, employees, and statistics for a learning platform of a fictional company.

Website link:

https://trainiq-dashboard.vercel.app

## Project Structure

```
.
├── css
│   └── style.css         # CSS styles for the project
├── js
│   └── script.js         # JavaScript for data fetching and DOM manipulation
├── index.html            # Main HTML file
└── README.md             # Project documentation
```

## Features

- **Responsive Design**: The dashboard is designed to be responsive and works well on various screen sizes.
- **Dynamic Data**: Data is fetched from a backend API and displayed dynamically.
- **Statistics Overview**: Displays general statistics such as total employees, total completed courses, and average employee score.
- **Teams Section**: Lists teams with detailed information about each team, including the team title, description, total members, overall score, and a list of employees.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript**
- **Fetch API**: For making network requests to the backend.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/iremozdemr/trainiq-dashboard.git
    ```

2. Navigate to the project directory:

    ```bash
    cd dashboard-ui
    ```

3. Open `index.html` in your web browser.

## API Details

The backend API endpoint used to fetch data is:

```
https://demotrainiq.com/case/dashboard
```

There is no authentication required for this endpoint, and data is fetched every time the page is opened.

## Code Explanation

### HTML (`index.html`)

The main structure of the dashboard is defined in the HTML file. It includes sections for the header, statistics, and teams.

### CSS (`css/style.css`)

The CSS file contains styles for the layout and appearance of the dashboard. It includes custom properties for colors, font settings, and responsive design rules.

### JavaScript (`js/script.js`)

The JavaScript file is responsible for:

- Fetching data from the backend API.
- Updating the DOM with the fetched data.
- Creating and displaying team cards dynamically.
- Updating statistics dynamically based on the fetched data.

### Example Data Fetching

Here's an example of how data is fetched and processed in the `script.js` file:

```javascript
document.addEventListener("DOMContentLoaded", function() {
    const API_URL = "https://demotrainiq.com/case/dashboard";

    async function fetchData() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data && data.data && data.data.teams) {
                updateDashboard(data.data.teams);
                updateStatistics(data.data.total_employees, data.data.total_completed_courses, data.data.average_employee_score);
            } else {
                console.error("Invalid data format or missing teams data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchData();
});
```

## Deployment

This website deployed using Vercel: 

https://trainiq-dashboard.vercel.app

## Contact

For any questions or further information, feel free to reach out.

Happy coding!

---