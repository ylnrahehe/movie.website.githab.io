console.log("Script is loaded");

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authLink = document.getElementById('auth-link');
    const errorMessage = document.getElementById('error-message');

    function checkLoginStatus() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            authLink.textContent = 'Logout';
            authLink.href = '#';
            authLink.addEventListener('click', logout);
        } else {
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
        }
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;

            const user = { name, email, username, password };
            localStorage.setItem('user', JSON.stringify(user));

            alert("Account created successfully! Please log in.");
            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const user = JSON.parse(localStorage.getItem('user'));

            if (user && user.username === username && user.password === password) {
                alert("Login successful!");
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = "profile.html";
            } else {
                errorMessage.textContent = "Invalid username or password.";
                errorMessage.style.display = "block";
            }
        });
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
        alert("You have been logged out.");
        window.location.href = "login.html";
    }

    checkLoginStatus();
});



    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;

            if (content.classList.contains('show')) {
                content.classList.remove('show');
            } else {
                content.classList.add('show');
            }
        });
    });

function playSound() {
    let clickSound = document.getElementById("clickSound");
    clickSound.play();
}

function openForm() {
    document.getElementById("popupOverlay").style.display = "block";
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupOverlay").style.display = "none";
    document.getElementById("popupForm").style.display = "none";
}

function updateDateTime() {
    const now = new Date();

    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const formattedDateTime = now.toLocaleString('en-US', options);
    document.getElementById('date-time').textContent = formattedDateTime;
}

updateDateTime();

setInterval(updateDateTime, 60000);


const movies = [
    {
        title: "Inception",
        releaseYear: 2010,
        genre: "Sci-Fi",
        description: "A mind-bending thriller about dream invasion and extraction."
    },
    {
        title: "The Dark Knight",
        releaseYear: 2008,
        genre: "Action",
        description: "Batman faces off against the Joker in this iconic crime thriller."
    },
    {
        title: "Interstellar",
        releaseYear: 2014,
        genre: "Sci-Fi",
        description: "A space epic that explores time, love, and the survival of mankind."
    }
];

function renderMovies() {
    const moviesContainer = document.getElementById('movies-container');

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <h2>${movie.title}</h2>
            <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p>${movie.description}</p>
        `;

        moviesContainer.appendChild(movieCard);
    });
}

document.addEventListener('DOMContentLoaded', renderMovies);

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "dark";

    if (currentTheme === "light") {
        document.documentElement.classList.add("lightstyle");
        themeToggle.classList.add("light-mode");
    } else {
        themeToggle.classList.add("dark-mode");
    }

    themeToggle.textContent = currentTheme === "light" ? "Dark Mode" : "Light Mode";

    themeToggle.addEventListener("click", () => {
        if (document.documentElement.classList.contains("lightstyle")) {
            document.documentElement.classList.remove("lightstyle");
            themeToggle.classList.remove("light-mode");
            themeToggle.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "Light Mode";
        } else {
            document.documentElement.classList.add("lightstyle");
            themeToggle.classList.remove("dark-mode");
            themeToggle.classList.add("light-mode");
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "Dark Mode";
        }
    });
});

function filterTable() {
    const imdbMin = parseFloat(document.getElementById('imdbMin').value) || 0;
    const imdbMax = parseFloat(document.getElementById('imdbMax').value) || 10;
    const rtMin = parseFloat(document.getElementById('rtMin').value) || 0;
    const rtMax = parseFloat(document.getElementById('rtMax').value) || 100;
    const metaMin = parseFloat(document.getElementById('metaMin').value) || 0;
    const metaMax = parseFloat(document.getElementById('metaMax').value) || 100;

    localStorage.setItem('filterSettings', JSON.stringify({
        imdbMin,
        imdbMax,
        rtMin,
        rtMax,
        metaMin,
        metaMax
    }));

    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const imdbScore = parseFloat(row.cells[1].innerText.split('/')[0]);
        const rtScore = parseFloat(row.cells[2].innerText.replace('%', ''));
        const metaScore = parseFloat(row.cells[3].innerText.split('/')[0]);

        const imdbMatch = imdbScore >= imdbMin && imdbScore <= imdbMax;
        const rtMatch = rtScore >= rtMin && rtScore <= rtMax;
        const metaMatch = metaScore >= metaMin && metaScore <= metaMax;

        if (imdbMatch && rtMatch && metaMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function loadFilterSettings() {
    const savedFilters = JSON.parse(localStorage.getItem('filterSettings'));

    if (savedFilters) {
        document.getElementById('imdbMin').value = savedFilters.imdbMin;
        document.getElementById('imdbMax').value = savedFilters.imdbMax;
        document.getElementById('rtMin').value = savedFilters.rtMin;
        document.getElementById('rtMax').value = savedFilters.rtMax;
        document.getElementById('metaMin').value = savedFilters.metaMin;
        document.getElementById('metaMax').value = savedFilters.metaMax;

        filterTable();
    }
}

function clearFilter() {
    document.getElementById('imdbMin').value = '';
    document.getElementById('imdbMax').value = '';
    document.getElementById('rtMin').value = '';
    document.getElementById('rtMax').value = '';
    document.getElementById('metaMin').value = '';
    document.getElementById('metaMax').value = '';

    localStorage.removeItem('filterSettings');

    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
}

window.onload = loadFilterSettings;

function toggleMenu() {
    document.getElementById("navbar").classList.toggle("open");
}


