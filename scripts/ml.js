// Das zu verwendende Modell.
const imageClassifierModellName = 'MobileNet';

// Gibt textlich Informationen über das Modell aus
const modelStatusText = document.getElementById("model-status"); // ==> ModelStatus Text
// Die Anzahl der auszugebenden Ergebnisse bei der Klassifizierung
const numberOfResult = 5;

// Hält das herunter geladene Modell
let imageClassifierModell;

// Lädt gleich zu Anfang das oben angegebene Modell herunter
function preload() {
    imageClassifierModell = ml5.imageClassifier(imageClassifierModellName, modelLoaded);
}

// Modell wurde geladen
function modelLoaded() {
    modelStatusText.innerHTML = `<p class="fs-5 output-text">${imageClassifierModellName} wurde gelade!</p>`;
}

// Wird einmalig zu Anfang ausgeführt und scheint notwendig zu sein. Ist hier
// ohne Verwendung
function setup() {
}

// Führt eine Klassifizierung an dem übergebenen Bild durch. Als Bild kann alles
// übergeben werden, ml5 verarbeitet: HTMLImageElement | ImageData | HTMLCanvasElement | HTMLVideoElement | Video
// Bei Videos muss die Eingabe nur einmal durchgeführt werden.
function predictImage(imgTag) {
    imageClassifierModell.classify(imgTag, numberOfResult, gotResult);
}

// Callbackversion der Klassifizierungs Funktion. Ihr wird ein Fehler sowie ein
// Ergebnis Objekt übergeben. Im Erfolgsfall erfolgt die Ausgabe des Ergebnisses
// als Liste sowie in Form eines Graphen.
function gotResult(error, results) {
    let outputDiv = document.getElementById('ausgabe-text');
    outputDiv.innerHTML = ``;

    if (error) {
        outputDiv.innerHTML += `Leider kam es zu einem Fehler: ${error}<br>`;
    } else {
        outputDiv.innerHTML += `<ul id="result-list" class="list-group list-group-flush">`;

        let labelsName = [];
        let labelsConfidence = [];

        let rang = 0;
        let sonstiges = 1;

        // The results are in an array ordered by confidence.
        results.forEach((result) => {
            rang++;

            sonstiges = sonstiges - result.confidence;

            let newItemText = ["Platz: ", rang, ": ", result.label, " - Wahrscheinlichkeit: ", nf(result.confidence * 100, 0, 2)].join('');
            outputDiv.innerHTML += `<li class="list-group-item">${newItemText}</li>`;

            labelsName.push(result.label);
            labelsConfidence.push(result.confidence);
        })

        let sonstigesText = ["Sonstiges - Wahrscheinlichkeit: ", nf(sonstiges * 100, 0, 2)].join('');
        outputDiv.innerHTML += `<li class="list-group-item">${sonstigesText}</li>`;

        labelsName.push(sonstigesText);
        labelsConfidence.push(sonstiges);

        outputDiv.innerHTML += `</ul>`;

        var data = [{
            values: labelsConfidence,
            labels: labelsName,
            type: 'pie',
            textinfo: "label+percent",
            textposition: "outside",
            automargin: true
        }];

        var layout = {
            height: 500,
            width: 500,
            margin: {"t": 0, "b": 0, "l": 0, "r": 0},
            showlegend: false
        };

        Plotly.newPlot('ausgabe-graph', data, layout);
    }
}






