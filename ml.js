const imageClassifierModellName = 'MobileNet';
let imageClassifierModell;

function preload() {
    imageClassifierModell = ml5.imageClassifier(imageClassifierModellName);
}

function predictImage(imgTag) {
    imageClassifierModell.classify(imgTag, 10, gotResult);
}

// notwendig !!!
function setup() {
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
    let outputDiv = document.getElementById('classification');
    outputDiv.innerHTML = ``;

    if (error) {
        // Display error in the console

        outputDiv.innerHTML += `Leider kam es zu einem Fehler: ${error}<br>`;
        console.error(error);
    } else {
        outputDiv.innerHTML += `Ergebnis der Klassifizierung:<br>`;

        let labelsName = [];
        let labelsConfidence = [];

        // The results are in an array ordered by confidence.
        results.forEach((result) => {
            outputDiv.innerHTML += `Klasse: ${result.label} - Wahrscheinlichkeit: ${nf(result.confidence * 100, 0, 2)}<br>`;
            console.log(`Klasse: ${result.label} - Wahrscheinlichkeit: ${nf(result.confidence * 100, 0, 2)}<br>`);

            labelsName.push(result.label);
            labelsConfidence.push(result.confidence);
        })

        //https://plotly.com/javascript/pie-charts/
        //https://karmatnspyphuntsho-tijtech.medium.com/ml5-image-classification-using-mobilenet-and-p5-js-13c64debfd9a
        //https://github.com/tlsaeger/ml5-workshop-hawhamburg
        //https://shiffman.net/learning/

        var data = [{
            values: labelsConfidence,
            labels: labelsName,
            type: 'pie'
        }];

        var layout = {
            height: 400,
            width: 500
        };

        Plotly.newPlot('classificationChart', data, layout);
    }
}






