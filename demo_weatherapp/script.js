const apiKey = "4a284f1ff95d431d9e153656250508 ";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerText = "Vui lòng nhập tên thành phố!";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=vi`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Lỗi API hoặc tên thành phố không đúng.");

    const data = await res.json();

    const { location, current } = data;

    resultDiv.innerHTML = `
       <b>${location.name}, ${location.country}</b><br/>
       Nhiệt độ: ${current.temp_c}°C<br/>
       Trạng thái: ${current.condition.text}<br/>
       Gió: ${current.wind_kph} km/h
    `;
  } catch (err) {
    resultDiv.innerText = "Không tìm thấy thành phố hoặc lỗi API.";
    console.error(err);
  }
}
