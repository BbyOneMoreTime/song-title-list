document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('results');
    let names = [];

    fetch('musicstore.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(preloadedNamesText => {
            names = preloadedNamesText.split(',').map(name => name.trim()).filter(name => name !== '');
            showAllSongs();
        })
        .catch(error => {
            console.error('Error loading names from musicstore.txt:', error);
            resultsDiv.textContent = `Error: Could not load names from musicstore.txt. Please ensure the file exists.`;
        });

    searchButton.addEventListener('click', () => {
        performSearch();
    });

    searchInput.addEventListener('input', () => {
        performSearch();
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        resultsDiv.innerHTML = '';

        if (names.length === 0) {
            resultsDiv.textContent = 'Ẩu rồi, nhập lại đê.';
            return;
        }

        if (searchTerm === '') {
            showAllSongs();
            return;
        }

        const foundNames = names.filter(name =>
            name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (foundNames.length > 0) {
            const ul = document.createElement('ul');
            foundNames.forEach(name => {
                const li = document.createElement('li');
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                li.innerHTML = name.replace(regex, '<span class="highlight">$1</span>');
                ul.appendChild(li);
            });
            resultsDiv.appendChild(ul);
        } else {
            resultsDiv.textContent = `Không có cái gì là "${searchTerm}".`;
        }
    }

    function showAllSongs() {
        resultsDiv.innerHTML = '<b>Danh sách tất cả bài hát:</b>';
        if (names.length === 0) {
            resultsDiv.innerHTML += '<p>Chưa có dữ liệu.</p>';
            return;
        }
        const ol = document.createElement('ol');
        names.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            ol.appendChild(li);
        });
        resultsDiv.appendChild(ol);
    }

    const images = [
        './images/mountain_landscape.jpg',
        './images/virgin_gorda_rocks.jpg',
        './images/Chapter3_2_web_10.JPG',
    ];

    function setRandomBackground() {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        document.body.style.backgroundImage = `url('${randomImage}')`;
    }

    window.onload = setRandomBackground;
});