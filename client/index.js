const onlyDesktop = window.matchMedia("(max-width: 1200px)");

//HEader DOM Elements
const libraryButton = document.querySelector(".library");
const mainButton = document.querySelector(".main");
const addButton = document.querySelector(".add");
const viewButton = document.querySelector(".view");
const searchButton = document.getElementById("search");
const searchInput = document.getElementById("search-bar");

//top container DOM Elements
const topContainer = document.querySelector(".top-container");
const acceptButton = document.getElementById("accept");
const scrollContainer = document.querySelector(".scroll");
const scrollIcon = document.querySelector(".scroll img");

//container DOM Elements
const libraryContainer = document.querySelector(".library-container");
const container = document.querySelector(".tracks-container");

//Form DOM Elements
const uploadForm = document.querySelector(".upload-form");
const audioInput = document.getElementById("audio-input");
const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const closeButton = uploadForm.querySelector(".close");
const submitButton = document.getElementById("submit");
const audioLabelText = document.querySelector("#audio-label p");
const imageCheckbox = document.getElementById("check");
const imageFileInput = document.getElementById("image-input");
const imageLabelText = document.querySelector("#image-label p");
const imageLabel = document.getElementById("image-label");
const imageTextInput = document.getElementById("cover");

//Edit form
const editForm = document.querySelector(".edit-form");
const editTitleInput = document.getElementById("edit-title");
const editArtistInput = document.getElementById("edit-artist");
const editCloseButton = editForm.querySelector(".close");
const editSubmitButton = document.getElementById("edit");
const editImageCheckbox = document.getElementById("edit-check");
const editImageFileInput = document.getElementById("edit-image-input");
const editImageLabelText = document.querySelector("#edit-image-label p");
const editImageLabel = document.getElementById("edit-image-label");
const editImageTextInput = document.getElementById("edit-cover");

//Player DOM Elements
const playButtons = document.getElementById("play");
const pause = playButtons.children[0];
const play = playButtons.children[1];
const player = document.querySelector(".player");
const playerImage = player.querySelector("img");
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

//Other DOM Elements
const audio = document.querySelector("audio");
const messageContainer = document.querySelector(".message");
const layer = document.querySelector(".layer");
const loadingPage = document.querySelector(".loading");
const latestButton = document.getElementById("latest");

//Variables
let isPlaying = false,
  isLooped = false,
  itemIndex,
  list = false,
  mainOpen = false,
  libOpen = false,
  editId,
  query,
  deleteButtons,
  addToLibraryButtons,
  start = 0,
  tracjItems,
  libraryItems;

const allDay = 1000 * 60 * 60 * 24;

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const defaultImage =
  "data:image/jpeg;base64,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";

//Event Listeners
window.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    switch (document.activeElement) {
      case searchInput:
      case imageTextInput:
      case audioInput:
      case imageFileInput:
      case artistInput:
      case titleInput:
        document.activeElement.blur();
        break;
    }
  }
});

window.addEventListener("wheel", (event) => {
  let thisScroll = parseInt(topContainer.style.top.slice(0, -1));
  const { deltaY } = event;
  if (deltaY > 0) {
    start += 2;
    if (thisScroll >= 100) {
      start = 100;
      return;
    }
    topContainer.style.top = `${start}%`;
  } else {
    start -= 2;
    if (thisScroll === 100) {
      start = 100;
      return;
    }
    if (thisScroll < 0 || thisScroll === NaN) {
      start = 0;
      return;
    }
    topContainer.style.top = `${start}%`;
  }
});

latestButton.addEventListener("click", () => {
  query = undefined;
  loadingPage.classList.add("visible");
  getLatest();
});

//Search events

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  loadingPage.classList.add("visible");
  if (searchInput.value !== "") {
    query = searchInput.value;
  } else {
    query = undefined;
  }
  searchTrack(query);
  searchInput.value = "";
});

searchButton.addEventListener("mouseover", () =>
  searchInput.classList.add("active")
);

searchButton.addEventListener("mouseleave", () =>
  searchInput.classList.remove("active")
);

searchInput.addEventListener("mouseover", function () {
  this.classList.add("active");
});

searchInput.addEventListener("mouseleave", function () {
  this.classList.remove("active");
});

//Header events
addButton.addEventListener("click", () => {
  uploadForm.classList.add("visible");
  layer.classList.add("active");
});

viewButton.addEventListener("click", function () {
  list = !list;
  container.classList.toggle("list");
  libraryContainer.classList.toggle("list");

  if (container.classList.contains("list")) {
    this.children[0].classList.remove("fa-photo-video");
    this.children[0].classList.add("fa-list");
  } else {
    this.children[0].classList.add("fa-photo-video");
    this.children[0].classList.remove("fa-list");
  }
});

libraryButton.addEventListener("click", async function () {
  libOpen = !libOpen;
  this.classList.toggle("active");
  libraryContainer.classList.toggle("active");

  if (player.classList.length === 1) {
    if (mainOpen) {
      libraryContainer.style.zIndex = 7;
      container.style.zIndex = 6;
    } else {
      libraryContainer.style.zIndex = 6;
      container.style.zIndex = 7;
    }

    if (
      !this.classList.contains("slide") &&
      !mainButton.classList.contains("slide")
    ) {
      this.classLIst.add("slide");
      mainButton.classLIst.add("slide");
    }

    if (!libOpen && !mainOpen) {
      this.classList.remove("slide");
      mainButton.classList.remove("slide");
    }
  }
});

mainButton.addEventListener("click", function () {
  this.classList.toggle("active");
  mainOpen = !mainOpen;

  if (libOpen) {
    libraryContainer.style.zIndex = 6;
    container.style.zIndex = 7;
  } else {
    libraryContainer.style.zIndex = 7;
    container.style.zIndex = 6;
  }

  if (
    !this.classList.contains("slide") &&
    !libraryButton.classList.contains("slide")
  ) {
    libraryButton.classList.add("slide");
    this.classList.add("slide");
  }

  if (!mainOpen && !libOpen) {
    libraryButton.classList.remove("slide");
    this.classList.remove("slide");
  }
});

//Top container events
acceptButton.addEventListener("click", () => {
  topContainer.style.top = "100%";
  uploadForm.classList.add("visible");
  layer.classList.add("active");
});

scrollContainer.addEventListener("mouseover", function () {
  this.style.opacity = 0;
  this.addEventListener("transitionend", () => {
    scrollIcon.src = "./arrow.svg";
    this.style.opacity = 1;
  });
});

scrollContainer.addEventListener("mouseleave", function () {
  this.style.opacity = 0;
  this.addEventListener("transitionend", () => {
    scrollIcon.src = "./scroll.svg";
    this.style.opacity = 1;
  });
});

scrollContainer.addEventListener("click", () => {
  topContainer.style.top = "100%";
});

//Player events
playerImage.addEventListener("click", function () {
  if (player.classList.contains("hidden")) {
    toggleButton.style.display = "flex";
    player.classList.remove("hidden");
  }

  detectPlayer();

  if (
    (libraryContainer.classList.contains("active") &&
      player.classList.length === 1) ||
    (container.classList.contains("active") && player.classList.length === 1)
  ) {
    mainButton.classList.add("slide");
    libraryButton.classList.add("slide");
  }

  if (player.classList.length !== 1) {
    mainButton.classList.remove("slide");
    libraryButton.classList.remove("slide");
  }
});

controlButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    switch (event.target.id) {
      case "step-backward":
        let items;
        if (libraryContainer.classList.contains("active")) {
          items = libraryItems;
        } else {
          items = trackItems;
        }
        itemIndex = (itemIndex - 1) % items.length;
        if (itemIndex < 0) {
          itemIndex = items.length - 1;
        }
        setPlayer(items[itemIndex], itemIndex);
        break;
      case "volume":
        event.target.classList.toggle("volume");
        const mute = event.target.children[1];
        const volUp = event.target.children[2];
        if (event.target.classList.contains("volume")) {
          mute.style.zIndex = 2;
          volUp.style.zIndex = 1;
          audio.volume = 0;
        } else {
          mute.style.zIndex = 1;
          volUp.style.zIndex = 2;
          audio.volume = volumeInput.value;
        }
        break;
      case "play":
        isPlaying = !isPlaying;
        event.target.classList.toggle("play");
        playButton(isPlaying);
        break;
      case "step-forward":
        // let items;
        if (libraryContainer.classList.contains("active")) {
          items = libraryItems;
        } else {
          items = trackItems;
        }
        itemIndex = (itemIndex + 1) % items.length;
        setPlayer(items[itemIndex], itemIndex);
        break;
      case "repeat":
        event.target.classList.toggle("active");
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
  playButton(isPlaying);
  let items;
  if (libraryContainer.classList.contains("active")) {
    items = libraryItems;
  } else {
    items = trackItems;
  }
  itemIndex = (itemIndex + 1) % items.length;
  currentTime.innerText = "0:00";
  endTime.innerText = "0:00";
  trackTimeInput.value = 0;
  trackAnim.style.transform = "translateX(-100%)";
  setPlayer(items[itemIndex], itemIndex);
});

toggleButton.addEventListener("click", function () {
  player.classList.toggle("hidden");
  player.classList.contains("hidden")
    ? (this.style.display = "none")
    : (this.style.display = "flex");
  detectPlayer();
  if (
    libraryContainer.classList.contains("active") &&
    player.classList.length === 1
  ) {
    mainButton.classList.add("slide");
    libraryButton.classList.add("slide");
  }
  if (player.classList.length !== 1) {
    mainButton.classList.remove("slide");
    libraryButton.classList.remove("slide");
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

editImageCheckbox.addEventListener("change", function () {
  if (this.checked) {
    editImageTextInput.style.display = "flex";
    editImageLabel.style.display = "none";
  } else {
    editImageLabel.style.display = "flex";
    editImageTextInput.style.display = "none";
  }
});

editCloseButton.addEventListener("click", () => {
  editForm.classList.remove("visible");
  layer.classList.remove("active");
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

editImageFileInput.addEventListener("change", function () {
  if (this.files.length === 0) {
    editImageLabelText.innerText = "Załącz plik lub upuść tutaj";
    return;
  }
  editImageLabelText.innerText = this.files[0].name;
});

editSubmitButton.addEventListener("click", async function (event) {
  event.preventDefault();
  let cover, artist, title;
  artist = editArtistInput.value;
  title = editTitleInput.value;
  if (editImageTextInput.style.display === "none") {
    if (editImageFileInput.files.length === 0) {
      cover = defaultImage;
    } else {
      cover = await readFile(editImageFileInput.files[0]);
    }
  } else {
    if (editImageTextInput.value === "") {
      cover = defaultImage;
    } else {
      cover = editImageTextInput.value;
    }
  }
  const file = await {
    name: title,
    artist,
    cover,
    id: editId,
  };

  loading.classList.add("visible");
  layer.classList.remove("active");
  editForm.classList.remove("visible");
  editForm.reset();
  editImageLabelText.innerText = "Załącz plik lub upuść tutaj";
  editImageFileInput.value = "";
  await fetchEditedTrack(file);
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
  audioLabelText.innerText = "Załącz plik lub upuść tutaj";
  imageLabelText.innerText = "Załącz plik lub upuść tutaj";
  audioInput.value = "";
  imageFileInput.value = "";
  await fetchNewTrack(file);
});

//Functions

//API requests

//Update track from database
async function fetchEditedTrack(file) {
  const data = await fetch(
    "https://fathomless-escarpment-84181.herokuapp.com/edit",
    {
      method: "POST",
      headers,
      body: JSON.stringify(file),
    }
  );
  const response = await data.json();
  showMessage(response);
  await getLatest();
}

//Save new Track to database
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
  await getLatest();
}

//Get 30 latest songs from database
async function getLatest() {
  removeAllChilds(container);
  let playlist = getPlaylist();
  let songs = [];
  if (playlist !== undefined) {
    playlist.map((item) => songs.push(item.id));
  }
  const data = await fetch(
    "https://fathomless-escarpment-84181.herokuapp.com/latest",
    {
      method: "POST",
      headers,
      body: JSON.stringify({ songs }),
    }
  );
  const response = await data.json();
  if (data.status === 500) {
    showMessage(response, allDay);
  }

  response.tracks.map((track) => createTrackItem(track, playlist));

  await trackItemHandler();
  await addToLibraryHandler();
  await removeFromLibraryHandler();
  await editButtonsHandler();
  loadingPage.classList.remove("visible");
  latestButton.style.display = "none";
}

//Get query data from database
async function searchTrack(query) {
  removeAllChilds(container);
  let playlist = getPlaylist();
  let songs = [];
  if (playlist !== undefined) {
    playlist.map((item) => songs.push(item.id));
  }
  const data = await fetch(
    `https://fathomless-escarpment-84181.herokuapp.com/search/${query}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ songs }),
    }
  );
  const response = await data.json();
  if (data.status === 401) {
    showMessage(response);
    layer.classList.add("active");
    getLatest();
    return;
  }

  response.map((track) => createTrackItem(track));

  await addToLibraryHandler();
  await removeFromLibraryHandler();
  await trackItemHandler();
  loading.classList.remove("visible");
  latest.style.display = "flex";
}

function getPlaylist() {
  if (localStorage.getItem("playlist") !== null) {
    playlist = JSON.parse(localStorage.getItem("playlist"));
    createLibrary(playlist);
  } else {
    playlist = undefined;
  }
  return playlist;
}

function getTime(time) {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}

//Create element handler
function createElement(DOMElement, parentElement, className) {
  const element = document.createElement(DOMElement);

  if (className !== undefined) {
    element.classList.add(className);
  }
  if (parentElement === "body") {
    document.body.appendChild(element);
  } else {
    parentElement.appendChild(element);
  }
  return element;
}

//Create container items
function createTrackItem(track, playlist) {
  const trackItem = createElement("div", container, "track-item");
  trackItem.setAttribute("id", track._id);

  const addToLibrary = createElement("button", trackItem, "icon");
  addToLibrary.classList.add("add-library");

  const addToLibraryIcon = createElement("i", addToLibrary, "fas");
  addToLibraryIcon.classList.add("fa-plus");

  const addToLibrarySpan = createElement("span", addToLibrary, "hovered");
  addToLibrarySpan.innerText = "Dodaj do ulubionych";

  const editIcon = createElement("button", trackItem, "icon");
  editIcon.classList.add("edit");
  editIcon.innerHTML = '<i clas="fas fa-pencil-alt"></i>';

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

// create Library items
function createLibrary(library) {
  if (library !== undefined || library.length !== 0) {
    library.map((track) => {
      const trackItem = createElement("div", libraryContainer, "track-item");
      trackItem.setAttribute("id", track.id);

      const removeFromLibraryButton = createElement("div", trackItem, "icon");
      removeFromLibraryButton.classList.add("remove");
      removeFromLibraryButton.innerHTML = '<i class="fas fa-minus"></i>';

      const imgCover = createElement("img", trackItem);
      imgCover.src = track.cover;

      const trackInfo = createElement("div", trackItem, "track-info");

      const trackArtist = createElement("h4", trackInfo);
      trackArtist.innerText = track.artist;

      const span = createElement("span", trackInfo);
      span.innerText = "-";

      const trackTitle = createElement("p", trackInfo);
      trackTitle.innerText = track.title;
    });
  } else {
    removeAllChilds(libraryContainer);
  }
}

//Remove all elements in parent
function removeAllChilds(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

function showMessage(message, time = 2000) {
  messageContainer.innerText = message;
  messageContainer.classList.add("visible");
  setTimeout(() => {
    messageContainer.classList.remove("visible");
    loadingPage.classList.remove("visible");
    layer.classList.remove("active");
    messageContainer.innerText = "";
  }, time);
}

async function setPlayer(item, index) {
  itemIndex = index;
  let info;
  if (!libOpen) {
    cover.src = item.children[2].src;
    info = item.children[3];
  } else {
    cover.src = item.children[1].src;
    info = item.children[2];
  }

  titlePlaceholder.innerText = info.children[2].innerText;
  artistPlaceholder.innerText = info.children[0].innerText;

  if (player.classList.contains("none")) player.classList.remove("none");

  isPlaying = true;
  currentTime.innerText = "0:00";
  endTime.innerText = "0:00";
  trackAnim.style.transform = "translateX(-100%)";

  pause.style.zIndex = 1;
  play.style.zIndex = 2;
  await playTrack(item.id);
}

async function playTrack(id) {
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

  audio.ontimeupdate = async () => {
    let percentage = Math.floor((audio.currentTime / audio.duration) * 100);

    trackAnim.style.transform = `translateX(${-100 + percentage}%)`;

    currentTime.innerText = await getTime(audio.currentTime);
    endTime.innerText = await getTime(audio.duration);
    trackTimeInput.max = audio.duration;
    trackTimeInput.value = audio.currentTime;
  };
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

function playButton(isPlaying) {
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

function addToLibraryHandler() {
  addToLibraryButtons = document.querySelectorAll(".add-library");
  addToLibraryButtons.forEach((button) => {
    button.onclick = function () {
      deleteButtons = document.querySelectorAll(".remove");
      const { children } = this.parentElement;
      let playlist = [];
      playlist = getPlaylist();

      let cover = children[2].src;
      let artist = children[3].children[0].innerText;
      let title = children[3].children[2].innerText;
      let id = this.parentElement.id;
      const playListItem = {
        id,
        artist,
        title,
        cover,
      };
      playlist.push(playListItem);
      localStorage.setItem("playlist", JSON.stringify(playlist));
      createLibrary(playlist);
      loadingPage.classList.add("visible");

      if (query !== undefined) {
        searchTrack(query);
        return;
      }
      getLatest();
      return;
    };

    if (onlyDesktop) {
      button.onmouseover = function () {
        this.children[1].classList.add("visible");
      };
      button.onmouseleave = function () {
        this.children[1].classList.remove("visible");
      };
    }
  });
}

function removeFromLibraryHandler() {
  deleteButtons = document.querySelectorAll(".remove");
  deleteButtons.forEach((button) => {
    button.onclick = function () {
      let playlist = getPlaylist();
      playlist = playlist.filter((track) => track.id !== this.parentElement.id);
      localStorage.setItem("playlist", JSON.stringify(playlist));

      loadingPage.classList.add("visible");
      this.parentElement.remove();

      if (query !== undefined) {
        searchTrack(query);
      } else {
        getLatest();
      }
    };
  });
}

function editButtonsHandler() {
  const editButtons = document.querySelectorAll(".edit");

  editButtons.forEach((button) => {
    button.onclick = function () {
      const { id, children } = this.parentElement;
      editId = id;
      let cover = children[2].src;
      editImageCheckbox.checked = true;
      editImageTextInput.value = cover;
      editArtistInput.value = children[3].children[0].innerText;
      editImageTextInput.style.display = "flex";
      editImageLabel.style.display = "none";
      layer.classList.add("active");
      editForm.classList.add("visible");
    };
  });
}

function trackItemHandler() {
  let items;
  libraryContainer.classList.contains("active")
    ? (items = libraryContainer.querySelectorAll(".track-item"))
    : (items = container.querySelectorAll(".track-item"));

  items.forEach((item, index) => {
    item.onclick = function () {
      if (libOpen && !this.classList.contains("icon")) {
        mainButton.style.display = "flex";
        libraryButton.classList.add("slide");
        mainButton.classList.add("slide");
      }
      if (!this.classList.contains("icon")) {
        setPlayer(item, index);
        detectPlayer();
      }
    };
  });
}

function detectPlayer() {
  if (player.classList.length === 1) {
    mainButton.style.display = "flex";
    container.classList.add("aside");
    libraryContainer.classList.add("aside");
    if (!list) {
      container.classList.add("list");
      libraryContainer.classList.add("list");
    }
  } else {
    mainButton.style.display = "none";
    container.classList.remove("aside");
    libraryContainer.classList.remove("aside");
    container.style.zIndex = "";
    libraryContainer.style.zIndex = "";
    if (!list) {
      container.classList.remove("list");
      libraryContainer.classList.remove("list");
    }
  }
}

getLatest();
