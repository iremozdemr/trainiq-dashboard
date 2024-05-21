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

    function updateDashboard(teams) {
        const teamsContainer = document.getElementById("teams-container");

        teams.forEach(team => {
            const teamCard = document.createElement("div");
            teamCard.classList.add("ag-courses_item");

            teamCard.innerHTML = `
                <a href="#" class="ag-courses-item_link">
                    <div class="ag-courses-item_bg"></div>
                    <div class="ag-courses-item_title">${team.title}</div>
                    <div class="ag-courses-item_date-box">
                        Description: ${team.description}
                    </div>
                    <div class="ag-courses-item_date-box">
                        Total Members: ${team.total_employee_count}
                    </div>
                    <div class="ag-courses-item_date-box">
                        Overall Score: ${team.overall_score}
                    </div>
                    <div class="ag-courses-item_date-box">
                        <p>Employees:</p>
                        <ul>
                            ${team.employees.map(employee => `<li>${employee.name} - ${employee.title}</li>`).join('')}
                        </ul>
                    </div>
                </a>
            `;

            teamsContainer.appendChild(teamCard);
        });
    }

    function updateStatistics(totalEmployees, totalCourses, averageScore) {
        const totalEmployeesElement = document.querySelector(".total.employees .second-p");
        const totalCoursesElement = document.querySelector(".total.courses .second-p");
        const averageScoreElement = document.querySelector(".total.score .second-p");

        totalEmployeesElement.textContent = totalEmployees;
        totalCoursesElement.textContent = totalCourses;
        averageScoreElement.textContent = averageScore;
    }

    fetchData();
});