import './css/style.css';

const sortOrders = [
  { field: 'id', dir: 'asc' },
  { field: 'id', dir: 'desc' },
  { field: 'title', dir: 'asc' },
  { field: 'title', dir: 'desc' },
  { field: 'year', dir: 'asc' },
  { field: 'year', dir: 'desc' },
  { field: 'imdb', dir: 'asc' },
  { field: 'imdb', dir: 'desc' },
];

function loadData() {
  return new Promise((resolve) => {
    const films = [
      {
        id: 26, title: 'Побег из Шоушенка', imdb: 9.30, year: 1994,
      },
      {
        id: 25, title: 'Крёстный отец', imdb: 9.20, year: 1972,
      },
      {
        id: 27, title: 'Крёстный отец 2', imdb: 9.00, year: 1974,
      },
      {
        id: 1047, title: 'Тёмный рыцарь', imdb: 9.00, year: 2008,
      },
      {
        id: 223, title: 'Криминальное чтиво', imdb: 8.90, year: 1994,
      },
    ];
    resolve(films);
  });
}

let filmsData = [];

function renderTable(films) {
  const tbody = document.querySelector('.films-table tbody');
  tbody.innerHTML = '';
  films.forEach((film) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>#${film.id}</td>
      <td>${film.title}</td>
      <td>(${film.year})</td>
      <td>imdb: ${film.imdb.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function updateHeaderIndicator(field, dir) {
  const headers = document.querySelectorAll('.films-table th');
  headers.forEach((th) => {
    th.classList.remove('sorted-asc', 'sorted-desc');
    if (th.dataset.sort === field) {
      th.classList.add(dir === 'asc' ? 'sorted-asc' : 'sorted-desc');
    }
  });

  const indicator = document.querySelector('.sort-indicator');
  const fieldNames = {
    id: 'id', title: 'Название', year: 'Год', imdb: 'IMDb',
  };
  const dirNames = { asc: '▲ по возрастанию', desc: '▼ по убыванию' };
  indicator.textContent = `Сортировка: ${fieldNames[field]} ${dirNames[dir]}`;
}

function sortInMemory(field, dir) {
  const sorted = [...filmsData].sort((a, b) => {
    let comparison = 0;
    if (a[field] > b[field]) {
      comparison = 1;
    } else if (a[field] < b[field]) {
      comparison = -1;
    }
    return dir === 'asc' ? comparison : -comparison;
  });

  renderTable(sorted);
  updateHeaderIndicator(field, dir);
}

let currentSortIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  loadData().then((films) => {
    filmsData = films;
    renderTable(filmsData);
    sortInMemory(sortOrders[0].field, sortOrders[0].dir);
    currentSortIndex = 1;

    setInterval(() => {
      const { field, dir } = sortOrders[currentSortIndex];
      sortInMemory(field, dir);
      currentSortIndex = (currentSortIndex + 1) % sortOrders.length;
    }, 2000);
  });
});
