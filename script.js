
// URL of the JSON file
const jsonUrl = 'skills.json';

// Fetch the JSON file
fetch(jsonUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch JSON data: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    const skillsContainer = document.getElementById('skillsContainer');

    // Dynamically add each skill to the container
    data.forEach(skill => {
      const skillCard = document.createElement('div');
      skillCard.classList.add('skill-card');

      // Add skill content
      skillCard.innerHTML = `
        <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
        <span class="skill-name">${skill.name}</span>
      `;

      skillsContainer.appendChild(skillCard);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
// Map categories to JSON files
const categoryFiles = {
  coding: './data/coding.json',
  editing: './data/editing.json',
  learning: './data/learning.json'
};


// Function to load JSON and render items
async function loadItems() {
  const contentContainer = document.getElementById('content');
  contentContainer.innerHTML = ''; // Clear existing content

  for (const [category, file] of Object.entries(categoryFiles)) {
    const response = await fetch(file);
    const items = await response.json();

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = `item ${category}`;
      div.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;
      div.style.display = 'none'; // Initially hide items
      contentContainer.appendChild(div);
    });
  }

  // Show all items by default
  filterCategory('all');
}

// Function to filter items by category
function filterCategory(category) {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Load items on page load
window.onload = loadItems;


