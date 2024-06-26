const API_URL = 'https://api.thingspeak.com/channels/2557138/feeds.json?api_key=5PX9D4F0V8BIL2KXY&results=1';

function fetchData() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const feed = data.feeds[0];
      const statusElement = document.getElementById('status');
      const humidityElement = document.getElementById('humidity');

      if (feed) {
        const status = parseInt(feed.field1);
        const humidity = parseInt(feed.field2);

        statusElement.textContent = status === 1 ? 'Irrigador Ligado' : 'Irrigador Desligado';
        humidityElement.textContent = `Nível de Umidade: ${humidity}`;
      } else {
        statusElement.textContent = 'Sem dados disponíveis';
        humidityElement.textContent = '';
      }
    })
    .catch(error => {
      console.error('Erro ao recuperar dados:', error);
    });
}

fetchData();
setInterval(fetchData, 10000); // Atualizar a cada 10 segundos
