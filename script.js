async function loadProvinsi() {
    let response = await fetch('data/provinsi.json');
    let provinsi = await response.json();
    let selectProvinsi = document.getElementById('provinsi');

    provinsi.forEach(p => {
        let option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        selectProvinsi.appendChild(option);
    });
}

async function loadKabupaten(provinsiId) {
    let response = await fetch('data/imsak.json');
    let data = await response.json();
    let kabupatenSelect = document.getElementById('kabupaten');
    kabupatenSelect.innerHTML = '';

    let kabupatenSet = new Set();
    data.forEach(d => {
        if (d.provinsi_id === provinsiId) {
            kabupatenSet.add(d.kabupaten);
        }
    });

    kabupatenSet.forEach(kab => {
        let option = document.createElement('option');
        option.textContent = kab;
        kabupatenSelect.appendChild(option);
    });
}

async function tampilkanJadwal() {
    let provinsiId = document.getElementById('provinsi').value;
    let kabupaten = document.getElementById('kabupaten').value;
    let response = await fetch('data/imsak.json');
    let data = await response.json();

    let jadwalDiv = document.getElementById('jadwal');
    jadwalDiv.innerHTML = '';

    let jadwal = data.find(d => d.provinsi_id === provinsiId && d.kabupaten === kabupaten);

    if (jadwal) {
        let table = '<table border="1"><tr><th>Tanggal</th><th>Imsak</th><th>Subuh</th><th>Maghrib</th></tr>';
        for (let key in jadwal.data) {
            let entry = jadwal.data[key];
            table += `<tr>
                        <td>${entry.tanggal}</td>
                        <td>${entry.imsak}</td>
                        <td>${entry.subuh}</td>
                        <td>${entry.maghrib}</td>
                      </tr>`;
        }
        table += '</table>';
        jadwalDiv.innerHTML = table;
    } else {
        jadwalDiv.innerHTML = 'Jadwal tidak ditemukan.';
    }
}

document.getElementById('provinsi').addEventListener('change', (e) => loadKabupaten(e.target.value));
window.onload = loadProvinsi;
