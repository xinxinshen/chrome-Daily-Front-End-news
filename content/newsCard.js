const NewsCard = {};

NewsCard.init = function (paths) {
  const div = document.createElement('div');
  div.id = 'new-card';
  const root = document.body;
  root.insertBefore(div, root.firstChild);

  this.paths = paths;
}

NewsCard.addListeners = function () {
  const path = document.getElementById('path').innerText;
  const paths = NewsCard.paths;
  const index = paths.indexOf(path);
  const length = paths.length;
  const prevPath = index === 0 ? null : paths[index - 1];
  const nextPath = index === length - 1 ? null : paths[index + 1];

  const left = document.getElementById('left-arrow');
  const right = document.getElementById('right-arrow');

  NewsCard.handleArrow(prevPath, left);
  NewsCard.handleArrow(nextPath, right);
}

NewsCard.handleArrow = function (path, dom) {
  if (path) {
    dom.addEventListener('click', () => {
      NewsCard.getCurrNew(path);
    });
  } else {
    dom.style.display = 'none';
  }
}

NewsCard.getCurrNew = function (path) {
  chrome.runtime.sendMessage({
      action: 'getCurrNew',
      path,
    },
    res => {
      const card = document.getElementById('new-card');

      card.innerHTML = `<div id="path">${res.path}</div>
<div id="left-arrow" class="card-arrow"><<<</div>
<div id="right-arrow" class="card-arrow">>>></div>
${res.text}`;

      NewsCard.addListeners();
    }
  );
}