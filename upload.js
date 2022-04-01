// https://bbbootstrap.com/snippets/drag-and-drop-files-preview-area-85841530

// Zur Übersichtlichkeit werden die wichtigsten Elemente in Konstanten abgelegt
const targetArea = document.querySelector(".target-image"); // ==> Klasse
const dropArea = document.querySelector(".drag-image"); // ==> Klasse 
const dragText = dropArea.querySelector(".drag-text"); // ==> Klasse
const button = dropArea.querySelector("button"); // ==> Button Tag
const input = dropArea.querySelector("input"); // ==> Button Tag

// Hinweistext zum Dateiupload
const infotext_readyToDrag = "Ziehen Sie ein Bild in diesen Bereich, um es klassifizieren zu lassen";
// Hinweistext zum, Drop/Upload der Datei
const infotext_readyToDrop = "Loslassen, um die Datei zu verwenden";
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

    // Datei anzeigen (Vorschau)...
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

    // die Datei wurd abgelegt ==> verarbeiten !
    file = event.dataTransfer.files[0];
    viewFile();
});

// Kontrolle, ob der Dateityp korrekt ist. ValidExtension wird oben definiert
function viewFile() {
    let fileType = file.type;

    if (validExtensions.includes(fileType)) {
        // https://imagekit.io/blog/how-to-resize-image-in-javascript/
        // https://github.com/ml5js/ml5-library/issues/488 Details zur Bildgröße (von 2019)
        // https://github.com/ml5js/ml5-library

        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileURL = fileReader.result;
            targetArea.innerHTML = `<img id="curImage" class="currentImage rounded-2" src="${fileURL}" style="width: 400px; height: 400px;" alt="Das aktuelle Bild">`;

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