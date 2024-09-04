var images = [
  ["./robin/1.jpeg",
  "./robin/2.jpeg",
  "./robin/3.jpeg",
  "robin/4.jpeg",
  "robin/5.jpeg",
  "robin/6.jpeg",
  "robin/7.jpeg",
  "robin/8.jpeg",
  "robin/9.jpeg",
  "robin/10.jpeg",
  "robin/11.jpeg",
  "robin/12.jpeg",
  "robin/13.jpeg",
  "robin/14.jpeg",
  "robin/15.jpeg",
  "robin/16.jpeg",
  "robin/17.jpeg"],
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
    "Тебе нехватает фотосессии в поле с цветами",
    "Сближаешь других людей",
    "Посещаешь лучшие бутики",
    "Любишь валяться с близкими",
    "Ты рад активному отдыху",
    "Любишь получать цветы",
    "Экстроверт - твое второе имя"
  ]

];


document.getElementById("my_button").addEventListener("click", function() {
   var i = Math.floor(Math.random()*17)%17;
  document.getElementById("my_image").src = images[0][i];
  document.getElementById("figcaption").innerHTML =images[1][i];
  document.getElementById("figcaption").className="caption"
})
