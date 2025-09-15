// Конфигурация
const IMAGES_CONFIG = {
  paths: [
    "robin/1.jpeg", "robin/2.jpeg", "robin/3.jpeg", "robin/4.jpeg", "robin/5.jpeg",
    "robin/6.jpeg", "robin/7.jpeg", "robin/8.jpeg", "robin/9.jpeg", "robin/10.jpeg",
    "robin/11.jpeg", "robin/12.jpeg", "robin/13.jpeg", "robin/14.jpeg", "robin/15.jpeg",
    "robin/16.jpeg", "robin/17.jpeg"
  ],
  captions: [
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
  ],
  fallbackImage: 'image/logo.jpeg'
};

// Кэширование DOM элементов
const DOM = {
  image: document.getElementById("my_image"),
  caption: document.getElementById("figcaption"),
  button: document.getElementById("my_button"),
  imageContainer: document.querySelector('.image-container'),
  captionContainer: document.querySelector('.caption-container'),
  photoStacks: document.querySelectorAll('.photo-stack')
};

// Утилиты
const Utils = {
  // Проверка на touch-устройство
  isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  
  // Генерация случайного числа в диапазоне
  getRandomIndex: (max) => Math.floor(Math.random() * max),
  
  // Плавная прокрутка к элементу
  scrollToElement: (element, offset = 20) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  },
  
  // Дебаунс для resize события
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Функция для адаптации размера текста подписи
function adjustCaptionSize() {
  const screenWidth = window.innerWidth;
  const caption = DOM.caption;
  
  // Устанавливаем минимальные высоты
  const sizes = {
    container: { minHeight: '300px' },
    caption: { minHeight: '80px' }
  };
  
  if (screenWidth < 480) {
    caption.style.fontSize = '13px';
    caption.style.padding = '8px';
    sizes.container.minHeight = '250px';
    sizes.caption.minHeight = '70px';
  } else if (screenWidth < 768) {
    caption.style.fontSize = '14px';
    caption.style.padding = '10px';
    sizes.container.minHeight = '280px';
    sizes.caption.minHeight = '75px';
  } else {
    caption.style.fontSize = '16px';
    caption.style.padding = '15px';
  }
  
  // Применяем размеры
  DOM.imageContainer.style.minHeight = sizes.container.minHeight;
  DOM.captionContainer.style.minHeight = sizes.caption.minHeight;
}

function initPhotoStackInteractions() {
  const photoStacks = document.querySelectorAll('.photo-stack');
  
  photoStacks.forEach(stack => {
    let isActive = false;
    
    const handleStackClick = (e) => {
      if (Utils.isTouchDevice()) {
        e.preventDefault();
      }
      
      isActive = !isActive;
      
      if (isActive) {
        stack.classList.add('mobile-active');
      } else {
        stack.classList.remove('mobile-active');
      }
      
      // Блокируем дальнейшие клики на короткое время
      stack.style.pointerEvents = 'none';
      setTimeout(() => {
        stack.style.pointerEvents = 'auto';
      }, 500);
    };
    
    // Удаляем старые обработчики если есть
    if (stack._clickHandler) {
      stack.removeEventListener('click', stack._clickHandler);
      stack.removeEventListener('touchstart', stack._clickHandler);
    }
    
    // Добавляем новые обработчики
    stack.addEventListener('click', handleStackClick);
    stack.addEventListener('touchstart', handleStackClick, { passive: false });
    
    // Сохраняем ссылку на обработчик для возможной очистки
    stack._clickHandler = handleStackClick;
  });
}

// Обработчик ошибок загрузки изображения
function handleImageError() {
  this.src = IMAGES_CONFIG.fallbackImage;
  this.alt = 'Изображение не загрузилось';
  console.warn('Изображение не загрузилось, используется запасной вариант');
}

// Основная функция для показа случайного изображения и подписи
function showRandomImage() {
  const button = DOM.button;
  const index = Utils.getRandomIndex(IMAGES_CONFIG.paths.length);
  
  // Сброс активного состояния
  DOM.image.classList.remove("active");
  DOM.caption.classList.remove("active");
  
  // Устанавливаем новый контент
  DOM.image.src = IMAGES_CONFIG.paths[index];
  DOM.image.alt = `Робин ${index + 1}`;
  DOM.caption.textContent = IMAGES_CONFIG.captions[index];
  
  // Немного задерживаем для анимации
  setTimeout(() => {
    DOM.image.classList.add("active");
    DOM.caption.classList.add("active");
    
    // Обновляем размер подписи
    adjustCaptionSize();
    
    // Прокручиваем к кнопке после показа предсказания
    setTimeout(() => {
      Utils.scrollToElement(button);
    }, 500);
  }, 50);
}

// Инициализация приложения
function initApp() {
  // Предзагрузка изображений (опционально)
  IMAGES_CONFIG.paths.forEach(path => {
    const img = new Image();
    img.src = path;
  });
  
  // Настройка обработчиков
  DOM.image.addEventListener('error', handleImageError);
  DOM.button.addEventListener('click', showRandomImage);
  
  // Инициализация взаимодействий
  initPhotoStackInteractions();
  
  // Настройка адаптивности
  adjustCaptionSize();
  window.addEventListener('resize', Utils.debounce(adjustCaptionSize, 250));
  
  // Добавляем класс для плавной анимации
  document.body.classList.add('loaded');
  
  console.log('Приложение инициализировано успешно');
  initMobileMenu(); // Добавьте эту строку
}

// Запуск приложения после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Очистка (для SPA или если нужно перезагрузить)
function cleanup() {
  DOM.image.removeEventListener('error', handleImageError);
  DOM.button.removeEventListener('click', showRandomImage);
  window.removeEventListener('resize', Utils.debounce(adjustCaptionSize, 250));
  
  // Удаляем обработчики с photo stacks
  DOM.photoStacks.forEach(stack => {
    if (stack._clickHandler) {
      stack.removeEventListener('click', stack._clickHandler);
    }
  });
  
  document.body.classList.remove('loaded');

    // Очистка меню
  const menuToggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.menu-overlay');
  const menu = document.querySelector('.menu');
  
  if (menuToggle) {
    menuToggle.removeEventListener('click', toggleMenu);
  }
  
  if (overlay) {
    overlay.removeEventListener('click', toggleMenu);
  }
  
  window.removeEventListener('resize', handleResize);
}

// Функция для мобильного меню
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const overlay = document.querySelector('.menu-overlay');
  const body = document.body;

  if (!menuToggle || !menu || !overlay) return;

  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  };

  // Обработчик для кнопки бургера
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Обработчик для оверлея
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      toggleMenu();
    }
  });

  // Обработчик для ссылок в меню
  const menuLinks = menu.querySelectorAll('.menu__list-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      toggleMenu();
    });
  });

  // Закрываем меню при изменении размера окна
  const handleResize = () => {
    if (window.innerWidth > 768 && menu.classList.contains('active')) {
      toggleMenu();
    }
  };
  
  window.addEventListener('resize', handleResize);
}


// Инициализация мобильного меню при загрузке
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
});
if (document.querySelector('.robin-project')) {
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
  });
}

// Явная инициализация для страницы Robin Project
if (window.location.pathname.includes('robin-project.html') || 
    document.querySelector('.robin-project')) {
  console.log('Это страница Robin Project, инициализируем меню');
  document.addEventListener('DOMContentLoaded', initMobileMenu);
}
