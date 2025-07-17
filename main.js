const products = [
    {category: 'Discord', level: 'SENIOR', title: 'Полный комплект: Discord-бот + панель + логика', price: 5499},
    {category: 'Discord', level: 'MIDDLE', title: 'Discord-бот + веб-сайт — статистика и панель', price: 2749},
    {category: 'Discord', level: 'MIDDLE', title: 'Discord-бот за 1 000 ₽ — заявки, учёт, уведомления', price: 1100},
    {category: 'Discord', level: 'JUNIOR', title: 'Discord-бот за 500 ₽ — меню, команды и логика', price: 549.90},
    {category: 'Discord', level: 'BEGINNER', title: 'Discord-бот за 150 ₽ — минимальный помощник', price: 164.97},
    {category: 'Telegram', level: 'SENIOR', title: 'Полный комплект: Telegram-бот + сайт + логика + интеграции', price: 5601},
    {category: 'Telegram', level: 'MIDDLE', title: 'Telegram-бот + сайт — панель, учёт и интеграции', price: 2800},
    {category: 'Telegram', level: 'MIDDLE', title: 'Telegram-бот за 1 000 ₽ — заявки, уведомления, админка', price: 1120},
    {category: 'Telegram', level: 'JUNIOR', title: 'Telegram-бот за 500 ₽ — меню, база и логика', price: 560.08},
    {category: 'Telegram', level: 'BEGINNER', title: 'Telegram-бот за 150 ₽ — минимальный помощник', price: 168.02},
    {category: 'VK', level: 'SENIOR', title: 'VK-бот + Админ-сайт + база + логика + интеграции', price: 5550},
    {category: 'VK', level: 'MIDDLE', title: 'VK-бот + веб-сайт — личный кабинет, учёт и интеграции', price: 2775},
    {category: 'VK', level: 'MIDDLE', title: 'VK-бот за 1 000 ₽ — заявки, уведомления, админка', price: 1110},
    {category: 'VK', level: 'JUNIOR', title: 'VK-бот за 500 ₽ — меню, база и логика', price: 554.99},
    {category: 'VK', level: 'BEGINNER', title: 'VK-бот за 150 ₽ — минимальный помощник', price: 166.50},
    {category: 'VK', level: 'READY', title: 'VK-бот для бизнеса [игровой, готовый]', price: 876.88},
    {category: 'TG Autobuy', level: 'SENIOR', title: 'Автопокупка подарков в TG', price: 3473.68}
];

const catalog = document.getElementById('catalog');
const filter = document.getElementById('filter');
const searchInput = document.getElementById('search');
const sortBtn = document.getElementById('sortPrice');
let ascending = true;

function initFilters() {
    const categories = ['all', ...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.innerText = cat;
        filter.append(option);
    });
}

function renderList(list) {
    catalog.innerHTML = '';
    list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="info">
                <div class="category">${item.category} | ${item.level}</div>
                <h2>${item.title}</h2>
                <div class="price">${item.price.toLocaleString('ru-RU')} ₽</div>
            </div>
            <button onclick="order('${item.title}', ${item.price})">Заказать</button>
        `;
        catalog.append(card);
    });
}

function applyFilters() {
    const term = searchInput.value.toLowerCase();
    const cat = filter.value;
    let filtered = products.filter(p => p.title.toLowerCase().includes(term));
    if (cat !== 'all') filtered = filtered.filter(p => p.category === cat);
    renderList(filtered);
}

function order(title, price) {
    const msg = `Я хочу заказать услугу: ${title}, цена: ${price.toLocaleString('ru-RU')} ₽`;
    Telegram.WebApp.sendData(msg);
}

filter.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);
sortBtn.addEventListener('click', () => {
    products.sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
    ascending = !ascending;
    applyFilters();
});

// Инициализация
initFilters();
renderList(products);
