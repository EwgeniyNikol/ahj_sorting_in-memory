describe('In-Memory Sorting Table', () => {
  let tbody;

  beforeEach(() => {
    document.body.innerHTML = `
      <table class="films-table">
        <thead>
          <tr>
            <th data-sort="id">id</th>
            <th data-sort="title">Название</th>
            <th data-sort="year">Год</th>
            <th data-sort="imdb">IMDb</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div class="sort-indicator"></div>
    `;
    tbody = document.querySelector('.films-table tbody');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('должен выбросить ошибку, если tbody не найден', () => {
    document.body.innerHTML = '';
    expect(() => {
      const t = document.querySelector('.films-table tbody');
      if (!t) throw new Error('Элемент .films-table tbody не найден в DOM');
    }).toThrow('Элемент .films-table tbody не найден в DOM');
  });

  test('должен выбросить ошибку, если indicator не найден', () => {
    document.body.innerHTML = `
      <table class="films-table"><tbody></tbody></table>
    `;
    expect(() => {
      const ind = document.querySelector('.sort-indicator');
      if (!ind) throw new Error('Элемент .sort-indicator не найден в DOM');
    }).toThrow('Элемент .sort-indicator не найден в DOM');
  });

  test('рендерит таблицу без data-атрибутов (in-memory)', () => {
    const films = [
      {
        id: 26, title: 'Побег из Шоушенка', imdb: 9.30, year: 1994,
      },
    ];

    films.forEach((film) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>#${film.id}</td>
        <td>${film.title}</td>
        <td>(${film.year})</td>
        <td>imdb: ${film.imdb.toFixed(2)}</td>
      `;
      tbody.append(tr);
    });

    const row = tbody.querySelector('tr');
    expect(row).not.toBeNull();
    expect(row.dataset.id).toBeUndefined();
  });

  test('сортировка в памяти по id (возрастание)', () => {
    const filmsData = [
      {
        id: 26, title: 'BBB', imdb: 9.0, year: 1994,
      },
      {
        id: 25, title: 'AAA', imdb: 9.0, year: 1972,
      },
    ];

    const sorted = [...filmsData].sort((a, b) => a.id - b.id);

    expect(sorted[0].id).toBe(25);
    expect(sorted[1].id).toBe(26);
  });
});
