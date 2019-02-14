import '../css/style.scss';
import StorageAccessor from './storage-accessor';

document.addEventListener('DOMContentLoaded', () => {
  // token
  {
    const tokenInput = document.querySelector('.input-token');

    tokenInput.value = StorageAccessor.getToken() || '';

    tokenInput.addEventListener('blur', () => {
      StorageAccessor.setToken(tokenInput.value);
    });
  }

  // open time, closed time
  {
    const openTimeInput = document.querySelector('.input-opentime');
    const closedTimeInput = document.querySelector('.input-closedtime');
    const openTime = StorageAccessor.getOpenTime() || '';
    const closedTime = StorageAccessor.getClosedTime() || '';

    openTimeInput.value = openTime;
    closedTimeInput.value = closedTime;

    openTimeInput.addEventListener('blur', () => {
      let time = openTimeInput.value;
      if (!time) {
        time = '09:00';
        openTimeInput.value = time;
      }
      StorageAccessor.setOpenTime(time);
    });

    closedTimeInput.addEventListener('blur', () => {
      let time = closedTimeInput.value;
      if (!time) {
        time = '18:00';
        closedTimeInput.value = time;
      }
      StorageAccessor.setClosedTime(time);
    });
  }

  // emoji
  {
    const emojiInput = document.querySelector('.input-emoji');
    const emoji = StorageAccessor.getEmoji() || '';

    emojiInput.value = emoji;

    emojiInput.addEventListener('blur', () => {
      let emoji = emojiInput.value;
      if (!emoji) {
        emoji = 'eyes';
        emojiInput.value = emoji;
      }
      StorageAccessor.setEmoji(emoji);
    });
  }

  // urls
  {
    const urlsTextarea = document.querySelector('.textarea-urls');

    urlsTextarea.value = StorageAccessor.getURLs().join('\n') || '';

    urlsTextarea.addEventListener('blur', () => {
      const urls = (() => {
        const text = urlsTextarea.value;
        return text ? text.split(/\n/) : [];
      })();

      StorageAccessor.setURLs(urls);
    });
  }
});
