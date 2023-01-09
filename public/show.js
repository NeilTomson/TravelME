if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    var map = L.map("map").setView([lat, lng], 4);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    let Datalat = document.getElementById("lat").dataset.lat;
    let Datalng = document.getElementById("lng").dataset.lng;
    var marker = L.marker([Datalat, Datalng]).addTo(map);

    map.on("click", function (e) {
      let lat = e.latlng.lat;
      let lng = e.latlng.lng;
      console.log(lat, lng);
    });
  });
} else {
  var map = L.map("map").setView([50, -0.09], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}
