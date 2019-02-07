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

  updateQuality(ideas, direction) {
    const newIdeas = ideas.map(idea => {
      if (idea.id === this.id) {
        switch (direction) {
          case -1:
            this.quality = Math.max(0, this.quality + direction);
            break;
          case 1:
            this.quality = Math.min(2, this.quality + direction);
            break;
          default:
            break;
          }
        }
      return idea;
    });
    this.save(newIdeas)
    return newIdeas;
  }

  edit(ideas, title, body) {
    const newIdeas = ideas.map(idea => {
      if (idea.id === this.id) {
        this.title = title;
        this.body = body;
      }
      return idea;
    });
    this.save(newIdeas);
    return newIdeas;
  }
}