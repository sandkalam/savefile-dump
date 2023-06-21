// ambil parameter
var query = window.location.search;
var urlparam = new URLSearchParams(query);
// dipecah
var tanggal = urlparam.get("tanggal");
var hari = urlparam.get("hari");
var nama = urlparam.get("nama");
var ket = urlparam.get("ket");

if (hari == null || nama == null || ket == null || tanggal == "") {
  $("#formulir").show();
} else {

  $("#formulir").hide();
  printName();
}

if (nama != null) {
  $("#dates").append(`
    <th class="fw-bold" colspan="3">${hari}, ${tanggal}</th>
`);
  nama = nama.split(",");
  for (var i = 0; i < nama.length; i++) {
    $("#body-table").append(
      `<tr>
        <td>${i + 1}</td>
        <td class="text-capitalize">${nama[i]}</td>
        <td class="text-capitalize">${ket}</td>
    </tr>`
    );
  }
}

// membuat hari
function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

// make ready function
$(document).ready(function () {
  $(document.body).on("change", "#Tanggal", function () {
    var tgl = $("#Tanggal").val();
    var hr = getDayName(tgl, "id-ID");
    $("#Hari").val(hr);
  });

  // make url from form
  $("#make-url").on("click", () => {
    var tanggal = $("#tanggal").val();
    var hari = $("#hari").val();
    var nama = $("#nama").val();
    var ket = $("#ket").val();
    var url = `?tanggal=${tanggal}&hari=${hari}&nama=${nama}&ket=${ket}`;

    document.location.href = url;
  });
});

function printName() {
  document.title = `Absensi-HES2B-${ket}-${tanggal}`;
  window.print();
}
