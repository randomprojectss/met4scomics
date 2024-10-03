const comics = [
    'https://via.placeholder.com/600x400.png?text=Comic+1',
    'https://via.placeholder.com/600x400.png?text=Comic+2',
    'https://via.placeholder.com/600x400.png?text=Comic+3',
];

let currentComicIndex = 0;

const comicElement = document.getElementById('comic');

function displayComic(index) {
    comicElement.innerHTML = `<img src="${comics[index]}" alt="Comic ${index + 1}" class="comic">`;
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentComicIndex > 0) {
        currentComicIndex--;
        displayComic(currentComicIndex);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentComicIndex < comics.length - 1) {
        currentComicIndex++;
        displayComic(currentComicIndex);
    }
});

// Initial comic display
displayComic(currentComicIndex);
