var images = [
  ["robin/1.jpeg","robin/2.jpeg","robin/3.jpeg","robin/4.jpeg","robin/5.jpeg",
   "robin/6.jpeg","robin/7.jpeg","robin/8.jpeg","robin/9.jpeg","robin/10.jpeg",
   "robin/11.jpeg","robin/12.jpeg","robin/13.jpeg","robin/14.jpeg","robin/15.jpeg",
   "robin/16.jpeg","robin/17.jpeg"],
   [
    "Сегодня тебя ждет уютный, спокойный вечер. Самое время замедлиться и насладиться моментом.",
    "Лето закончилось, но тебя ждет приятное предвкушение праздников и волшебства. Начинай чувствовать новогоднее настроение!",
    "Сегодня ты сам станешь лучшим подарком для кого-то. Твое внимание и забота будут бесценны.",
    "Твой сегодняшний девиз: 'Поспал — можно и поесть, поел — можно и поспать'. Позволь себе отдохнуть без угрызений совести.",
    "Сегодня звезды советуют заняться обучением или саморазвитием. Успех не заставит себя ждать!",
    "Тебя ждет маленький личный праздник! Не отказывай себе в удовольствии и вкусняшке — ты это заслужил(а).",
    "Твоя страсть к путешествиям даст о себе знать. Возможно, поступят интересные предложения или появятся мысли о новой поездке.",
    "Сегодняшний день идеально подходит для похода в ресторан или кафе. Хорошая еда и компания поднимут настроение.",
    "Мечты об отдыхе на море начинают сбываться. Начни планировать — все получится!",
    "Ты здорово потрудился(ась). Сегодня вселенная разрешает тебе отдохнуть и заняться собой. Мир подождет.",
    "Самое время для красивых фото и смены обстановки. Свежий воздух и природа подарят вдохновение.",
    "Ты выступишь тем, кто сблизит людей сегодня. Твоя коммуникабельность поможет наладить связи.",
    "Сегодняшний день благоволит к небольшим покупкам. Что-то новое порадует тебя и поднимет настроение.",
    "Ты заслуживаешь день неги и отдыха в кругу самых близких. Просто валяться и ничего не делать — это тоже план.",
    "Активный отдых и свежий воздух — вот что нужно тебе сегодня для заряда энергией.",
    "Готовься получить знак внимания. Возможно, тебя ждут цветы, комплимент или приятный сюрприз.",
    "Твое умение легко находить общий язык с людьми будет на пике. Новые знакомства и интересные беседы гарантированы."
 ]
];

// Функция для адаптации размера текста подписи
function adjustCaptionSize() {
  const caption = document.getElementById('figcaption');
  const screenWidth = window.innerWidth;
  
  if (screenWidth < 480) {
    caption.style.fontSize = '13px';
    caption.style.padding = '8px';
  } else if (screenWidth < 768) {
    caption.style.fontSize = '14px';
    caption.style.padding = '10px';
  } else {
    caption.style.fontSize = '16px';
    caption.style.padding = '15px';
  }
}

// Функция для плавной прокрутки к элементу
function scrollToElement(element, offset = 20) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Показ картинки и подписи (лотерея)
document.getElementById("my_button").addEventListener("click", function() {
  const button = this; // Сохраняем ссылку на кнопку
  
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
    
    // Обновляем размер подписи после изменения контента
    adjustCaptionSize();
    
    // Прокручиваем к кнопке после показа предсказания
    setTimeout(() => {
      scrollToElement(button);
    }, 500); // Задержка перед прокруткой к кнопке
    
  }, 50);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем класс для плавной анимации
  document.body.classList.add('loaded');
  
  // Инициализируем размер подписи
  adjustCaptionSize();
});

// Обновляем размер при изменении размера окна
window.addEventListener('resize', adjustCaptionSize);
