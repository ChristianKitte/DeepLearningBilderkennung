// Zur Übersichtlichkeit werden die wichtigsten Elemente in Konstanten abgelegt
const dropArea = document.querySelector(".drag-image"), dragText = dropArea.querySelector("h6"),
    button = dropArea.querySelector("button"), input = dropArea.querySelector("input");

// Hinweistext zum Dateiupload
const infotext_readyToDrag = "Datei hierhin ziehen";
// Hinweistext zum, Drop/Upload der Datei
const infotext_readyToDrop = "Loslassen, um die Datei hochzuladen";
// Hinweistext für einen falschen Dateityp
const infotext_wrongType = "Dies scheint keine Bilddatei zu sein! Gültige Dateien haben die Endung .jpeg, .jpg, .png oder .bmp";

// Hier wird die jeweils aktive Datei gehalten
let file;
// Hier wird die Liste mit den erlaubten Dateien gehalten
let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/bmp"];

// Button Click Event wird auf Input File gelenkt als Ersatz für einen Button
// vom Typ Submit
button.onclick = () => {
    input.click();
}

// Input ist ein Eingabefeld für ein File. Unterstützt automatisch den Dateisuchen
// Dialog und das Ziehen von Dateien
input.addEventListener("change", function () {
    file = this.files[0];
    dropArea.classList.add("active");
    viewFile();
});

// Etwas wird über den Drag-and-drop-Bereich gezogen. Prevent default unterdrückt die Defaultbehandlung
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = infotext_readyToDrop;
});

// Etwas verlässt den Drag-and-drop-Bereich
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = infotext_readyToDrag;
});

// Ein vorher aufgenommenes Objekt im Drag-and-drop Bereich losgelassen. Die
// Variable wurde oben angelegt
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();

    file = event.dataTransfer.files[0];
    viewFile();
});

// Kontrolle, ob der Dateityp korrekt ist. ValidExtension wird oben definiert
function viewFile() {
    let fileType = file.type;

    if (validExtensions.includes(fileType)) {
        /*

        let fileReader = new FileReader();

        fileReader.onload=function(e){
            var img = document.createElement("img");

            img.onload = function (event) {
                // Dynamically create a canvas element
                var canvas = document.createElement("canvas");

                // var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");

                // Actual resizing
                ctx.drawImage(img, 0, 0, 400, 400);

                // Show resized image in preview element
                var dataurl = canvas.toDataURL(file.type);
                document.getElementById("curImage").src = dataurl;
            }

            img.src = e.target.result;
        }

        fileReader.readAsDataURL(file);

        //https://imagekit.io/blog/how-to-resize-image-in-javascript/

        */

        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileURL = fileReader.result;
            dropArea.innerHTML = `<img id="curImage" class=".currentImage" src="${fileURL}" style="width: 400px; height: 400px;" alt="Das aktuelle Bild">`;

            let img = document.getElementById('curImage');
            predictImage(img);
        }

        fileReader.readAsDataURL(file);
    } else {
        alert(infotext_wrongType);
        dropArea.classList.remove("active");
        dragText.textContent = infotext_readyToDrag;
    }
}