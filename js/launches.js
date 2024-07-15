document.addEventListener('DOMContentLoaded', function() {
    let currentItems = 6;
    const loadMoreButton = document.querySelector('#load-more');
    const grid = document.querySelector('.news-grid');

    fetch('https://api.spacexdata.com/v4/launches/upcoming')
        .then(response => response.json())
        .then(data => {
            populateNews(data);
            loadMoreButton.addEventListener('click', function() {
                loadMoreNews(data);
            });
        })
        .catch(err => console.error('Failed to fetch news:', err));

    function populateNews(newsItems) {
        newsItems.slice(0, currentItems).forEach(item => {
            grid.appendChild(createNewsItem(item));
        });
        if (currentItems >= newsItems.length) {
            loadMoreButton.style.display = 'none';
        }
    }

    function loadMoreNews(newsItems) {
        newsItems.slice(currentItems, currentItems + 6).forEach(item => {
            grid.appendChild(createNewsItem(item));
        });
        currentItems += 6;
        if (currentItems >= newsItems.length) {
            loadMoreButton.style.display = 'none';
        }
    }

    function createNewsItem(item) {
        const newsDiv = document.createElement('div');
        newsDiv.className = 'news-item';
        newsDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>${new Date(item.date_utc).toLocaleDateString()}</p>
            <p>${item.details || 'No details available'}</p>
            <a href="launch-deteails.html?id=${item.id}">View Details</a>
        `;
        return newsDiv;
    }
});
