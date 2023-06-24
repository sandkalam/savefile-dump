// ambil parameter
var query = window.location.search;
var urlparam = new URLSearchParams(query);

// melakukan pemecahan parameter
var tanggal = urlparam.get("tanggal");
var hari = urlparam.get("hari");
var nama = urlparam.get("nama");
var ket = urlparam.get("ket");
var code = urlparam.get("code");
var untuk = urlparam.get("untuk");

// show formulir
if (hari == null || nama == null || ket == null || tanggal == "") {
  $("#formulir").show();
} else {
  $("#formulir").hide();
  printName();
}

// menambahkan hari dan tanggal
if (nama != null) {
  $("#dates").append(`
    <th class="fw-bold" colspan="3">${hari}, ${tanggal}</th>
`);

  // mencetak isi table
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

// memasukan uniqueid
if (code == null) {
  $("#kode").hide();
}
document.getElementById("kode").innerHTML = `Document ID : ${code}`;

$(document).ready(function () {
  // mengubah value hari otomatis
  $(document.body).on("change", "#Tanggal", function () {
    var tgl = $("#Tanggal").val();
    var hr = getDayName(tgl, "id-ID");
    $("#Hari").val(hr);
  });

  // make url from form
  $("#make-url").on("submit", () => {
    var tanggal = $("#tanggal").val();
    var hari = $("#hari").val();
    var nama = $("#nama").val();
    var ket = $("#ket").val();
    var untuk = $("#untuk").val();
    var url = `?tanggal=${tanggal}&hari=${hari}&nama=${nama}&ket=${ket}&untuk=${untuk}`;

    document.location.href = url;
  });
});

// membuat title table
document.getElementById("title-abs").innerHTML = `Absensi ${untuk}`;

// mencetak dan menentukan judul document
function printName() {
  var utk = "";
  if (untuk != null) {
    utk = untuk
      .match(/\b(\w)/g)
      .join("")
      .toUpperCase();
  } else {
    utk = "";
  }

  document.title = `Absensi-${utk}-${ket}-${tanggal}`;
  window.print();
}

// menentukan hari berdasarkan tanggal
function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
}
