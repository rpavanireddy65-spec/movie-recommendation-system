// ==========================================
// MOVIE DATASET
// ==========================================

const movies = [

    {
        title: "Interstellar",
        genre: ["Sci-Fi", "Drama", "Adventure"],
        language: "English",
        rating: 8.7,
        mood: ["Emotional", "Adventurous"],
        year: 2014,
        emoji: "🚀",
        description: "A journey through space, time and human survival."
    },

    {
        title: "Inception",
        genre: ["Action", "Sci-Fi", "Thriller"],
        language: "English",
        rating: 8.8,
        mood: ["Excited", "Adventurous"],
        year: 2010,
        emoji: "🌀",
        description: "A skilled team enters dreams to perform an impossible mission."
    },

    {
        title: "3 Idiots",
        genre: ["Comedy", "Drama"],
        language: "Hindi",
        rating: 8.4,
        mood: ["Happy", "Emotional"],
        year: 2009,
        emoji: "🎓",
        description: "Three friends experience friendship, college and life."
    },

    {
        title: "Baahubali",
        genre: ["Action", "Drama", "Adventure"],
        language: "Telugu",
        rating: 8.0,
        mood: ["Excited", "Adventurous"],
        year: 2015,
        emoji: "⚔️",
        description: "An epic story of courage, family and a kingdom."
    },

    {
        title: "RRR",
        genre: ["Action", "Drama", "Adventure"],
        language: "Telugu",
        rating: 8.0,
        mood: ["Excited", "Adventurous"],
        year: 2022,
        emoji: "🔥",
        description: "Two revolutionaries form an extraordinary friendship."
    },

    {
        title: "The Notebook",
        genre: ["Romance", "Drama"],
        language: "English",
        rating: 7.8,
        mood: ["Emotional", "Relaxed"],
        year: 2004,
        emoji: "💌",
        description: "A romantic story about love, memories and relationships."
    },

    {
        title: "Toy Story",
        genre: ["Animation", "Comedy", "Adventure"],
        language: "English",
        rating: 8.3,
        mood: ["Happy", "Relaxed"],
        year: 1995,
        emoji: "🧸",
        description: "A group of toys experience an unforgettable adventure."
    },

    {
        title: "Dangal",
        genre: ["Drama", "Action"],
        language: "Hindi",
        rating: 8.3,
        mood: ["Emotional", "Adventurous"],
        year: 2016,
        emoji: "🏆",
        description: "A father trains his daughters to become wrestling champions."
    },

    {
        title: "Avengers: Endgame",
        genre: ["Action", "Adventure", "Sci-Fi"],
        language: "English",
        rating: 8.4,
        mood: ["Excited", "Adventurous"],
        year: 2019,
        emoji: "🦸",
        description: "Heroes unite for their final battle to save the universe."
    },

    {
        title: "Zindagi Na Milegi Dobara",
        genre: ["Comedy", "Drama", "Adventure"],
        language: "Hindi",
        rating: 8.2,
        mood: ["Happy", "Adventurous", "Relaxed"],
        year: 2011,
        emoji: "🌊",
        description: "Three friends discover adventure, friendship and life."
    },

    {
        title: "Arjun Reddy",
        genre: ["Romance", "Drama"],
        language: "Telugu",
        rating: 7.6,
        mood: ["Emotional"],
        year: 2017,
        emoji: "❤️",
        description: "An intense relationship drama about love and personal choices."
    },

    {
        title: "Spider-Man",
        genre: ["Action", "Adventure"],
        language: "English",
        rating: 7.9,
        mood: ["Excited", "Adventurous"],
        year: 2002,
        emoji: "🕷️",
        description: "A young hero learns to use his powers responsibly."
    }

];


// ==========================================
// USER PREFERENCES
// ==========================================

let selectedGenres = [];

let selectedMood = "";

let favorites = [];


// ==========================================
// GENRE SELECTION
// ==========================================

document.querySelectorAll(".genre").forEach(button => {

    button.addEventListener("click", function () {

        const genre = this.dataset.genre;

        if (selectedGenres.includes(genre)) {

            selectedGenres =
                selectedGenres.filter(
                    item => item !== genre
                );

            this.classList.remove("selected");

        } else {

            selectedGenres.push(genre);

            this.classList.add("selected");

        }

    });

});


// ==========================================
// MOOD SELECTION
// ==========================================

document.querySelectorAll(".mood").forEach(button => {

    button.addEventListener("click", function () {

        document.querySelectorAll(".mood")
            .forEach(btn =>
                btn.classList.remove("selected")
            );

        this.classList.add("selected");

        selectedMood =
            this.dataset.mood;

    });

});


// ==========================================
// GET RECOMMENDATIONS
// ==========================================

function getRecommendations() {

    const language =
        document.getElementById("language").value;

    const minRating =
        Number(
            document.getElementById("rating").value
        );

    const search =
        document.getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    /*
       Calculate a personalized score
       for every movie.
    */

    let results = movies.map(movie => {

        let score = 0;


        // Genre matching

        selectedGenres.forEach(genre => {

            if (movie.genre.includes(genre)) {

                score += 30;

            }

        });


        // Language matching

        if (
            language !== "Any" &&
            movie.language === language
        ) {

            score += 20;

        }


        // Mood matching

        if (
            selectedMood &&
            movie.mood.includes(selectedMood)
        ) {

            score += 20;

        }


        // Rating

        if (movie.rating >= minRating) {

            score += 15;

        }


        // Search

        if (search !== "") {

            if (
                movie.title
                    .toLowerCase()
                    .includes(search)
            ) {

                score += 50;

            }

        }


        // Rating bonus

        score += movie.rating;


        return {
            ...movie,
            score: score
        };

    });


    // Remove movies below minimum rating

    if (minRating > 0) {

        results =
            results.filter(
                movie => movie.rating >= minRating
            );

    }


    // Sort according to preference score

    results.sort(
        (a, b) => b.score - a.score
    );


    // Take top 8

    results =
        results.slice(0, 8);


    displayMovies(results);

    document.getElementById(
        "recommendations"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// DISPLAY MOVIES
// ==========================================

function displayMovies(results) {

    const grid =
        document.getElementById("movieGrid");


    if (results.length === 0) {

        grid.innerHTML = `

            <div class="empty-state">

                <div>😕</div>

                <h3>No matching movies found</h3>

                <p>
                    Try changing your preferences.
                </p>

            </div>

        `;

        return;

    }


    document.getElementById(
        "recommendationMessage"
    ).textContent =
        `We found ${results.length} movies that match your preferences.`;


    grid.innerHTML = "";


    results.forEach(movie => {

        const match =
            Math.min(
                98,
                Math.round(
                    65 + movie.score / 5
                )
            );


        const card =
            document.createElement("div");

        card.className =
            "movie-card";


        card.innerHTML = `

            <div class="poster">

                ${movie.emoji}

            </div>


            <div class="movie-info">

                <button
                    class="favorite"
                    onclick="toggleFavorite('${movie.title}')"
                    id="fav-${movie.title.replace(/\s/g, '')}"
                >
                    ♡
                </button>


                <h3>
                    ${movie.title}
                </h3>


                <div class="movie-meta">

                    ⭐ ${movie.rating}
                    &nbsp; • &nbsp;
                    ${movie.year}
                    &nbsp; • &nbsp;
                    ${movie.language}

                </div>


                <div class="movie-meta">

                    ${movie.genre.join(" • ")}

                </div>


                <p class="movie-description">

                    ${movie.description}

                </p>


                <div class="match">

                    ✨ ${match}% Match for You

                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}


// ==========================================
// FAVORITES
// ==========================================

function toggleFavorite(title) {

    if (favorites.includes(title)) {

        favorites =
            favorites.filter(
                movie => movie !== title
            );

    } else {

        favorites.push(title);

    }


    updateFavoriteCount();

    displayFavoriteState(title);

}


function displayFavoriteState(title) {

    const id =
        "fav-" +
        title.replace(/\s/g, "");

    const button =
        document.getElementById(id);


    if (!button) {
        return;
    }


    if (favorites.includes(title)) {

        button.textContent = "♥";

        button.classList.add("active");

    } else {

        button.textContent = "♡";

        button.classList.remove("active");

    }

}


function updateFavoriteCount() {

    document.getElementById(
        "favoriteCount"
    ).textContent =
        favorites.length;

}


// ==========================================
// SHOW FAVORITES
// ==========================================

function showFavorites() {

    if (favorites.length === 0) {

        alert(
            "You haven't added any favorite movies yet ❤️"
        );

        return;

    }


    alert(
        "Your favorite movies:\n\n" +
        favorites.join("\n")
    );

}


// ==========================================
// START DISCOVERING
// ==========================================

function startDiscovering() {

    document.getElementById(
        "discover"
    ).scrollIntoView({
        behavior: "smooth"
    });

}