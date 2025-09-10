var images = [
  ["robin/1.jpeg","robin/2.jpeg","robin/3.jpeg","robin/4.jpeg","robin/5.jpeg",
   "robin/6.jpeg","robin/7.jpeg","robin/8.jpeg","robin/9.jpeg","robin/10.jpeg",
   "robin/11.jpeg","robin/12.jpeg","robin/13.jpeg","robin/14.jpeg","robin/15.jpeg",
   "robin/16.jpeg","robin/17.jpeg"],
  ["Сонная булочка, но не хочешь упускать момент",
   "После окончания лета, сразу ждешь новый год",
   "Ты лучший подарочек для всех",
   "Тебе лучше всего подойдет фраза: Поспали - можно и поесть, поели- можно и поспать",
   "Ты любишь учится и самосовершенствоваться! Везде тебя ждет упех!",
   "Любишь свое день рождение, подарки и поесть",
   "Путешетвия - твоя страсть! Ты всегда знаешь, чем занять себя в дороге",
   "Радуешься походам в рестораны",
   "Мечтаешь о отдыхе на море",
   "Очень сильно устал спасать этот мир от грусти и печали",
   "Тебе не хватает фотосессии в поле с цветами",
   "Сближаешь других людей",
   "Посещаешь лучшие бутики",
   "Любишь валяться с близкими",
   "Ты рад активному отдыху",
   "Любишь получать цветы",
   "Экстроверт - твое второе имя"
  ]
];

// Показ картинки и подписи (лотерея)
document.getElementById("my_button").addEventListener("click", function() {
  var i = Math.floor(Math.random() * images[0].length);

  const image = document.getElementById("my_image");
  const caption = document.getElementById("figcaption");

  // Сброс активного состояния
  image.classList.remove("active");
  caption.classList.remove("active");

  // Меняем контент
  image.src = images[0][i];
  image.alt = "Робин " + (i + 1);
  caption.innerHTML = images[1][i];

  // Обработка ошибок загрузки изображения
  image.onerror = function() {
    this.src = 'image/logo.jpeg'; // Запасное изображение
    this.alt = 'Изображение не загрузилось';
  };

  // Немного задерживаем для анимации
  setTimeout(() => {
    image.classList.add("active");
    caption.classList.add("active");
  }, 50);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем класс для плавной анимации
  document.body.classList.add('loaded');
});
// Функция для адаптации размера текста
function adjustCaptionSize() {
  const caption = document.getElementById('figcaption');
  const screenWidth = window.innerWidth;
  
  if (screenWidth < 480) {
    caption.style.fontSize = '13px';
  } else if (screenWidth < 768) {
    caption.style.fontSize = '14px';
  } else {
    caption.style.fontSize = '16px';
  }
}

// Вызывать при загрузке и изменении размера окна
window.addEventListener('load', adjustCaptionSize);
window.addEventListener('resize', adjustCaptionSize);

// Также добавьте в обработчик клика:
document.getElementById("my_button").addEventListener("click", function() {
  // ... существующий код ...
  
  // После изменения контента обновляем размер
  setTimeout(adjustCaptionSize, 100);
});
