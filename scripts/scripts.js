var images = [
  ["/Users/admspb/Documents/test-site/robin/1.jpeg",
  "/Users/admspb/Documents/test-site/robin/2.jpeg",
  "/Users/admspb/Documents/test-site/robin/3.jpeg",
  "/Users/admspb/Documents/test-site/robin/4.jpeg",
  "/Users/admspb/Documents/test-site/robin/5.jpeg",
  "/Users/admspb/Documents/test-site/robin/6.jpeg",
  "/Users/admspb/Documents/test-site/robin/7.jpeg",
  "/Users/admspb/Documents/test-site/robin/8.jpeg",
  "/Users/admspb/Documents/test-site/robin/9.jpeg",
  "/Users/admspb/Documents/test-site/robin/10.jpeg",
  "/Users/admspb/Documents/test-site/robin/11.jpeg",
  "/Users/admspb/Documents/test-site/robin/12.jpeg",
  "/Users/admspb/Documents/test-site/robin/13.jpeg",
  "/Users/admspb/Documents/test-site/robin/14.jpeg",
  "/Users/admspb/Documents/test-site/robin/15.jpeg",
  "/Users/admspb/Documents/test-site/robin/16.jpeg",
  "/Users/admspb/Documents/test-site/robin/17.jpeg"],
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
