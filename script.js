const app = () => {
  const song = document.querySelector('.player-container__song');
  const playButton = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.video-container video');

  const soundsButton = document.querySelectorAll('.sound-picker__button');

  const timeDisplay = document.querySelector('.player-container__time');
  const timeSelect = document.querySelectorAll('.time-select__button');

  //  длина круга
  const outlineLength = outline.getTotalLength();
  // начальная продолжительность мелодии
  let songDuration = 300;

  //задаем сдвиг обводке
  outline.style.strokeDashoffset = outlineLength;
  // и кол-во пуктир.линий на круге
  outline.style.strokeDasharray = outlineLength;

  //ф-я воспроизведения мелодии, установки паузы, смены вида кнопки
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      playButton.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      playButton.src = './svg/play.svg';
    }
  };

  //слушатель на кнопки выбора мелодии 
  soundsButton.forEach(button => {
    button.addEventListener('click', function () {
      //пути к мелодии и видео из атрибуты каждой кнопки 
      //присваиваем текущей мелодии
      song.src = this.getAttribute('data-sound'); 
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  //обработчки на кнопку плэй
  playButton.addEventListener('click', () => {
    checkPlaying(song);
  });

  //добавляем обработчики на кнопки с выбором времени
  timeSelect.forEach(item => {
    item.addEventListener('click', function () {
      //устанавливаем продолжительность мелодии из значения атрибута
      songDuration = this.getAttribute('data-time');
      //в таймер записываем остаток минут и секунд
      timeDisplay.textContent = `${Math.floor(songDuration / 60)}:${Math.floor(
        songDuration % 60
      )}`;
      // timeDisplay.textContent = `${Math.floor(songDuration / 60)}:${Math.floor(
      //   songDuration % 60
      // )}`;
    });
  });

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    //оставшееся время =общая длительность - текущая
    let elapsed = songDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    // вычисляем прогресс который будет отображаться на картинке
    let progress = outlineLength - (currentTime / songDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;
    //останавливаем воспроизведение когда таймер истечет
    if (currentTime >= songDuration) {
      song.pause();
      song.currentTime = 0;
      playButton.src = './svg/play.svg';
      video.pause();
    }
  };
};


app();
