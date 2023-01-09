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
    L.marker([Datalat, Datalng]).addTo(map);

    var marker = null;

    map.on("click", function (e) {
      if (marker !== null) {
        map.removeLayer(marker);
      }
      let datalat = e.latlng.lat;
      let datalng = e.latlng.lng;
      document.getElementById("lat").value = datalat;
      document.getElementById("lng").value = datalng;
//inne

  fetch(`https://geocode.xyz/${datalat},${datalng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      document.getElementById("country").value = data.country;
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })





//eddig
      marker = L.marker(e.latlng, {
        icon: L.divIcon({
          className: "ship-div-icon",
          html: "<svg class='marker'>...</svg>",
        }),
      }).addTo(map);
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
