// percentage functions return from the range of -95 to 95.
// -95 is male/masculine, 0 is neutral, 95 is female/feminine.
genderPerc = function() { return Math.round(document.getElementById("genderBar").value); }
sexPerc = function() { return Math.round(document.getElementById("sexBar").value); }

// sexuality info.
isBisexual = function() { return document.getElementById("bisexualCheck").checked; }
isAsexual = function() { return document.getElementById("asexualCheck").checked; }
isOtherSex = function() { return document.getElementById("otherSexCheck").checked; }
isHetero = function() { return document.getElementById("heterosexualCheck").checked; }
isHomo = function() { return document.getElementById("homosexualCheck").checked; }

// gender/presentation info.

isAgender = function() { return document.getElementById("agenderCheck").checked; }
isBigender = function() { return document.getElementById("bigenderCheck").checked; }
//isTrans = function() { return document.getElementById("isTrans").checked; }
isMan = function() { return document.getElementById("maleCheck").checked; }
isWoman = function() { return document.getElementById("femaleCheck").checked; }
isBinary = function() { return document.getElementById("binaryCheck").checked;}
isNonbinary = function() { return document.getElementById("nonbinaryCheck").checked; }
isOtherGender = function() { return document.getElementById("otherGenderCheck").checked; }
isMasc = function() { return genderPerc() < 0; }
isFem = function() { return genderPerc() > 0; }

// takes a percentage from -95 to 95 and returns an appropriate HSL color.
// from blue to black to pink.
getColor = function(val) {
  // difference from 0 to 95 should be reduced from 0 to 30
  var hue = 280 + (val * (30/95));
  // for lighting, 0 to 95 becomes 0 to 60%
  var lighting = Math.abs(val * (60/95));
  return "hsl("+hue+", 80%, "+lighting+"%)";
}

sexName = function() {
  if(isHetero()) return " heterosexual";
  else if(isHomo()) return " homosexual";
  else if(isBisexual()) return " bisexual";
  else if(isAsexual()) return "n asexual";
  else if(isOtherSex()) {
    if(document.getElementById("sexInfo").value != "") {
      return "(n) " + document.getElementById("sexInfo").value;
    }
  }
  return " ???";
}

genderName = function() {
  if(isBigender()) return "bigendered person";
  else if(isAgender()) return "genderless person";
  else if(isMan()) return "man";
  else if(isWoman()) return "woman";
  else if(isNonbinary()) return "nonbinary person";
  else if(isBinary()) {
    if(isMasc()) return "masculine person";
    else if(isFem()) return "feminine person";
    else return "person";
  } else if(isOtherGender()) {
    if(document.getElementById("sexInfo").value != "") {
      return document.getElementById("genderInfo").value;
    }
  }
  return "???";
}

letemknow = function() { alert("Your input has been recorded! Thank you."); }

iAmA = function() {
  document.getElementById("iama").innerHTML = "I am a" + sexName() + " " + genderName() + ".";
}

sexInput = function() {
  // we want to get a preference viewed differently from sexName().
  var pref = "neutral";
  document.getElementById("sexBarColorDiv").style.backgroundColor = getColor(sexPerc());
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
  // print preference rounded to 2 decimal places
  document.getElementById("sexMessage").innerHTML = "preference: " + Math.abs(sexPerc()) + "% " + pref;
  iAmA();
}

genderInput = function() {
  document.getElementById("genderBarColorDiv").style.backgroundColor = getColor(genderPerc());
  if(isBigender()) {
    document.getElementById("genderMessage").innerHTML = "gender: bigender";
  } else {
    document.getElementById("genderMessage").innerHTML = "gender: " + Math.abs(genderPerc()) + "% " + genderName();
  }
  iAmA();
}

noSexSpectrum = function() {
  document.getElementById("sexBarDiv").style.display = "none";
  document.getElementById("otherSexDiv").style.display = "none";
  sexInput();
}

noGenderSpectrum = function() {
  document.getElementById("genderBarDiv").style.display = "none";
  document.getElementById("otherGenderDiv").style.display = "none";
  genderInput();
}

$(document).ready(function() {
  document.getElementById("sexBar").oninput = sexInput;
  document.getElementById("homosexualCheck").oninput = noSexSpectrum;
  document.getElementById("heterosexualCheck").oninput = noSexSpectrum;
  document.getElementById("asexualCheck").oninput = noSexSpectrum;
  document.getElementById("bisexualCheck").oninput = function() {
    document.getElementById("sexBarDiv").style.display = "block";
    document.getElementById("otherSexDiv").style.display = "none";
    sexInput();
  };
  document.getElementById("otherSexCheck").oninput = function() {
    document.getElementById("sexBarDiv").style.display = "none";
    document.getElementById("otherSexDiv").style.display = "block";
    sexInput();
  };

  document.getElementById("genderBar").oninput = genderInput;
  document.getElementById("maleCheck").oninput = noGenderSpectrum;
  document.getElementById("femaleCheck").oninput = noGenderSpectrum;
  document.getElementById("bigenderCheck").oninput = noGenderSpectrum;
  document.getElementById("agenderCheck").oninput = noGenderSpectrum;
  document.getElementById("nonbinaryCheck").oninput = noGenderSpectrum;
  document.getElementById("binaryCheck").oninput = function() {
    document.getElementById("genderBarDiv").style.display = "block";
    document.getElementById("otherGenderDiv").style.display = "none";
    genderInput();
  };
  document.getElementById("otherGenderCheck").oninput = function() {
    document.getElementById("genderBarDiv").style.display = "none";
    document.getElementById("otherGenderDiv").style.display = "block";
    genderInput();
  };

  document.getElementById("sexInfo").oninput = iAmA;
  document.getElementById("genderInfo").oninput = iAmA;

  document.getElementById("sexBar").value = 0;
  document.getElementById("genderBar").value = 0;
  document.getElementById("heterosexualCheck").checked = true;
  document.getElementById("maleCheck").checked = true;
  noSexSpectrum(); noGenderSpectrum();
  $('#page').fadeIn(1000);
});
