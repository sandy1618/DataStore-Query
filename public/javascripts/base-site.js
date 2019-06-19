
$(document).ready(function () {
    $('body').bootstrapMaterialDesign();
});

function showResponse(ajaxResponse) {
    var responseContainer = document.querySelector('responseContainer');
    responseContainer.innerHTML = '<h4><code class="text-success">Market Summary data saved to database.</code></h4><h6>Any old database from the data store queue has been deleted and recent data inserted. (shown below) </h6>'
}

function getResponse(ajaxResponse) {
    var responseContainer = document.querySelector('responseContainer');
    responseContainer.innerHTML = '<h3><code class="text-success">Check database for changes data</code></h3>'
}

function handleResponse() {
    var request = this;
    if (request.readyState != 4)
        return;
    if (request.status == 200) {
        var ajaxResponse = request.responseText;
        showResponse(ajaxResponse);
    }
}

function gResponse() {
    var request = this;
    if (request.readyState != 4)
        return;
    if (request.status == 200) {
        var ajaxResponse = request.responseText;
        getResponse(ajaxResponse);
    }
}

function save() {
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "/post";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.addEventListener('readystatechange', handleResponse);
    xmlhttp.send(JSON.stringify({ "data": "bittrex" }));
}

function binance_save() {
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "/binance-post";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.addEventListener('readystatechange', handleResponse);
    xmlhttp.send(JSON.stringify({ "binance_data": "binance" }));
}

function poloniex_save() {
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "/poloniex-post";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.addEventListener('readystatechange', handleResponse);
    xmlhttp.send(JSON.stringify({ "poloniex_data": "poloniex" }));
}

function update() {
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "/post";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.addEventListener('readystatechange', gResponse);
    xmlhttp.send(JSON.stringify({ "data": "bittrex" }));
}

function poloniex_update() {
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "/poloniex-post";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.addEventListener('readystatechange', gResponse);
    xmlhttp.send(JSON.stringify({ "poloniex_data": "poloniex" }));
}

function binance_update() {
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "/post";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.addEventListener('readystatechange', gResponse);
    xmlhttp.send(JSON.stringify({ "binance_data": "binance" }));
}

$(document).ready(function () {
    refreshTable();
    binance_refreshTable();
    poloniex_refreshTable();
});

function refreshTable() {
    var refreshMS = 10000;
    var $frame = $('#bittrex');
    var timeoutFunction = function () {
        $frame.attr("src", "");
        $frame.attr("src", "/recent");
        setTimeout(timeoutFunction, refreshMS);
    };
    setTimeout(timeoutFunction, refreshMS);
}

function binance_refreshTable() {
    var refreshMS = 10000;
    var $frame = $('#binance');
    var timeoutFunction = function () {
        $frame.attr("src", "");
        $frame.attr("src", "/binance");
        setTimeout(timeoutFunction, refreshMS);
    };
    setTimeout(timeoutFunction, refreshMS);
}

function poloniex_refreshTable() {
    var refreshMS = 10000;
    var $frame = $('#poloniex');
    var timeoutFunction = function () {
        $frame.attr("src", "");
        $frame.attr("src", "/poloniex");
        setTimeout(timeoutFunction, refreshMS);
    };
    setTimeout(timeoutFunction, refreshMS);
}


function sortTable(j) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[j];
            y = rows[i + 1].getElementsByTagName("TD")[j];
            //check if the two rows should switch place:
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}