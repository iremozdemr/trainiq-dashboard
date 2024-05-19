/*
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://demotrainiq.com/case/dashboard')
        .then(response => response.json())
        .then(data => {
            const parsedData = data.data;
            displayStats(parsedData);
            if (parsedData.teams && Array.isArray(parsedData.teams)) {
                displayTeams(parsedData.teams);
            } else {
                console.error('Teams data is not available or not in the correct format.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayStats(data) {
    const statsSection = document.getElementById('stats');
    statsSection.innerHTML = `
        <h2>General Statistics</h2>
        <p>Total Employees: ${data.total_employees}</p>
        <p>Total Completed Courses: ${data.total_completed_courses}</p>
        <p>Average Employee Score: ${data.average_employee_score}</p>
    `;
}

function displayTeams(teams) {
    const teamsSection = document.getElementById('teams');
    teamsSection.innerHTML = '<h2>Teams</h2>';
    
    teams.forEach(team => {
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        
        teamDiv.innerHTML = `
            <h3>${team.title}</h3>
            <p>Description: ${team.description}</p>
            <p>Total Members: ${team.total_employee_count}</p>
            <p>Overall Score: ${team.overall_score}</p>
            <div class="members">
                ${team.employees.map(member => `
                    <div class="member">
                        <h4>${member.name} (${member.title})</h4>
                        <p>Email: ${member.email}</p>
                        <p>Courses Taken: ${member.lessons_taken}</p>
                        <p>Current Score: ${member.current_score}</p>
                        <p>Skills Being Developed: ${member.skills_being_developed.join(', ')}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        teamsSection.appendChild(teamDiv);
    });
}
*/