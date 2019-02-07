class Idea {
  constructor(title, body, quality, id) {
    this.title = title;
    this.body = body;
    this.quality = quality || 0;
    this.id = id || Date.now();
  }

  save(ideas) {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }

  delete(ideas) {
    const newIdeas = ideas.filter(idea => idea.id !== this.id);
    this.save(newIdeas)
    return newIdeas;
  }
}