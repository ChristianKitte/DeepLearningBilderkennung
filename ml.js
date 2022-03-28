let mobileNetModel;
var predictionImage;

function writeVersion() {
    document.writeln('Version der Lib ist : ' + ml5.version);
}

function modelReady() {
    document.writeln("Modell ist bereit...")
}

function imageReady() {
    document.writeln("Image ist geladen...")
}

function setup() {
    writeVersion();

    createCanvas(400, 400);
    
    mobileNetModel = ml5.imageClassifier('MobileNet', modelReady);
    predictionImage = createImg("vogel.jpg", imageReady());
    
    //predictionImage.hide();

    background(0);
    
    //image(predictionImage, 0, 0);
    mobileNetModel.classify(predictionImage, gotResult);
    

    
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
    // Display error in the console
    if (error) {
        console.error(error);
    } else {
        // The results are in an array ordered by confidence.
        console.log(results);
        createDiv(`Label: ${results[0].label}`);
        createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
    }
}






