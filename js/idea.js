class Idea {
  constructor(title, body, quality, id) {
    this.title = title;
    this.body = body;
    this.quality = quality || 'swill';
    this.id = id || Date.now();
  }

  save(ideas) {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }
}