function show(content) {
    hideAll();
    document.getElementById(content).classList.remove("hidden");
}

function showResult() {
    hideAll();
    document.getElementById("result").classList.remove("hidden");
}

function hideAll() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("documentation").classList.add("hidden");
}