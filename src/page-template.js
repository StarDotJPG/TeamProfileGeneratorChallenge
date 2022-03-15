const generateRoleSpecificInfo = employee => {
    // generate the role-specific data points using only the current object
    if (employee.role == 'Engineer') {
        return `Github: 
            <a target="_blank" href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a>`;
    }
    if (employee.role == 'Intern') {
        return `School: ${employee.getSchool()}`;
    }
    if (employee.role == 'Manager') {
        return `Office Number: ${employee.officeNumber}`
    }
};

const generateRoleIcon = employee => {
    // generate the role-specific data points using only the current object
    if (employee.role == 'Engineer') {
        return `<i class="fas fa-glasses"></i> `;
    }
    if (employee.role == 'Intern') {
        return `<i class="fas fa-user-graduate"></i> `;
    }
    if (employee.role == 'Manager') {
        return `<i class="fas fa-mug-hot"></i> `
    }
}

const generateTeamCards = employees => {
    return `${employees.map(employee => {
        return `<div class="col-sm-3">
                    <div class="card shadow">
                        <div class="card-header bg-primary text-white font-weight-bold">
                            <h3>${employee.name}</h3>
                            <h4>${generateRoleIcon(employee)}${employee.role}</h4>
                        </div>
                        <div class="card-body bg-secondary">
                            <p class="card-text bg-light p-3 mb-2 rounded">Employee ID: ${employee.id}</p>
                            <p class="card-text bg-light p-3 mb-2 rounded">Email: 
                                <a href="mailto:${employee.email}">${employee.email}</a>
                            </p>
                            <p class="card-text bg-light p-3 mb-2 rounded">${generateRoleSpecificInfo(employee)}</p>
                        </div>
                    </div>
                </div>`})
        .join('')}`
}

module.exports = employees => {
    return `
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                            <title>Team Profile</title>
                            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
                            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
                            </head>
                            <body>
                                <header>
                                    <div class="w-100 p-3 text-center bg-danger text-white mb-5">
                                        <h1 class="">My Team</h1>
                                    </div>
                                </header>
                                <main class="w-75 mx-auto">
                                    <div class="card-deck justify-content-center">
                                        ${generateTeamCards(employees)}
                                    </div>
                                </main>
                            </body>
                        </html>
                        `;
};