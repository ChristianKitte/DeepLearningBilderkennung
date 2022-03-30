const imageClassifierModellName = 'MobileNet';

let imageClassifierModell;

//var image;

function preload() {
    imageClassifierModell = ml5.imageClassifier(imageClassifierModellName);
}

function predictImage(pathToImage) {
    //let img = loadImage(pathToImage);
    let img=document.getElementById('x');

    //let predictionImage = createImg(pathToImage, 'Bild zur Vorhersage');
    //predictionImage.hide();
    //image(predictionImage, 0, 0);
    imageClassifierModell.classify(img, gotResult);
}

function setup() {
    createCanvas(400, 400);
    background(0);

    //mobileNetModel = ml5.imageClassifier('MobileNet', modelReady);
    //predictionImage = createImg("vogel.jpg", imageReady());

    //predictionImage.hide();

    //image(predictionImage, 0, 0);
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






