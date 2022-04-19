// Die Fläche, auf der das zu klassifizierende Bild abgelegt wird
const targetArea = document.querySelector(".target-image"); // ==> Klasse
// Die Fläche, auf der das Bild gezogen wird
const dropArea = document.querySelector(".drag-image"); // ==> Klasse
// Der Hinweistext zum Ziehen des Bildes
const dragText = dropArea.querySelector(".drag-text"); // ==> Klasse
// Der Button, der den Datei Suchen Dialog öffnet
const button = dropArea.querySelector("button"); // ==> Button Tag
// Das HTML Input Feld
const input = dropArea.querySelector("input"); // ==> Button Tag

// Hinweistexte zum Dateiupload
const infotext_readyToDrag = "Ziehen Sie ein Bild in die Ablagezone, um es klassifizieren zu lassen!";
// Hinweistext zum, Drop/Upload der Datei
const infotext_readyToDrop = "Loslassen, um die Datei zu verwenden";
// Hinweistext für einen falschen Dateityp
const infotext_wrongType = "Dies scheint keine Bilddatei zu sein! Gültige Dateien haben die Endung .jpeg, .jpg, .png, .bmp oder .webp";

// Hier wird die jeweils aktive Datei gehalten
let file;
// Hier wird die Liste mit den erlaubten Dateien gehalten
let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/bmp", "image/webp"];

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

// Etwas verlässt den Drag-and-drop-Bereich. Rücksetzen auf die Default-Anzeige
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = infotext_readyToDrag;
});

// Ein vorher aufgenommenes Objekt wurde im Drag-and-drop Bereich losgelassen.
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();

    dropArea.classList.remove("active");
    dragText.textContent = infotext_readyToDrag;

    // die Datei wurde abgelegt ==> verarbeiten !
    file = event.dataTransfer.files[0];
    viewFile();
});

// Kontrolle, ob der Dateityp korrekt ist. ValidExtensions werden oben definiert
function viewFile() {
    let fileType = file.type;

    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileURL = fileReader.result;
            targetArea.innerHTML = `<img id="target" class="target-image img-fluid" src="${fileURL}" alt="Das aktuelle Bild">`;

            let img = document.getElementById('target');
            predictImage(img);
        }

        fileReader.readAsDataURL(file);
    } else {
        alert(infotext_wrongType);

        dropArea.classList.remove("active");
        dragText.textContent = infotext_readyToDrag;
    }
}

