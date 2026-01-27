/**
 * Clock functionality for the start page
 */
function updateClock() {
    const now = new Date();
    
    // Format date
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    const dayOfWeek = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    const dateString = `${dayOfWeek}, ${day} ${month} ${year}`;
    
    // Format time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Update DOM
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    
    if (dateElement) {
        dateElement.textContent = dateString;
    }
    
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}
