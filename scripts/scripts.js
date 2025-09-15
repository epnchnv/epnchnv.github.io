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
  
  if (!caption) return;
  
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
  if (DOM.imageContainer) DOM.imageContainer.style.minHeight = sizes.container.minHeight;
  if (DOM.captionContainer) DOM.captionContainer.style.minHeight = sizes.caption.minHeight;
}

function initPhotoStackInteractions() {
  const photoStacks = document.querySelectorAll('.photo-stack');
  
  if (!photoStacks.length) return;
  
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
  if (!DOM.button || !DOM.image || !DOM.caption) return;
  
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

// Функция для мобильного меню
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const overlay = document.querySelector('.menu-overlay');
  const body = document.body;

  // Если элементов меню нет на странице, выходим
  if (!menuToggle || !menu || !overlay) {
    console.log('Элементы меню не найдены на этой странице');
    return null;
  }

  const toggleMenu = () => {
    const isActive = menu.classList.contains('active');
    menuToggle.classList.toggle('active', !isActive);
    menu.classList.toggle('active', !isActive);
    overlay.classList.toggle('active', !isActive);
    body.style.overflow = !isActive ? 'hidden' : '';
  };

  // Обработчик для кнопки бургера
  const handleMenuToggleClick = (e) => {
    e.stopPropagation();
    toggleMenu();
  };

  // Обработчик для оверлея
  const handleOverlayClick = (e) => {
    if (e.target === overlay) {
      toggleMenu();
    }
  };

  // Обработчик для ссылок в меню
  const handleMenuLinkClick = function(e) {
    e.stopPropagation();
    toggleMenu();
  };

  // Добавляем обработчики
  menuToggle.addEventListener('click', handleMenuToggleClick);
  overlay.addEventListener('click', handleOverlayClick);

  const menuLinks = menu.querySelectorAll('.menu__list-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', handleMenuLinkClick);
  });

  // Закрываем меню при изменении размера окна
  const handleResize = () => {
    if (window.innerWidth > 768 && menu.classList.contains('active')) {
      toggleMenu();
    }
  };
  
  window.addEventListener('resize', handleResize);

  // Функция для очистки обработчиков
  const cleanupMenu = () => {
    menuToggle.removeEventListener('click', handleMenuToggleClick);
    overlay.removeEventListener('click', handleOverlayClick);
    menuLinks.forEach(link => {
      link.removeEventListener('click', handleMenuLinkClick);
    });
    window.removeEventListener('resize', handleResize);
  };

  return cleanupMenu;
}

// Инициализация приложения
function initApp() {
  console.log('Инициализация приложения...');
  
  // Предзагрузка изображений только для Robin Project
  if (DOM.image && IMAGES_CONFIG && IMAGES_CONFIG.paths) {
    IMAGES_CONFIG.paths.forEach(path => {
      const img = new Image();
      img.src = path;
    });
    
    // Настройка обработчиков только для страницы Robin Project
    DOM.image.addEventListener('error', handleImageError);
    DOM.button.addEventListener('click', showRandomImage);
    
    // Настройка адаптивности только для Robin Project
    adjustCaptionSize();
    window.addEventListener('resize', Utils.debounce(adjustCaptionSize, 250));
  }
  
  // Инициализация фото-стеков (есть на главной странице)
  initPhotoStackInteractions();
  
  // Добавляем класс для плавной анимации
  document.body.classList.add('loaded');
  
  console.log('Приложение инициализировано успешно');
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM загружен, инициализируем приложение...');
  initApp();
  
  // Инициализируем мобильное меню
  const cleanupMenu = initMobileMenu();
  
  // Сохраняем функцию очистки для возможного использования
  if (cleanupMenu) {
    window.cleanupMenu = cleanupMenu;
  }
});

// Очистка (для SPA или если нужно перезагрузить)
function cleanup() {
  if (DOM.image) DOM.image.removeEventListener('error', handleImageError);
  if (DOM.button) DOM.button.removeEventListener('click', showRandomImage);
  window.removeEventListener('resize', Utils.debounce(adjustCaptionSize, 250));
  
  // Удаляем обработчики с photo stacks
  const photoStacks = document.querySelectorAll('.photo-stack');
  if (photoStacks.length) {
    photoStacks.forEach(stack => {
      if (stack._clickHandler) {
        stack.removeEventListener('click', stack._clickHandler);
        stack.removeEventListener('touchstart', stack._clickHandler);
      }
    });
  }
  
  // Очищаем меню если есть функция очистки
  if (typeof window.cleanupMenu === 'function') {
    window.cleanupMenu();
  }
  
  document.body.classList.remove('loaded');
}
