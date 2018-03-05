chrome.runtime.sendMessage(
  {
    action: 'getPath',
  },
  res => {
    NewsCard.init(res);
    NewsCard.getCurrNew(res[res.length - 1]);
  }
);
