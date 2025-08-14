const audioElement = document.querySelector("audio");

const playButton = document.querySelector(".player-play-btn");
const playIcon = document.querySelector(".player-icon-play");
const pauseIcon = document.querySelector(".player-icon-pause");
const progress = document.querySelector(".player-progress");
const progressFilled = document.querySelector(".player-progress-filled");
const playerCurrentTime = document.querySelector(".player-time-current");
const playerDuration = document.querySelector(".player-time-duration");

const searchInput = document.querySelector("#search-input");

const playlist = document.querySelector(".playlist");
const songOne = document.querySelector(".song-1");
const songTwo = document.querySelector(".song-2");
const songThree = document.querySelector(".song-3");
const songFour = document.querySelector(".song-4");
const songFive = document.querySelector(".song-5");
// Adding new songs
const songSix = document.querySelector(".song-6");
const songSeven = document.querySelector(".song-7");
const songEight = document.querySelector(".song-8");
const songNine = document.querySelector(".song-9");
const songTen = document.querySelector(".song-10");

// NEW: volume slider
const volumeSlider = document.querySelector("#volume-slider");

const songs = [
    "songs/BIRDS OF A FEATHER.mp3",
    "songs/BLUE.mp3",
    "songs/LUNCH.mp3",
    "songs/THE GREATEST.mp3",
    "songs/WILDFLOWER.mp3",
    // Adding new songs
    "songs/THE DINER.mp3",
    "songs/SKINNY.mp3",
    "songs/CHIHIRO.mp3",
    "songs/LAMOUR DE MA VIE.mp3",
    "songs/BITTERSUITE.mp3"
];

audioElement.src = songs[0];

window.addEventListener("load", () => {

    // Player controls

    setTimes();

    audioElement.addEventListener("timeupdate", () => {
        setTimes();
        progressUpdate();
    });

    audioElement.addEventListener("ended", () => {
        playButton.dataset.playing = "false";
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
        progressFilled.style.flexBasis = "0%";
        audioElement.currentTime = 0;
        audioElement.duration = audioElement.duration;

        for (const song of songs) {
            if (audioElement.getAttribute("src") === song) {
                const currentSong = songs.indexOf(song);
                audioElement.src = songs[currentSong + 1];
                playSong(audioElement);
                break;
            }
        }

    });

    playButton.addEventListener("click", () => {

        if (playButton.dataset.playing === "false") {
            
            playSong(audioElement);

        } else if (playButton.dataset.playing === "true") {
            
            pauseSong(audioElement);

        }

    });

    function playSong(audio) {
        audio.play();

        playButton.dataset.playing = "true";
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
    }

    function pauseSong(audio) {
        audio.pause();

        playButton.dataset.playing = "false";
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
    }

    function setTimes() {
        const newCurrentTime = new Date(audioElement.currentTime * 1000);
        const newDuration = new Date(audioElement.duration * 1000);

        playerCurrentTime.textContent = newCurrentTime.getMinutes() + ':' + newCurrentTime.getSeconds();
        playerDuration.textContent = newDuration.getMinutes() + ':' + newDuration.getSeconds();
    }

    function progressUpdate() {
        const percent = (audioElement.currentTime / audioElement.duration) * 100;
        progressFilled.style.flexBasis = `${percent}%`;
    }

    function scrub (event) {
        const scrubTime = (event.offsetX / progress.offsetWidth) * audioElement.duration;
        audioElement.currentTime = scrubTime;
    }

    progress.addEventListener("click", scrub);
    progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
    progress.addEventListener("mousedown", () => (mousedown = true));
    progress.addEventListener("mouseup", () => (mousedown = false));


    // Playlist

    songOne.addEventListener("click", () => {
        audioElement.src = songs[0];
        playSong(audioElement);
    });

    songTwo.addEventListener("click", () => {
        audioElement.src = songs[1];
        playSong(audioElement);
    });

    songThree.addEventListener("click", () => {
        audioElement.src = songs[2];
        playSong(audioElement);
    });

    songFour.addEventListener("click", () => {
        audioElement.src = songs[3];
        playSong(audioElement);
    });

    songFive.addEventListener("click", () => {
        audioElement.src = songs[4];
        playSong(audioElement);
    });

    // Adding new songs
    songSix.addEventListener("click", () => {
        audioElement.src = songs[5];
        playSong(audioElement);
    });

    songSeven.addEventListener("click", () => {
        audioElement.src = songs[6];
        playSong(audioElement);
    });

    songEight.addEventListener("click", () => {
        audioElement.src = songs[7];
        playSong(audioElement);
    });

    songNine.addEventListener("click", () => {
        audioElement.src = songs[8];
        playSong(audioElement);
    });

    songTen.addEventListener("click", () => {
        audioElement.src = songs[9];
        playSong(audioElement);
    });

    // NEW: Volume control
    volumeSlider.addEventListener("input", () => {
        audioElement.volume = volumeSlider.value; // set audio volume based on slider
    });

});

// Search Box

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const songsElements = [songOne, songTwo, songThree, songFour, songFive, songSix, songSeven, songEight, songNine, songTen];

    songsElements.forEach(songEl => {
        const title = songEl.textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            songEl.style.display = "";  // reset to default to keep styling
        } else {
            songEl.style.display = "none";  // hide non-matching songs
        }
    });
});
