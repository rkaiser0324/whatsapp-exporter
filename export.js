// this is the code which will be injected into a given page...

(function () {

    if (!document.getElementById('exporterLog')) {
        var div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = 0;
        div.style.left = 0;
        div.style.zIndex = 999;
        div.textContent = '';
        div.id = "exporterLog";
        document.body.appendChild(div);
    }

    let header = document.getElementById('main').querySelector('header')

    let elements = header.children[1].querySelectorAll('span');
    let groupName = elements[0].innerText;
    let memberList = elements[1].innerText;

    let rows = memberList.split(', ');

    if (rows.length < 2) {
        document.getElementById('exporterLog').innerText = "No members found for \"" + groupName + "\".  Wait until the names show under the title and try again."
    }
    else {
        let csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", groupName + ".csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".

        document.getElementById('exporterLog').innerText = `Downloaded ${rows.length} members for group "${groupName}".`

    }

    //debugger

})();