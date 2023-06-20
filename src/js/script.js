// localhost:8000/?tanggal=06%2F24%2F2023&?hari=Sabtu&?nama=Syaiful%20Imam%20Asdit%20%2C%20IVAN%20MAFTUHAN%20%2C%20devi%20lintang%20pratiwi&?ket=Kerja

// ambil parameter
var query = window.location.search;
var urlparam = new URLSearchParams(query);
// pecah
var tanggal = urlparam.get("tanggal");
var hari = urlparam.get("hari");
var nama = urlparam.get("nama");
var ket = urlparam.get("ket");

$("#formulir").hide();

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

  doc.save(`absens-hes2b-${tanggal}.pdf`);
});
