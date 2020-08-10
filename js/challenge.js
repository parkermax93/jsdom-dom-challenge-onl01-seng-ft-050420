const counter = document.querySelector('#counter');
let counterNum = parseInt(counter.textContent);
let isPaused = false;

const minusBtn = document.querySelector('#minus');
const plusBtn = document.querySelector('#plus');
const heartBtn = document.querySelector('#heart');
const pauseBtn = document.querySelector('#pause');
const likesUl = document.querySelector('.likes');

const commentList = document.querySelector('#list');
const commentForm = document.querySelector('#comment-form');
const commentInput = document.querySelector('#comment-input');
const submitBtn = document.querySelector('#submit');

document.addEventListener('DOMContentLoaded', function() {
  setInterval(increaseCounter, 1000);
  loadEventListeners();
});

function increaseCounter() {
  if(!isPaused) {
    counterNum += 1;
    counter.textContent = counterNum.toString();
  };
}

function loadEventListeners() {
  minusBtn.addEventListener('click', minusCounter);
  plusBtn.addEventListener('click', addCounter);
  heartBtn.addEventListener('click', likeCounter);
  pauseBtn.addEventListener('click', pauseCounter);
  commentForm.addEventListener('submit', addComment);
};

function minusCounter() {
  counterNum -= 1;
  counter.textContent = counterNum.toString();
}

function addCounter() {
  counterNum += 1;
  counter.textContent = counterNum.toString();
}

function likeCounter() {
  const liked = Array.from(likesUl.children).find(li => parseInt(li.dataset.num) === counterNum);
  if(liked) {
    let likedTimes = parseInt(liked.querySelector('span').textContent);
    likedTimes ++;
    liked.querySelector('span').textContent = likedTimes.toString();
    if (!liked.innerHTML.endsWith('s')) {
      liked.innerHTML = liked.innerHTML + 's';
    }
  } else {
    const like = document.createElement('li');
    like.setAttribute('data-num', counterNum.toString());
    like.innerHTML = `${like.dataset.num} has been liked <span>1</span> time`;
    likesUl.appendChild(like);
  };
}

function pauseCounter() {
  if(isPaused) {
    isPaused = false;
    minusBtn.removeAttribute('disabled');
    plusBtn.removeAttribute('disabled');
    heartBtn.removeAttribute('disabled');
    submitBtn.removeAttribute('disabled');
  } else {
    isPaused = true;
    pauseBtn.textContent = 'resume';
    minusBtn.disabled = true;
    plusBtn.disabled = true;
    heartBtn.disabled = true;
    submitBtn.disabled = true;
  }
}

function addComment(e) {
  if(commentInput.value != '') {
    const comment = document.createElement('p');
    comment.textContent = commentInput.value;
    commentList.appendChild(comment);
    commentInput.value = '';
  } else {
    alert('Comment must have content');
  }
  e.preventDefault();
}