'use strict'

const container = document.querySelector('.container');

async function fetchAsync () {
  const response = await fetch('./data/data.json');
  return await response.json();
}

function createTable(cars, container) {
  let currentField = null;
  let currentSign = 1;

  generateHtml(cars, container);

  container.addEventListener('click', (e) => {
    const headerCell = e.target.closest('[data-sort-field]');

    if (headerCell) {
      const { sortField } = headerCell.dataset;

      sortField === currentField ? currentSign = -currentSign : currentSign = 1;

      currentField = sortField;

      const sortedCars = sortedCarsBy(cars, sortField, currentSign);

      generateHtml(sortedCars, container);
    }
  })
}

function sortedCarsBy(cars, field, sign) {
  return [...cars].sort((a, b) => {
    switch (typeof cars[0][field]) {
      case 'number':
        return sign * (a[field] - b[field]);
      case 'string':
        return sign * a[field].localeCompare(b[field]);
      default:
        return 0;
    }
  });
}

function generateHtml(cars, container) {
  container.innerHTML = `
    <table>
      <thead>
        <th data-sort-field="price">Price</th>
        <th data-sort-field="type">Type</th>
        <th data-sort-field="name">Name</th>
        <th data-sort-field="city">city MPG</th>
        <th data-sort-field="highway">highway MPG</th>
      </thead>
      <tbody>
        ${generateRows(cars)}
      </tbody>
    </table>
  `
}
 
function generateRows(cars){
  return cars.map(car => `
    <tr>
      <td>$${(car.price).toLocaleString('en-US')}</td>
      <td>${car.type}</td>
      <td>${car.name}</td>
      <td>${car.city}</td>
      <td>${car.highway}</td>
    </tr>
  `).join('');
} 

function initApp() {
  fetchAsync()
  .then(data => createTable(data, container))
  .catch(error => console.error(error));
}

initApp();
