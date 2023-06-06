const songList = [
    {
        title: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover: "img1.jpg",
    },

    {
        title: "A New Benning",
        file: "Anewbenning.mp3",
        cover: "img2.jpg",
    },

    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "img3.jpg",
    }
]


// indice cancion.
let songIndex = 0;



// Capturar elementos del DOM para trabajar con js.
const songs = document.querySelector(".songs");
const audio = document.querySelector("#audio");
const cover = document.querySelector("#cover");
const title = document.querySelector(".title");
const back = document.querySelector("#back");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");


  // Actualizar progreso.
  audio.addEventListener("timeupdate", updateProgress)
  function updateProgress() {
        const {currentTime, duration} = audio;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + "%";        
    }
   

// Configurar progreso de la barra al hace clic.
progressBar.addEventListener("click", setProgress);
function setProgress(event) {
    const progressBarWidth = this.offsetWidth;
    const clickPositionX = event.offsetX;
    const clickPercentage = (clickPositionX / progressBarWidth) * 100;
    const duration = audio.duration;
    const seekTime = (clickPercentage / 100) * duration;
    audio.currentTime = seekTime;
}

//Cargar canciones y mostrar listado.
function loadSongs() {
    songList.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li");
        // Crear a
        const link = document.createElement("a");
        // Hidratar a
        link.textContent = song.title;
        link.href = "#";
        // Clicks
        link.addEventListener("click", () => loadSong(index));
        // Añadir a li
        li.appendChild(link);
        // Añadir li a ul
        songs.appendChild(li);
        if(index === 0) {
            changeCover(index);
        }
    })
}

// Cargar cancion Seleccionada
function loadSong(songIndex) {  
    audio.src = "./Audios/" + songList[songIndex].file;
    togglePlay();
    changeCover(songIndex);
    changeTitle(songIndex);
    
}

function togglePlay() { 
play.addEventListener("click", togglePlay);
    if (audio.paused) {
      audio.play();
      play.classList.remove("fa-play");
      play.classList.add("fa-pause");
    } else {
      audio.pause();
      play.classList.remove("fa-pause");
      play.classList.add("fa-play");
    }
  }

  function nextSong() {
    songIndex++;
    if (songIndex >= songList.length) {
      songIndex = 0;
    }
    loadSong(songIndex);
  }
  next.addEventListener("click", nextSong)

  function previusSong() {
    songIndex--;    
    if (songIndex < 0){
        songIndex = songList.length -1;
    }
    loadSong(songIndex);
  }
  back.addEventListener("click", previusSong);

// Cambiar cover de la cancion.
function changeCover(songIndex) {
    cover.src = "./Img/" + songList[songIndex].cover;
}

// Camabiar Titulo con elemento de cancion.
function changeTitle(songIndex) {
    title.textContent = songList[songIndex].title;
}

// siguiente canción cuando concluya actual.
audio.addEventListener("ended", nextSong);


//GO!!!
 loadSongs(); 