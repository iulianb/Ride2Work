function filterByKeyword() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    table = document.getElementById("genericTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i <= tr.length; i++) {
        td = tr[i].innerText;
        if (td) {
            if (td.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}