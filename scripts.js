// Dynamic content like manhwa cards and recently added series can be fetched via an API
// and populated in the DOM dynamically. Example API call for manhwa data.

function loadManhwaData() {
    const followingSection = document.querySelector('.following-section .manhwa-grid');
    const readingHistorySection = document.querySelector('.reading-history-section .manhwa-grid');
    const mostRecentPopularSection = document.querySelector('.most-recent-popular-section .manhwa-grid');
    const recentlyAddedList = document.querySelector('.recently-added-list');

    // Example: Replace with actual API call
    const manhwaData = [
        { title: 'Second Life Ranker', chapter: 'Chap 185', time: '11 hours ago', image: 'cover1.jpg' },
        { title: 'Lookism', chapter: 'Chap 522', time: '3 hours ago', image: 'cover2.jpg' },
        // Add more data
    ];

    manhwaData.forEach(manhwa => {
        const manhwaCard = document.createElement('div');
        manhwaCard.classList.add('manhwa-card');
        manhwaCard.innerHTML = `
            <img src="${manhwa.image}" alt="${manhwa.title}">
            <p>${manhwa.title}</p>
            <p>${manhwa.chapter}</p>
            <p>${manhwa.time}</p>
        `;

        // Append manhwa card to the correct section
        followingSection.appendChild(manhwaCard);
        readingHistorySection.appendChild(manhwaCard.cloneNode(true));
        mostRecentPopularSection.appendChild(manhwaCard.cloneNode(true));

        // Add to recently added list
        const recentItem = document.createElement('li');
        recentItem.textContent = manhwa.title + ' - ' + manhwa.chapter;
        recentlyAddedList.appendChild(recentItem);
    });
}

// Load data when the page loads
window.onload = loadManhwaData;
