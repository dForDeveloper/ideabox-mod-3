let ideas = [];

window.onload = handleOnLoad;

document.querySelector('.form').addEventListener('submit', handleSubmit);
document.querySelector('.form--submit').addEventListener('submit', handleSubmit);
document.querySelector('.main').addEventListener('click', handleClick);
document.querySelector('.input--search').addEventListener('keyup', handleChange);

function handleOnLoad() {
  if(localStorage.getItem('ideas')) {
    const storedIdeas = JSON.parse(localStorage.getItem('ideas'));
    storedIdeas.forEach((idea) => {
      const { title, body, quality, id } = idea;
      const reinstantiatedIdea = new Idea(title, body, quality, id);
      ideas.push(reinstantiatedIdea);
      prependIdeaCard(reinstantiatedIdea);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const title = document.querySelector('.form--title').value;
  const body = document.querySelector('.form--body').value;
  const idea = new Idea(title, body);
  ideas.push(idea);
  idea.save(ideas);
  prependIdeaCard(idea);
}

function prependIdeaCard(idea) {
  const { title, body, quality, id } = idea;
  const ideaCard = document.createElement('article');
  const qualities = ['swill', 'plausible', 'genius'];
  ideaCard.id = id;
  ideaCard.classList.add('article')
  ideaCard.innerHTML = `
    <h3>${title}</h3>
    <p>${body}</p>
    <div>
      Quality: <span class=${'span--' + id}>${qualities[quality]}</span>
      <button class="button--decrease">Decrease Quality</button>
      <button class="button--increase">Increase Quality</button>
      <button class="button--delete">Delete</button>
    </div>
  `;
  document.querySelector('.main').prepend(ideaCard);
}

function handleClick(event) {
  const { classList } = event.target;
  if (classList.contains('button--delete')) {
    deleteIdea(event.target);
  } else if (classList.contains('button--increase')) {
    updateIdeaQuality(event.target, 1);
  } else if (classList.contains('button--decrease')) {
    updateIdeaQuality(event.target, -1);
  }
}

function deleteIdea(target) {
  const id = parseInt(target.closest('.article').id);
  const ideaToDelete = ideas.find(idea => idea.id === id)
  ideas = ideaToDelete.delete(ideas);
  target.closest('.article').remove();
}

function updateIdeaQuality(target, direction) {
  const qualities = ['swill', 'plausible', 'genius'];  
  const id = parseInt(target.closest('.article').id);
  const ideaToUpdate = ideas.find(idea => idea.id === id);
  ideas = ideaToUpdate.updateQuality(ideas, direction);
  const qualitySpan = document.querySelector(`.span--${id}`)
  qualitySpan.innerText = qualities[ideaToUpdate.quality];
}

function handleChange(event) {
  const query = event.target.value;
  document.querySelector('.main').innerHTML = '';
  const matchingIdeas = ideas.filter(idea => {
    return idea.title.includes(query) || idea.body.includes(query);
  });
  matchingIdeas.forEach(idea => prependIdeaCard(idea));
}