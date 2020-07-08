// percentage functions return from the range of -100 to 100.
// -100 is male/masculine, 0 is neutral, 100 is female/feminine.
function genderPerc() { return Math.round(document.getElementById("genderBar").value); }
function sexPerc() { return Math.round(document.getElementById("sexBar").value); }

// just keeping up with some basic user info.
function isTrans() { return document.getElementById("isTrans").checked; }
function isBigender() { return document.getElementById("isBoth").checked; }
function isBisexual() { return document.getElementById("likesBoth").checked; }
function isHetero() { return Math.sign(sexPerc()) !== Math.sign(genderPerc()); }
function isHomo() { return Math.sign(sexPerc()) === Math.sign(genderPerc()); }

// takes a percentage from -100 to 100 and returns an appropriate HSL color.
// from blue to black to pink.
function getColor(val) {
    // difference from 0 to 100 should be reduced from 0 to 30
    var hue = 280 + (val * (30/100));
    // for lighting, 0 to 100 becomes 0 to 60%
    var lighting = Math.abs(val * .6);
    return "hsl("+hue+", 80%, "+lighting+"%)";
}

function sexName() {
    if(isBisexual()) {
        return " bisexual";
    } else if(sexPerc() === 0) {
        return "n asexual";
     } else if(isBigender() || genderPerc() === 0) {
        if(sexPerc() < 0) {
            return "n androsexual";
        } else {
            return " gynesexual";
        }
    } else if(isHetero()) {
        return " heterosexual";
    } else if(Math.sign(sexPerc()) === Math.sign(genderPerc())) {
        return " homosexual";
    }
}

function genderName() {
    var val = genderPerc();
    if(isBigender()) {
        return "bigendered person";
    } else if(val === -100) {
        if(isTrans()) {
            return "transman";
        } else {
            return "man";
        }
    } else if(val === 100) {
        if(isTrans()) {
            return "transwoman";
        } else {
            return "woman";
        }
    } else if(val < 0) {
        return "masculine person";
    } else if(val > 0) {
        return "feminine person";
    } else {
        return "agender person";
    }
}

function letemknow() {
    alert("Your input has been recorded! Thank you.");
}

function iAmA() {
    document.getElementById("iama").innerHTML = "I am a" + sexName() + " " + genderName() + ".";
}

function sexInput() {
    // we want to get a preference viewed differently from sexName().
    var pref = "asexual";
    document.getElementById("sexBarDiv").style.backgroundColor = getColor(sexPerc());
    if (sexPerc() < 0) {
        pref = "masculine";
    } else if (sexPerc() > 0) {
        pref = "feminine";
    }
    if(sexPerc() === -100) {
        pref = "men";
    } else if(sexPerc() === 100) {
        pref = "women";
    }
    var bisexual = "";
    if(isBisexual()) {
        bisexual = " (bisexual)";
        if(pref === "asexual") pref = "neutral";
        if(sexPerc() === -100 || sexPerc() === 100) {
            pref = pref + "(?)";
        }
    }
    // print preference rounded to 2 decimal places
    document.getElementById("sexMessage").innerHTML = "preference: " + Math.abs(sexPerc()) + "% " + pref + bisexual;
    iAmA();
}

function genderInput() {
    document.getElementById("genderBarDiv").style.backgroundColor = getColor(genderPerc());
    if(isBigender()) {
        document.getElementById("genderMessage").innerHTML = "gender: bigender";
    } else {
        document.getElementById("genderMessage").innerHTML = "gender: " + Math.abs(genderPerc()) + "% " + genderName();
    }
    iAmA();
}

$(document).ready(function() {
    document.getElementById("sexBar").oninput = sexInput;
    document.getElementById("likesBoth").oninput = function() {
        document.getElementById("sexBarDiv").style.display = "block";
        sexInput();
    };

    document.getElementById("genderBar").oninput = genderInput;
    document.getElementById("isBoth").oninput = function() {
        if(isBigender()) { // if checked yes
            document.getElementById("genderBarDiv").style.display = "none";
        } else {
            document.getElementById("genderBarDiv").style.display = "block";
        }
        genderInput();
    };
    document.getElementById("isTrans").oninput = function() {
        genderInput();
    };
    document.getElementById("sexBar").value = 0;
    document.getElementById("genderBar").value = 0;
    document.getElementById("isBoth").checked = false;
    document.getElementById("likesBoth").checked = false;
    document.getElementById("isTrans").checked = false;
    sexInput(); genderInput();
    $('#page').fadeIn(1000);
});
