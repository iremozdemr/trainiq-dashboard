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
                        <h4>Description:</h4>
                        ${team.description}
                    </div>
                    <br>
                    <div class="ag-courses-item_date-box">
                        <h4>Total Members:</h4>
                        ${team.total_employee_count}
                    </div>
                    <br>
                    <div class="ag-courses-item_date-box">
                        <h4>Overall Score:</h4>
                        ${team.overall_score}
                    </div>
                    <br>
                    <div class="ag-courses-item_date-box">
                        <h4>Employees:</h4>
                        <ul>
                            ${team.employees.map(employee => `<li>${employee.name} - ${employee.title}</li>`).join('')}
                        </ul>
                    </div>
                    <br>
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

document.addEventListener("DOMContentLoaded", async function() {
    const API_URL = "https://demotrainiq.com/case/dashboard";

    async function fetchData() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data && data.data && data.data.activity_hours) {
                const groupedData = groupDataByDate(data.data.activity_hours);

                createLineChart(groupedData);
            } else {
                console.error("Invalid data format or missing activity hours data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function groupDataByDate(activityData) {
        const groupedData = {};

        activityData.forEach(entry => {
            const date = entry.date;
            if (!groupedData[date]) {
                groupedData[date] = {
                    hours: [],
                    lessonsTaken: [],
                    examsCompleted: []
                };
            }
            groupedData[date].hours.push(entry.hours);
            groupedData[date].lessonsTaken.push(entry.lessons_taken);
            groupedData[date].examsCompleted.push(entry.exams_completed);
        });

        Object.keys(groupedData).forEach(date => {
            const data = groupedData[date];
            groupedData[date] = {
                hours: calculateAverage(data.hours),
                lessonsTaken: calculateAverage(data.lessonsTaken),
                examsCompleted: calculateAverage(data.examsCompleted)
            };
        });

        return groupedData;
    }

    function calculateAverage(values) {
        const sum = values.reduce((acc, curr) => acc + curr, 0);
        return sum / values.length || 0;
    }

    function createLineChart(data) {
        const chartContainer = document.getElementById("line-chart-container");

        const chartData = {
            labels: Object.keys(data),
            datasets: [
                {
                    label: "Hours",
                    data: Object.values(data).map(entry => entry.hours),
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: "Lessons Taken",
                    data: Object.values(data).map(entry => entry.lessonsTaken),
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: "Exams Completed",
                    data: Object.values(data).map(entry => entry.examsCompleted),
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    fill: false
                }
            ]
        };

        /*
        const lineChart = new Chart(chartContainer, {
            type: "line",
            data: chartData,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        */

        new Chart(chartContainer, {
            type: "line",
            data: chartData,
            options: {
              scales: {
                xAxes: [{
                  ticks: {
                    color: "red",
                    beginAtZero: true
                  }
                }]
              }
            }
        });
    }

    fetchData();
});