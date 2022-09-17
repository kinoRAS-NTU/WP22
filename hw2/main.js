document.addEventListener("DOMContentLoaded", function (event) {
  updateTime();
  setInterval(function () {updateTime();}, 1000);
  initAppendUser();
  displayUserList();
  displaySpotlightUser();
  initAppendAddUserAvatar();
  updateUserCount();
  updateGalleryLayout();
});

let userList = [];
let pinnedIdentifier = 0;
let dnTimer;
const myIdentifier = getRandomIdentifier();

let userCandidateList = [
{ name: 'Amamiya',  avatar: './image/amam.webp' },
{ name: 'Lustario', avatar: './image/lust.webp' },
{ name: 'Inui',     avatar: './image/inui.webp' },
{ name: 'Matsukai', avatar: './image/mats.webp' },
{ name: 'Yashiro',  avatar: './image/yash.webp' },
{ name: 'Hakase',   avatar: './image/haka.webp' },
{ name: 'Tsukino',  avatar: './image/tsuk.webp' },
{ name: 'Honma',    avatar: './image/honm.webp' },
{ name: 'Banderas', avatar: './image/band.webp' },
{ name: 'Takamiya', avatar: './image/taka.webp' },
{ name: 'Kenmochi', avatar: './image/kenm.webp' },
{ name: 'Katrina',  avatar: './image/katr.webp' },
{ name: 'Gundo',    avatar: './image/gund.webp' },
{ name: 'Helesta',  avatar: './image/hele.webp' }];

let addUserCandidateList = [
{ name: 'NoraNeko', avatar: './image/nek1.jpg' },
{ name: 'NoraNeko', avatar: './image/nek2.jpg' },
{ name: 'NoraNeko', avatar: './image/nek3.jpg' },
{ name: 'NoraNeko', avatar: './image/nek4.jpg' },
{ name: 'NoraNeko', avatar: './image/nek5.jpg' },
{ name: 'NoraNeko', avatar: './image/nek6.jpg' },
{ name: 'NoraNeko', avatar: './image/nek7.jpg' },
{ name: 'NoraNeko', avatar: './image/nek8.jpg' }];

// Initialize
function initAppendUser() {
  let initUserNum = getRandomInt(0, 14);
  for (let i = 1; i <= initUserNum; i++) {
    const candidateIndex = getRandomInt(0, userCandidateList.length - 1);
    userList.push({
      name: userCandidateList[candidateIndex].name,
      avatar: userCandidateList[candidateIndex].avatar,
      self: false,
      identifier: getRandomIdentifier() });

    userCandidateList.splice(candidateIndex, 1);
  }
  const pinIndex = getRandomInt(0, initUserNum - 1);
  userList.splice(pinIndex, 0, {
    name: 'Tom',
    avatar: './image/tomm.png',
    self: true,
    identifier: myIdentifier });

  pinnedIdentifier = userList[pinIndex].identifier;
}
function displayUserList() {
  document.getElementById('others').innerHTML = '';
  for (let i = 0; i < userList.length; i++) {
    document.getElementById('others').appendChild(
    getUserBlockCode(i));

  }
}
function displaySpotlightUser() {
  document.getElementById('spotlight').innerHTML = '';
  document.getElementById('spotlight').appendChild(getUserBlockCode(getIndexByIdentifier(pinnedIdentifier)));
}
function initAppendAddUserAvatar() {
  document.getElementById('add-user-avatar-container').innerHTML = '';
  for (let i = 0; i < addUserCandidateList.length; i++) {
    let thisLabel = document.createElement('label');
    thisLabel.innerHTML = ` <input type="radio" name="add-user-avatar" value="${i}">
                                <div class="image" style="background-image: url('${addUserCandidateList[i].avatar}')"></div>`;
    document.getElementById('add-user-avatar-container').appendChild(thisLabel);
  }
}


// Add User
function handleOpenAddUser(e) {
  e.target.blur();
  document.getElementById('add-user-form').classList.toggle('active');
  document.getElementById('add-user-option-button').classList.toggle('active');
}
function handleCloseAddUser() {
  document.getElementById('add-user-form').classList.remove('active');
  document.getElementById('add-user-option-button').classList.remove('active');
  document.getElementById('add-user-form').reset();
}
function handleSubmitAddUser() {
  if (userList.length >= 15) {
    displayNotification(0, 0, -1);
  } else {
    const avatarImgIndex = !document.querySelector('input[name="add-user-avatar"]:checked') ?
    getRandomInt(0, addUserCandidateList.length - 1) :
    parseInt(document.querySelector('input[name="add-user-avatar"]:checked').value);
    const newUserName = document.getElementById('add-user-name-field').value === "" ?
    addUserCandidateList[avatarImgIndex].name :
    document.getElementById('add-user-name-field').value;
    const inListIndex = userList.length;
    userList.push({
      name: newUserName,
      avatar: addUserCandidateList[avatarImgIndex].avatar,
      self: false,
      identifier: getRandomIdentifier() });

    document.getElementById('others').appendChild(getUserBlockCode(inListIndex));
    updateUserCount();
    updateGalleryLayout();
    displayNotification(addUserCandidateList[avatarImgIndex].avatar, newUserName, 0);
  }
  handleCloseAddUser();
}

// Remove User
function handleRemoveUser(idx) {
  const index = getIndexByIdentifier(idx);
  if (idx == pinnedIdentifier) {handleRemovePin();}
  const elemToBeRemoved = document.querySelector('#others div[data-identifier="' + idx + '"]');
  if (pinnedIdentifier !== -1) {
    elemToBeRemoved.style.cssText = `pointer-events: none; overflow: hidden; opacity: 0; padding: 0; height: 0; width: 0; margin: 0; grid-column: 1; transition: all .2s ease-in-out .1s, opacity .1s ease-in-out 0s;`;
    setTimeout(() => {elemToBeRemoved.outerHTML = '';}, 350);
  } else {elemToBeRemoved.outerHTML = '';}
  displayNotification(userList[index].avatar, userList[index].name, 1);
  userList.splice(index, 1);
  updateGalleryLayout();
  updateUserCount();
}

// Change Pinned Status
function handleChangePin(idx) {
  const index = getIndexByIdentifier(idx);
  if (idx === pinnedIdentifier) {
    handleRemovePin(); // Remove Pin 
  } else if (pinnedIdentifier === -1) {
    handleAddPin(idx, index); // Add Pin 
  } else {
    handleRemovePin(); // Switch Pin
    handleAddPin(idx, index);
  }
  updateGalleryLayout();
}
function handleAddPin(idx, index) {
  pinnedIdentifier = idx;
  const toBePinnedBlock = document.querySelectorAll('#others .participant-block')[index];
  toBePinnedBlock.style.transition = 'all .2s ease-in-out .1s, opacity .1s ease-in-out 0s';
  toBePinnedBlock.classList.add('pinned');
  displaySpotlightUser();
  setTimeout(() => {toBePinnedBlock.style.transition = '';}, 350);
}
function handleRemovePin() {
  pinnedIdentifier = -1;
  document.getElementById('spotlight').innerHTML = '';
  const pinningBlock = document.querySelectorAll('#others .participant-block.pinned')[0];
  pinningBlock.style.transition = 'all .2s ease-in-out 0s, opacity .1s ease-in-out .2s';
  pinningBlock.classList.remove('pinned');
  setTimeout(() => {pinningBlock.style.transition = '';}, 350);
}

// Toggle Mic / Cam / FunctionBar(R)
function handleChangeMic() {
  document.getElementById('mic-button').classList.toggle('active');
  document.querySelector('div[data-identifier="' + myIdentifier + '"]').classList.toggle('muted');
}
function handleChangeCam() {
  document.getElementById('cam-button').classList.toggle('active');
}
function handleToggleActionRight() {
  document.getElementById('action-bar').classList.toggle('active');
}

// Get User Info Logic
function getIndexByIdentifier(idx) {
  return userList.findIndex(o => o.identifier === idx);
}
function getUserBlockCode(index) {
  let returnEl = document.createElement('div');
  const name = userList[index].name;
  const avatar = userList[index].avatar;
  const self = userList[index].self;
  const identifier = userList[index].identifier;
  const pinned = identifier === pinnedIdentifier;
  returnEl.className = pinned ? 'participant-block pinned muted' : 'participant-block muted';
  returnEl.dataset.identifier = identifier;
  let returnText = `
            <div class="main-box">
                <img src="${avatar}" alt="">
                <div class="participant-action-bar btn-left" onclick="handleChangePin('${identifier}')">
                    <button class="show-at-pinned" onclick="this.blur()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#E8EAED">
                            <path d="M2,5.27L3.28,4L20,20.72L18.73,22L12.8,16.07V22H11.2V16H6V14L8,12V11.27L2,5.27M16,12L18,14V16H17.82L8,6.18V4H7V2H17V4H16V12Z" />
                        </svg>
                        <span class="btn-hint at-bottom">在主畫面取消固定${self ? '你自己' : name}</span>
                    </button>
                    <button class="show-at-unpinned btn-left" onclick="this.blur()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#E8EAED">
                            <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12M8.8,14L10,12.8V4H14V12.8L15.2,14H8.8Z" />
                        </svg>
                        <span class="btn-hint at-bottom">將${self ? '自己' : name}固定在主畫面</span>
                    </button>
    `;
  returnText += self ? `
                <button class="btn-center" onclick="this.blur()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#E8EAED">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 7.74967V4.33333C11 3.59695 10.403 3 9.66667 3H6.25033L8.25033 5H9V5.74967L11 7.74967ZM5.44466 5H5V9H9V8.55534L10.8054 10.3607C10.5712 10.7441 10.1488 11 9.66667 11H4.33333C3.59695 11 3 10.403 3 9.66667V4.33333C3 3.85119 3.25591 3.42882 3.63931 3.19464L5.44466 5Z"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00098 14C3.00098 13.4477 3.44869 13 4.00098 13H10.001C10.5533 13 11.001 13.4477 11.001 14V20C11.001 20.5523 10.5533 21 10.001 21H4.00098C3.44869 21 3.00098 20.5523 3.00098 20V14ZM5.00098 19H9.00098V15H5.00098V19Z"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.001 4C13.001 3.44772 13.4487 3 14.001 3H20.001C20.5533 3 21.001 3.44772 21.001 4V10C21.001 10.5523 20.5533 11 20.001 11H14.001C13.4487 11 13.001 10.5523 13.001 10V4ZM15.001 9H19.001V5H15.001V9Z"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.001 17.751V14C21.001 13.4477 20.5533 13 20.001 13H16.25L21.001 17.751ZM13.551 13.1067C13.2247 13.2714 13.001 13.6096 13.001 14V20C13.001 20.5523 13.4487 21 14.001 21H20.001C20.3914 21 20.7296 20.7762 20.8943 20.4499L13.551 13.1067Z"></path>
                        <rect x="20.7998" y="23.2129" width="28" height="2" transform="rotate(-135 20.7998 23.2129)"></rect>
                    </svg>
                    <span class="btn-hint at-bottom">
                        <span class="show-at-pinned">無法在這個版面配置中移除你的圖塊</span>
                        <span class="show-at-unpinned">移除這個圖塊</span>
                    </span>
                </button>

                <button class="disabled-at-pinned btn-right" onclick="this.blur()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#E8EAED">
                        <path d="M3.4 22 2 20.6 8.6 14H4v-2h8v8h-2v-4.6ZM12 12V4h2v4.6L20.6 2 22 3.4 15.4 10H20v2Z"/>
                    </svg>
                    <span class="btn-hint at-bottom">
                        <span class="show-at-pinned">固定時無法最小化</span>
                        <span class="show-at-unpinned">最小化</span>
                    </span>
                </button>
        ` : `
                <button class="disabled btn-center" onclick="this.blur()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#E8EAED">
                        <path d="M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z" />
                    </svg>
                    <span class="btn-hint at-bottom">你無法為他人取消靜音</span>
                </button>
                <button class="btn-right" onclick="this.blur()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#E8EAED">
                        <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
                    </svg>
                    <span class="btn-hint at-bottom">將${name}從通話中移除</span>
                </button>
        `;
  returnText += `
                </div>
                <div class="muted-indicator">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="#FFFFFF">
                        <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"></path>
                        <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"></path>
                    </svg>
                </div>
        `;
  returnText += !self ? `
                <div class="remove-user-btn" onclick="handleRemoveUser('${identifier}')" title="移除${name}">
                    <svg width="18px" height="18px" viewBox="0 0 48 48" fill="#FFFFFF">
                    <path d="m12.45 37.95-2.4-2.4L21.6 24 10.05 12.45l2.4-2.4L24 21.6l11.55-11.55 2.4 2.4L26.4 24l11.55 11.55-2.4 2.4L24 26.4Z"/>
                    </svg>
                </div>
        ` : ``;
  returnText += `
            </div>
            <div class="participant-info">
                <div class="pin">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#FFFFFF">
                        <path d="M0 0h24v24H0z" fill="none" stroke="#000" stroke-opacity=".008" stroke-width="0"></path>
                        <path d="M17 4c0-1.1-.89-2-2-2H9c-1.1 0-2 .9-2 2v7l-2 3v2h6v5l1 1 1-1v-5h6v-2l-2-3V4z"></path>
                    </svg>
                </div>
                <p class="participant-name">${self ? '你' : name}</p>
            </div>`;
  returnEl.innerHTML = returnText;
  return returnEl;
}

// Display Notification
function displayNotification(avatar, name, type) {
  document.getElementById('ntf-container').classList.remove('error');
  if (!document.getElementById('ntf-container').classList.contains('unhide')) {
    if (type === -1) {
      document.getElementById('ntf-image').src = '';
      document.getElementById('ntf-title').innerHTML = '參與者人數已達上限';
      document.getElementById('ntf-subtitle').innerHTML = '每場會議最多只能容納 15 位參與者';
      document.getElementById('ntf-container').classList.add('error');
    } else {
      document.getElementById('ntf-image').src = avatar;
      document.getElementById('ntf-title').innerHTML = name;
      document.getElementById('ntf-subtitle').innerHTML = type ? '已被移出會議' : '已被加入會議';
    }
    document.getElementById('ntf-container').classList.add('unhide');
    dnTimer = setTimeout(() => {document.getElementById('ntf-container').classList.remove('unhide');}, 2000);
  } else {
    document.getElementById('ntf-container').classList.remove('unhide');
    clearTimeout(dnTimer);
    setTimeout(() => {
      if (type === -1) {
        document.getElementById('ntf-image').src = '';
        document.getElementById('ntf-title').innerHTML = '參與者人數已達上限';
        document.getElementById('ntf-subtitle').innerHTML = '每場會議最多只能容納 15 位參與者';
        document.getElementById('ntf-container').classList.add('error');
      } else {
        document.getElementById('ntf-image').src = avatar;
        document.getElementById('ntf-title').innerHTML = name;
        document.getElementById('ntf-subtitle').innerHTML = type ? '已被移出會議' : '已被加入會議';
      }
      document.getElementById('ntf-container').classList.add('unhide');
      dnTimer = setTimeout(() => {document.getElementById('ntf-container').classList.remove('unhide');}, 2000);
    }, 150);
  }
}

// Background Actions
function updateTime() {
  const currDateObj = new Date();
  document.getElementById('time-text').innerHTML = `
        ${currDateObj.getHours() / 12 < 1 ? '上午' : '下午'}
        ${formatHour(currDateObj.getHours() % 12)}:${formatMin(currDateObj.getMinutes())}`;
}
function updateUserCount() {
  document.getElementById('user-count-text').innerHTML = userList.length;
}
function updateGalleryLayout() {
  const gallery = document.getElementById('gallery');
  const pinnedIndex = getIndexByIdentifier(pinnedIdentifier);
  gallery.classList.remove(...gallery.classList);
  gallery.classList.add(pinnedIdentifier === -1 ? 'nopin' : 'pin');
  gallery.classList.add('size-' + userList.length);
  if (pinnedIndex === userList.length - 1) {gallery.classList.add('last-pinned');}
}

// General Functions
function formatHour(t) {return parseInt(t) !== 0 ? parseInt(t) : 12;}
function formatMin(t) {return parseInt(t) >= 10 ? parseInt(t) : '0' + t;}
function getRandomInt(min, max) {return Math.floor(Math.random() * (max - min + 1) + min);}
function getRandomIdentifier() {return Math.random().toString(36).substr(2, 7);}