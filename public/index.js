var map = L.map('map').setView([51.505, -0.09], 3);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
        async function Getdata(){
        let responze =await fetch("/main")
            let data =await responze.json()
            for(item of data){
                var marker = L.marker([item.lat,item.lng]).addTo(map);

            }



    }
    Getdata()

