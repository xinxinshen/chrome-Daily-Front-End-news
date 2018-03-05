const GITHUB = new API(
  'https://api.github.com',
  'fengshangwuqi',
  'Front-End-News'
);

async function handleMessage(message, sender, sendResponse) {
  const paths = News.getPaths() || [];
  const curr = formatDate(new Date());

  switch (message.action) {
    case 'getPath':
      if (paths.includes(curr)) {
        sendResponse(paths);
      } else {
        const year = await GITHUB.getContent('history');
        const month = await GITHUB.getContent(
          `history/${year[year.length - 1]}`
        );
        const day = await GITHUB.getContent(
          `history/${year[year.length - 1]}/${month[month.length - 1]}`
        );
        const path = `${year.pop()}/${month.pop()}/${day.pop()}`;

        paths.push(path);
        News.savePath(JSON.stringify(paths));
        sendResponse(paths);
      }
      break;
    case 'getCurrNew':
      const currPath = message.path;
      const NEWS = new News(
        `https://raw.githubusercontent.com/FengShangWuQi/Front-End-News/master/history/${currPath}/README.md`
      );

      sendResponse(await NEWS.getCurrNew(currPath));
      break;
    default:
      sendResponse(false);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender, sendResponse);
  return true;
});
