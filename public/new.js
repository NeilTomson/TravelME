if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      var map = L.map("map").setView([lat, lng], 10);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

  
      var marker = null;
  
      map.on("click", function (e) {
        if (marker !== null) {
          map.removeLayer(marker);
        }
        let datalat = e.latlng.lat;
        let datalng = e.latlng.lng;
        document.getElementById("lat").value = datalat;
        document.getElementById("lng").value = datalng;
        
        marker = L.marker(e.latlng).addTo(map);





        //
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
  