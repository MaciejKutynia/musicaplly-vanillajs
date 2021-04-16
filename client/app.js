//header DOM Elements
const libraryButton = document.querySelector(".library");
const addButton = document.querySelector(".add");
const viewButton = document.querySelector(".view");
const searchButton = document.getElementById("search");
const searchInput = document.getElementById("search-bar");

//top container DOM Elements
const topContainer = document.querySelector(".top-container");
const acceptButton = document.getElementById("accept");
const rejectButton = document.getElementById("reject");

//container DOM Elements
const libraryContainer = document.querySelector(".library-container");
const container = document.querySelector(".tracks-container");

//Form DOM Elements
const uploadForm = document.querySelector(".upload-form");
const audioInput = document.getElementById("audio-input");
const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const closeButton = document.querySelector(".close");
const submitButton = document.getElementById("submit");
const audioLabelText = document.querySelector("#audio-label p");
const imageCheckbox = document.getElementById("check");
const imageFileInput = document.getElementById("image-input");
const imageLabelText = document.querySelector("#image-label p");
const imageLabel = document.getElementById("image-label");
const imageTextInput = document.getElementById("cover");

//Player DOM Elements
const playButtons = document.getElementById("play");
const player = document.querySelector(".player");
const toggleButton = document.querySelector(".toggle");
const cover = document.querySelector(".cover img");
const artistPlaceholder = player.querySelector(".track-info h4");
const titlePlaceholder = player.querySelector(".track-info p");
const currentTime = document.getElementById("current-time");
const endTime = document.getElementById("end-time");
const trackTimeInput = document.getElementById("track-time-input");
const controls = document.querySelector(".controls");
const controlButtons = controls.querySelectorAll(".icon");
const volumeButton = document.getElementById("volume");
const volumeInput = document.getElementById("volume-input");
const trackAnim = document.querySelector(".track-anim");

//Variables
let isPlaying = false,
  isLooped = false,
  itemIndex = 0,
  deleteButtons,
  addToLibraryButtons;
let trackItems, libraryItems;
const audio = document.querySelector("audio");
const messageContainer = document.querySelector(".message");
const layer = document.querySelector(".layer");
const loading = document.querySelector(".loading");
const latest = document.getElementById("latest");
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const defaultImage =
  "data:image/jpeg;base64,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";

window.addEventListener("keypress", (event) => {
  console.log(event.keyCode);
  console.log(event.key);
  if (event.keyCode === 13) {
    if (
      document.activeElement === searchInput ||
      document.activeElement === imageTextInput ||
      document.activeElement === audioInput ||
      document.activeElement === imageFileInput ||
      document.activeElement === artistInput ||
      document.activeElement === titleInput
    ) {
      document.activeElement.blur();
    }
  }
});

latest.addEventListener("click", () => {
  loading.classList.add("visible");
  removeAllChildNodes(container);
  getLatest();
});

//search event listeners
searchButton.addEventListener("click", function (event) {
  let query;
  event.preventDefault();
  loading.classList.add("visible");
  if (searchInput.value !== "") {
    query = searchInput.value;
  } else {
    query = undefined;
  }
  searchTrack(query);
  searchInput.value = "";
});

//Header event listeners
addButton.addEventListener("click", () => {
  uploadForm.classList.add("visible");
  layer.classList.add("active");
});

viewButton.addEventListener("click", function () {
  container.classList.toggle("list");
  libraryContainer.classList.toggle("list");
  if (container.classList.contains("list")) {
    this.children[0].classList.remove("fa-photo-video");
    this.children[0].classList.add("fa-list");
  } else {
    this.children[0].classList.remove("fa-list");
    this.children[0].classList.add("fa-photo-video");
  }
});

libraryButton.addEventListener("click", function () {
  this.classList.toggle("active");
  libraryContainer.classList.toggle("active");
  deleteButtons = libraryContainer.querySelectorAll(".remove");
  deleteButtons.forEach((item) => {
    item.addEventListener("click", (event) => {
      addToLibraryButtons = document.querySelectorAll(".add-library");
      addToLibraryButtons.forEach((button) => {
        if (button.parentElement.id === item.parentElement.id) {
          button.parentElement.children[0].style.display = "flex";
        }
      });
      let playlist = JSON.parse(localStorage.getItem("playlist"));
      playlist = playlist.filter((song) => song.id !== item.parentElement.id);
      localStorage.setItem("playlist", JSON.stringify(playlist));
      item.parentElement.remove();
    });
  });
  trackItemHandler();
});

//Top container event listeners
acceptButton.addEventListener("click", () => {
  topContainer.classList.remove("visible");
  uploadForm.classList.add("visible");
  layer.classList.add("active");
});

rejectButton.addEventListener("click", () => {
  topContainer.classList.remove("visible");
});

//Player event listeners
controlButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    switch (event.target.id) {
      case "step-backward":
        if (libraryContainer.classList.contains("active")) {
          itemIndex = (itemIndex + 1) % libraryItems.length;
          setPlayer(libraryItems[itemIndex], itemIndex);
          return;
        }
        itemIndex = (itemIndex - 1) % trackItems.length;
        if (itemIndex < 0) {
          itemIndex = trackItems.length - 1;
        }
        setPlayer(trackItems[itemIndex], itemIndex);
        break;
      case "volume":
        event.target.classList.toggle("volume");
        const mute = event.target.children[1];
        const vol = event.target.children[2];
        if (event.target.classList.contains("volume")) {
          mute.style.zIndex = 2;
          vol.style.zIndex = 1;
          audio.volume = 0;
        } else {
          mute.style.zIndex = 1;
          vol.style.zIndex = 2;
          audio.volume = volumeInput.value;
        }

        break;
      case "play":
        isPlaying = !isPlaying;
        event.target.classList.toggle("play");
        playButton(isPlaying, event.target);
        break;
      case "step-forward":
        if (libraryContainer.classList.contains("active")) {
          itemIndex = (itemIndex + 1) % libraryItems.length;
          setPlayer(libraryItems[itemIndex], itemIndex);
          return;
        }
        itemIndex = (itemIndex + 1) % trackItems.length;
        setPlayer(trackItems[itemIndex], itemIndex);
        break;
      case "repeat":
        event.target.classList.toggle("loop");
        isLooped = !isLooped;
        break;
    }
  });
});

audio.addEventListener("ended", () => {
  if (isLooped) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    return;
  }
  isPlaying = false;
  playButton(isPlaying, document.getElementById("play"));
  if (libraryContainer.classList.contains("active")) {
    itemIndex = (itemIndex + 1) % libraryItems.length;
    setPlayer(libraryItems[itemIndex], itemIndex);
    return;
  }
  itemIndex = (itemIndex + 1) % trackItems.length;
  currentTime.innerText = "0:00";
  endTime.innerText = "0:00";
  trackAnim.style.transform = "translate(-100%)";
  trackTimeInput.value = 0;
  setPlayer(trackItems[itemIndex], itemIndex);
});

toggleButton.addEventListener("click", () => {
  player.classList.toggle("hidden");
  toggleButton.classList.toggle("hidden");
  const up = toggleButton.children[0];
  const down = toggleButton.children[1];
  if (toggleButton.classList.contains("hidden")) {
    down.style.zIndex = 1;
    up.style.zIndex = 2;
  } else {
    down.style.zIndex = 2;
    up.style.zIndex = 1;
  }
});

volumeButton.addEventListener("mouseover", () => {
  volumeInput.classList.add("visible");
});

volumeButton.addEventListener("mouseleave", () => {
  volumeInput.classList.remove("visible");
});

volumeInput.addEventListener("change", function () {
  const { value } = this;
  audio.volume = value;
  document.getElementById("volume").classList.remove("volume");
  const mute = document.getElementById("volume").children[1];
  const vol = document.getElementById("volume").children[2];
  mute.style.zIndex = 1;
  vol.style.zIndex = 2;
});

trackTimeInput.addEventListener("change", function () {
  const { value } = this;
  audio.currentTime = value;
});

//Upload form event listeners

imageCheckbox.addEventListener("change", function () {
  if (this.checked) {
    imageTextInput.style.display = "flex";
    imageLabel.style.display = "none";
  } else {
    imageLabel.style.display = "flex";
    imageTextInput.style.display = "none";
  }
});

closeButton.addEventListener("click", () => {
  uploadForm.classList.remove("visible");
  layer.classList.remove("active");
});

audioInput.addEventListener("change", function () {
  if (this.files.length === 0) {
    audioLabelText.innerText = "Załącz plik lub upuść tutaj";
    return;
  }
  audioLabelText.innerText = this.files[0].name;
});

imageFileInput.addEventListener("change", function () {
  if (this.files.length === 0) {
    imageLabelText.innerText = "Załącz plik lub upuść tutaj";
    return;
  }
  imageLabelText.innerText = this.files[0].name;
});

//Save new track
submitButton.addEventListener("click", async function (event) {
  event.preventDefault();
  if (audioInput.files.length === 0) {
    this.style.background = "red";
    showMessage("Plik mp3 musi być załączony");
    setTimeout(() => {
      this.style.background = "white";
    }, 1000);
    return;
  }
  let artist, name, cover;
  if (artistInput.value === "" || titleInput.value === "") {
    artist = "";
    name = audioInput.files[0].name;
  } else {
    artist = artistInput.value;
    name = titleInput.value;
  }
  src = await readFile(audioInput.files[0]);

  if (imageTextInput.style.display === "none") {
    if (imageFileInput.files.length === 0) {
      cover = defaultImage;
    } else {
      cover = await readFile(imageFileInput.files[0]);
    }
  } else {
    if (imageTextInput.value === "") {
      cover = defaultImage;
    } else {
      cover = imageTextInput.value;
    }
  }
  let file = await {
    artist,
    name,
    cover,
    src,
  };

  loading.classList.add("visible");
  layer.classList.remove("active");
  uploadForm.classList.remove("visible");
  uploadForm.reset();
  audioLabel.innerText = "Załącz plik lub upuść tutaj";
  audioInput.value = "";
  await fetchNewTrack(file);
});

//Functions

//Send new track to database
async function fetchNewTrack(file) {
  const data = await fetch(
    "https://fathomless-escarpment-84181.herokuapp.com",
    {
      method: "POST",
      headers,
      body: JSON.stringify(file),
    }
  );
  const response = await data.json();
  showMessage(response);
  removeAllChildNodes(container);
  await getLatest();
}

//Get latest tracks
async function getLatest() {
  const data = await fetch(
    "https://fathomless-escarpment-84181.herokuapp.com/latest",
    {
      method: "GET",
      headers,
    }
  );
  const response = await data.json();
  if (data.status === 500) {
    showErrorMessage(response);
  }
  let libraryPlaylist = getPlaylist();

  response.tracks.map((track) => {
    createTrackItem(track, libraryPlaylist);
  });

  await trackItemHandler();

  await addToLibraryHandler();
  loading.classList.remove("visible");
}

//Create music items
function createTrackItem(track, playlist) {
  const trackItem = createElement("div", container, "track-item");
  trackItem.setAttribute("id", track._id);
  const addToLibrary = createElement("button", trackItem, "icon");
  addToLibrary.classList.add("add-library");
  addToLibrary.innerHTML = '<i class="fas fa-plus"></i>';
  if (playlist !== undefined) {
    const exists = playlist.filter((song) => song.id === track._id);
    if (exists.length !== 0) {
      addToLibrary.style.display = "none";
    }
  }
  const imgCover = createElement("img", trackItem);
  imgCover.src = track.cover;
  const trackInfo = createElement("div", trackItem, "track-info");
  const trackArtist = createElement("h4", trackInfo);
  trackArtist.innerText = track.artist;
  const span = createElement("span", trackInfo);
  span.innerText = "-";
  const trackTitle = createElement("p", trackInfo);
  trackTitle.innerText = track.name;
}

function createElement(DOMElement, parentElement, className) {
  const element = document.createElement(DOMElement);
  if (className !== undefined) {
    element.classList.add(className);
  }
  if (parentElement === "body") {
    document.body.appendChild(element);
    return element;
  }
  parentElement.appendChild(element);
  return element;
}

//Set player Info
async function setPlayer(item, index) {
  itemIndex = index;
  const img = item.children[1].src;
  const info = item.children[2];
  const title = info.children[2].innerText;
  const artist = info.children[0].innerText;
  cover.src = img;
  artistPlaceholder.innerText = artist;
  titlePlaceholder.innerText = title;
  if (player.classList.contains("none"));
  {
    player.classList.remove("none");
  }
  isPlaying = true;
  currentTime.innerText = "0:00";
  endTime.innerText = "0:00";
  trackTimeInput.value = 0;
  trackAnim.style.transform = "translate(-100%)";
  const pause = playButtons.children[0];
  const play = playButtons.children[1];
  pause.style.zIndex = 1;
  play.style.zIndex = 2;
  await playTrack(item.id);
}

//Get src and play track
async function playTrack(id) {
  const pause = playButtons.children[0];
  const play = playButtons.children[1];
  audio.pause();
  const data = await fetch(
    "https://fathomless-escarpment-84181.herokuapp.com/track",
    {
      method: "POST",
      headers,
      body: JSON.stringify({ id }),
    }
  );
  const response = await data.json();
  const { src } = response;
  audio.src = src;
  pause.style.zIndex = 2;
  play.style.zIndex = 1;
  audio.addEventListener("timeupdate", async () => {
    let percentage = Math.floor((audio.currentTime / audio.duration) * 100);
    trackAnim.style.transform = `translateX(${-100 + percentage}%)`;
    if (audio.duration !== NaN) {
      currentTime.innerText = await getTime(audio.currentTime);
      endTime.innerText = await getTime(audio.duration);
      trackTimeInput.max = audio.duration;
      trackTimeInput.value = audio.currentTime;
    }
  });
  audio.play();
}

function getTime(time) {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}

function showMessage(message) {
  messageContainer.innerText = message;
  messageContainer.classList.add("visible");
  setTimeout(() => {
    messageContainer.classList.remove("visible");
    messageContainer.innerText = "";
    loading.classList.remove("visible");
    layer.classList.remove("active");
  }, 2000);
}

function showErrorMessage(message) {
  messageContainer.innerText = message;
  messageContainer.classList.add("visible");
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

function playButton(isPlaying, item) {
  const play = item.children[1];
  const pause = item.children[0];
  if (isPlaying) {
    pause.style.zIndex = 2;
    play.style.zIndex = 1;
    audio.play();
  } else {
    pause.style.zIndex = 1;
    play.style.zIndex = 2;
    audio.pause();
  }
}

// function search
async function searchTrack(query) {
  const fetchData = await fetch(
    `https://fathomless-escarpment-84181.herokuapp.com/search/${query}`,
    {
      method: "GET",
      headers,
    }
  );
  const response = await fetchData.json();
  if (fetchData.status === 401) {
    showMessage(response);
    layer.classList.add("active");
    getLatest();
    return;
  }
  removeAllChildNodes(container);
  response.map((track) => {
    console.log(track);
    createTrackItem(track);
  });
  await addToLibraryHandler();
  loading.classList.remove("visible");
  await trackItemHandler();
}

function createLibrary(library) {
  library.forEach((song, index) => {
    const trackItem = createElement("div", libraryContainer, "track-item");
    trackItem.setAttribute("id", song.id);
    const removeFromLibraryButton = createElement("div", trackItem, "icon");
    removeFromLibraryButton.classList.add("remove");
    removeFromLibraryButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    const imgCover = createElement("img", trackItem);
    imgCover.src = song.cover;
    const trackInfo = createElement("div", trackItem, "track-info");
    const trackArtist = createElement("h4", trackInfo);
    trackArtist.innerText = song.artist;
    const span = createElement("span", trackInfo);
    span.innerText = "-";
    const trackTitle = createElement("p", trackInfo);
    trackTitle.innerText = song.title;
    trackItem.addEventListener("click", function (event) {
      if (!event.target.classList.contains("remove")) {
        setPlayer(trackItem, index);
      }
    });
  });
}

function getPlaylist() {
  if (localStorage.getItem("playlist") !== null) {
    playlist = JSON.parse(localStorage.getItem("playlist"));
    removeAllChildNodes(libraryContainer);
    createLibrary(playlist);
  } else {
    playlist = undefined;
  }
  return playlist;
}

function addToLibraryHandler() {
  addToLibraryButtons = document.querySelectorAll(".add-library");
  addToLibraryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      deleteButtons = document.querySelectorAll(".remove");
      const { children } = this.parentElement;
      let playlist = [];
      if (localStorage.getItem("playlist") !== null) {
        playlist = JSON.parse(localStorage.getItem("playlist"));
      }
      const exist = playlist.filter(
        (song) => song.id === this.parentElement.id
      );
      if (exist.length !== 0) {
        showMessage("Utwór został już dodany do biblioteki");
        return;
      }
      let cover = children[1].src;
      let artist = children[2].children[0].innerText;
      let title = children[2].children[2].innerText;
      let id = this.parentElement.id;
      const playlistItem = {
        artist,
        title,
        cover,
        id,
      };
      playlist.push(playlistItem);
      localStorage.setItem("playlist", JSON.stringify(playlist));
      removeAllChildNodes(libraryContainer);
      createLibrary(playlist);
      this.style.display = "none";
    });
  });
}

function trackItemHandler() {
  if (libraryContainer.classList.contains("active")) {
    trackItems = libraryContainer.querySelectorAll(".track-item");
  } else {
    trackItems = container.querySelectorAll(".track-item");
  }
  trackItems.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      if (!event.target.classList.contains("icon")) {
        setPlayer(item, index);
      }
    });
  });
}

getLatest();
