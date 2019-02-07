const ideas = [];

document.querySelector('.form').addEventListener('submit', handleSubmit);
document.querySelector('.form--submit').addEventListener('submit', handleSubmit);

window.onload = handleOnLoad;

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
  ideaCard.id = id;
  ideaCard.innerHTML = `
    <h3>${title}</h3>
    <p>${body}</p>
    <div>
      Quality: ${quality}
    </div>
  `;
  document.querySelector('.main').prepend(ideaCard);
}

