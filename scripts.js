let loggedInUserId = null;

function getUserData(userId) {
  return userData.find((user) => user.id === userId);
}

function checkCredentials(username, password) {
  const user = userData.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    loggedInUserId = user.id;
    return true;
  }

  return false;
}

function showLoginResult(isLoggedIn) {
  const loginForm = document.getElementById("login-form");
  const result = document.getElementById("login-result");
  const infoTable = document.getElementById("info-table");
  result.textContent = isLoggedIn ? "¡Acceso exitoso!" : "Credenciales incorrectas. Inténtalo de nuevo.";
  result.style.display = "block";
  result.style.color = isLoggedIn ? "green" : "red";

  if (isLoggedIn) {
    loginForm.style.display = "none";
    infoTable.style.display = "block";
    createChart1();
    createChart2();
  } else {
    loginForm.style.display = "block";
    infoTable.style.display = "none";
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const isLoggedIn = checkCredentials(username, password);
  showLoginResult(isLoggedIn);
}

function logout() {
  const loginForm = document.getElementById("login-form");
  const result = document.getElementById("login-result");
  const infoTable = document.getElementById("info-table");

  loginForm.style.display = "block";
  infoTable.style.display = "none";
  result.style.display = "none";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  loggedInUserId = null;
}
function downloadExcel() {
  const user = userData.find((user) => user.username === "RonyG");
  const funds = user.funds;

  const ws = XLSX.utils.json_to_sheet(funds, {
    header: ["month", "income", "expenses"],
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Fondos");

  XLSX.writeFile(wb, "fondos.xlsx");
}

function createChart1() {
  const user = getUserData(loggedInUserId);
  const fundsData = user.funds;

  const labels = fundsData.map((data) => data.month);
  const incomes = fundsData.map((data) => data.income);
  const expenses = fundsData.map((data) => data.expenses);

  const ctx = document.getElementById("chart1").getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Ingresos",
          data: incomes,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Gastos",
          data: expenses,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function createChart2() {
  const user = getUserData(loggedInUserId);
  const fundsData = user.funds;

  const labels = fundsData.map((data) => data.month);
  const balances = fundsData.map((data) => data.income - data.expenses);

  const ctx = document.getElementById("chart2").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Balance",
          data: balances,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
      tension: 0.4,
      fill: false,
    },
  ],
},
options: {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
},
});
}
