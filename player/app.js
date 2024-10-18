// Playlist data
const playlist = [
    { title: "Echoes in the Code", artist: "GlamNeurofunk482", src: "Echoes in the Code.mp3", cover: "binary.jpeg" },
    { title: "Binary Echo", artist: "SynthWave101", src: "Binary Echo.mp3", cover: "echoes.jpeg" },
    { title: "Let's go!", artist: "RetroSynth", src: "letsGo.mp3", cover: "LetsGo.jpeg" },
    { title: "The Greatest Metal Song", artist: "Cyberpunk Collective", src: "The Greatest Metal Song.mp3", cover: "GreatestMetal.jpeg" },
    { title: "Code Fragments", artist: "AI Ensemble", src: "Code Fragments.mp3", cover: "fragments.jpeg" }
];

let currentTrackIndex = 0;

// Create audio object
const audio = new Audio();

// Get DOM elements
const playPauseBtn = document.getElementById('play-pause');
const stopBtn = document.getElementById('stop');
const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const volumeSlider = document.querySelector('.volume-slider');
const volumeDisplay = document.getElementById('volume-display');
const progressBar = document.querySelector('.progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const songTitleDisplay = document.getElementById('song-title');
const artistDisplay = document.getElementById('artist');
const albumCoverDisplay = document.getElementById('album-cover');
const playlistContainer = document.getElementById('playlist-items');

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
stopBtn.addEventListener('click', stopAudio);
previousBtn.addEventListener('click', playPreviousTrack);
nextBtn.addEventListener('click', playNextTrack);
volumeSlider.addEventListener('click', adjustVolume);
progressBar.addEventListener('click', seek);
audio.addEventListener('timeupdate', updateTimeDisplay);
audio.addEventListener('loadedmetadata', updateTimeDisplay);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', playNextTrack);

// Initialize playlist UI
function initializePlaylist() {
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${track.title} - ${track.artist}`;
        li.addEventListener('click', () => playTrack(index));
        playlistContainer.appendChild(li);
    });
}

// Play selected track
function playTrack(index) {
    currentTrackIndex = index;
    const track = playlist[currentTrackIndex];
    audio.src = track.src;
    songTitleDisplay.textContent = track.title;
    artistDisplay.textContent = track.artist;
    albumCoverDisplay.src = track.cover;
    audio.play();
    updatePlayPauseButton();
    highlightCurrentTrack();
}

// Highlight current track in playlist
function highlightCurrentTrack() {
    const playlistItems = playlistContainer.children;
    for (let i = 0; i < playlistItems.length; i++) {
        playlistItems[i].classList.remove('active');
    }
    playlistItems[currentTrackIndex].classList.add('active');
}

// Play/Pause function
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updatePlayPauseButton();
}

// Update play/pause button icon
function updatePlayPauseButton() {
    playPauseBtn.innerHTML = audio.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
}

// Stop function
function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    updatePlayPauseButton();
}

// Play previous track
function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrack(currentTrackIndex);
}

// Play next track
function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    playTrack(currentTrackIndex);
}

// Volume control function
function adjustVolume(e) {
    const volume = e.offsetX / volumeSlider.offsetWidth;
    audio.volume = volume;
    updateVolumeDisplay();
}

// Update volume display
function updateVolumeDisplay() {
    const volumePercent = Math.round(audio.volume * 100);
    volumeDisplay.textContent = `${volumePercent}%`;
    document.getElementById('volume-progress').style.width = `${volumePercent}%`;
}

// Time update function
function updateTimeDisplay() {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    totalTimeDisplay.textContent = formatTime(audio.duration);
}

// Time format function
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update progress bar
function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

// Seek function
function seek(e) {
    const seekTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;
    audio.currentTime = seekTime;
}

// Initialize the application
initializePlaylist();
updateVolumeDisplay();
playTrack(currentTrackIndex);