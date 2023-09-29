
// Function to load the common head content
function includeCommonHead() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Insert the common head content into the current page
            document.head.innerHTML = this.responseText + document.head.innerHTML;
            console.log(this.responseText);
        }
    };
    xhttp.open('GET', 'common-views/head.html', true);
    xhttp.send();
}

// Call the function to include the common head
includeCommonHead();

// Function to load the common body content
function includeCommonBody() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Insert the common body content into the current page's body
            document.body.innerHTML += this.responseText;
            console.log(this.responseText);
        }
    };
    xhttp.open('GET', 'common-views/body.html', true);
    xhttp.send();
}

// Call the function to include the common body
includeCommonBody();

