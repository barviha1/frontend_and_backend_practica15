document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('input[type="date"]').valueAsDate = new Date();
    const form = document.querySelector('.add-entry__form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = form.querySelector('input[type="date"]').value;
        const title = form.querySelector('input[type="text"]').value;
        const description = form.querySelector('textarea').value;
        const status = form.querySelector('select').value;
        
        if (!date || !title || !status) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        addDiaryEntry(date, title, description, status);
        form.reset();
        
        form.querySelector('input[type="date"]').valueAsDate = new Date();
        
        alert('Запись успешно добавлена!');
    });
    addDeleteButtonsToExisting();
});

function addDiaryEntry(date, title, description, status) {
    const timeline = document.querySelector('.timeline');
    
    const formattedDate = formatDate(date);
    
    let statusClass = '';
    let statusText = '';
    switch(status) {
        case 'completed':
            statusClass = 'timeline__status--completed';
            statusText = 'Завершено';
            break;
        case 'in-progress':
            statusClass = 'timeline__status--in-progress';
            statusText = 'В процессе';
            break;
        case 'planned':
            statusClass = 'timeline__status--planned';
            statusText = 'Запланировано';
            break;
    }
    const newEntry = document.createElement('div');
    newEntry.className = 'timeline__item';
    newEntry.innerHTML = `
        <div class="timeline__date">${formattedDate}</div>
        <div class="timeline__content">
            <h3 class="timeline__title">${title}</h3>
            <p class="timeline__description">${description || 'Описание отсутствует'}</p>
            <span class="timeline__status ${statusClass}">${statusText}</span>
            <button class="delete-btn" onclick="deleteEntry(this)">Удалить</button>
        </div>
    `;
    timeline.insertBefore(newEntry, timeline.firstChild);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function deleteEntry(button) {
    if (confirm('Удалить эту запись?')) {
        const entry = button.closest('.timeline__item');
        entry.remove();
    }
}



document.head.appendChild(style);