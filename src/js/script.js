// localhost:8000/?tanggal=06%2F24%2F2023&?hari=Sabtu&?nama=Syaiful%20Imam%20Asdit%20%2C%20IVAN%20MAFTUHAN%20%2C%20devi%20lintang%20pratiwi&?ket=Kerja

// ambil parameter
var query = window.location.search;
var urlparam = new URLSearchParams(query);
// pecah
var tanggal = urlparam.get("tanggal");
var hari = urlparam.get("hari");
var nama = urlparam.get("nama");
var ket = urlparam.get("ket");

if (hari == null || nama == null || ket == null) {
  $("#formulir").show();
} else {
  $("#formulir").hide();
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
        <td class="text-capitalize">${nama[i].toLocaleUpperCase()}</td>
        <td class="text-center">${ket}</td>
    </tr>`
    );
  }
}

// print using jspdf
const print = $("#print");
const { jsPDF } = window.jspdf;

print.on("click", () => {
  const doc = new jsPDF();

  doc.autoTable({
    html: "#result-table",
    theme: "grid",
    headStyles: { halign: "center", font: "helvetica" },
    styles: { font: "times" },
    columnStyles: { 0: { halign: "center" }, 2: { halign: "center" } },
    footStyles: { halign: "center" },
  });

  doc.save(`absens-hes2b-${tanggal}-${ket}.pdf`);
});

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
