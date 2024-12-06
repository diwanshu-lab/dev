// JSON file paths mapped to categories
const categoryFiles = {
  coding: 'data/coding.json',
  editing: 'data/editing.json',
  learning: 'data/learning.json'
};

// Load all data on page load
async function loadData() {
  const allData = [];
  for (const category in categoryFiles) {
    const response = await fetch(categoryFiles[category]);
    const data = await response.json();
    allData.push(...data.map(item => ({ ...item, category })));
  }
  renderItems(allData, 'all');
}

// Render items based on category
function renderItems(data, filter) {
  const container = document.getElementById('content');
  container.innerHTML = ''; // Clear existing items

  data.forEach(item => {
    if (filter === 'all' || item.category === filter) {
      const div = document.createElement('div');
      div.className = 'item show';
      div.innerHTML = `
        <img src="${item.icon}" alt="${item.name}">
        <h3>${item.name}</h3>
      `;
      container.appendChild(div);
    }
  });
}

// Filter category on button click
async function filterCategory(category) {
  const allData = [];
  for (const key in categoryFiles) {
    const response = await fetch(categoryFiles[key]);
    const data = await response.json();
    allData.push(...data.map(item => ({ ...item, category: key })));
  }
  renderItems(allData, category);
}

// Initial load
loadData();
