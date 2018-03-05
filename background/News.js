class News {
  constructor(url) {
    this.url = url;
  }

  static getNews() {
    return JSON.parse(localStorage.getItem('FEDN-content'));
  }

  static saveNew(news) {
    localStorage.setItem('FEDN-content', news);
  }

  static getPaths() {
    return JSON.parse(localStorage.getItem('FEDN-path'));
  }

  static savePath(paths) {
    localStorage.setItem('FEDN-path', paths);
  }

  async getCurrNew(path) {
    const news = News.getNews() || [];
    let record = news.find(n => n.path === path);
    let curr = record && record.text;

    if (!curr) {
      const text = await fetch(this.url, {
        method: 'GET',
      }).then(res => res.text());

      curr = await GITHUB.getMarkdown(text);
      news.push({ path, text: curr });
      News.saveNew(JSON.stringify(news));
    }

    return { path, text: curr };
  }
}
