// Generated by CoffeeScript 2.5.1
(function() {
  // percentage functions return from the range of -95 to 95.
  // -95 is male/masculine, 0 is neutral, 95 is female/feminine.
  var genderInput, genderName, genderPerc, getColor, iAmA, isAgender, isAsexual, isBigender, isBinary, isBisexual, isFem, isHetero, isHomo, isMan, isMasc, isNonbinary, isOtherGender, isOtherSex, isWoman, noGenderSpectrum, noSexSpectrum, sexInput, sexName, sexPerc;

  genderPerc = function() {
    return Math.round(document.getElementById("genderBar").value);
  };

  sexPerc = function() {
    return Math.round(document.getElementById("sexBar").value);
  };

  // sexuality info.
  isBisexual = function() {
    return document.getElementById("bisexualCheck").selected;
  };

  isAsexual = function() {
    return document.getElementById("asexualCheck").selected;
  };

  isOtherSex = function() {
    return document.getElementById("otherSexCheck").selected;
  };

  isHetero = function() {
    return document.getElementById("heterosexualCheck").selected;
  };

  isHomo = function() {
    return document.getElementById("homosexualCheck").selected;
  };

  // gender/presentation info.
  isAgender = function() {
    return document.getElementById("agenderCheck").selected;
  };

  isBigender = function() {
    return document.getElementById("bigenderCheck").selected;
  };

  isMan = function() {
    return document.getElementById("maleCheck").selected;
  };

  isWoman = function() {
    return document.getElementById("femaleCheck").selected;
  };

  isBinary = function() {
    return document.getElementById("binaryCheck").selected;
  };

  isNonbinary = function() {
    return document.getElementById("nonbinaryCheck").selected;
  };

  isOtherGender = function() {
    return document.getElementById("otherGenderCheck").selected;
  };

  isMasc = function() {
    return genderPerc() < 0;
  };

  isFem = function() {
    return genderPerc() > 0;
  };

  // takes a percentage from -95 to 95 and returns an appropriate HSL color.
  // from blue to black to pink.
  getColor = function(val) {
    var hue, lighting;
    // difference from 0 to 95 should be reduced from 0 to 30
    hue = 280 + (val * (30 / 95));
    // for lighting, 0 to 95 becomes 0 to 60%
    lighting = Math.abs(val * (60 / 95));
    return "hsl(" + hue + ", 80%, " + lighting + "%)";
  };

  sexName = function() {
    if (isHetero()) {
      return " heterosexual";
    } else if (isHomo()) {
      return " homosexual";
    } else if (isBisexual()) {
      return " bisexual";
    } else if (isAsexual()) {
      return "n asexual";
    } else if (isOtherSex()) {
      if (document.getElementById("sexInfo").value !== "") {
        return "(n) " + document.getElementById("sexInfo").value;
      }
    }
    return " ???";
  };

  genderName = function() {
    if (isBigender()) {
      return "bigendered person";
    } else if (isAgender()) {
      return "genderless person";
    } else if (isMan()) {
      return "man";
    } else if (isWoman()) {
      return "woman";
    } else if (isNonbinary()) {
      return "nonbinary person";
    } else if (isBinary()) {
      if (isMasc()) {
        return "masculine person";
      } else if (isFem()) {
        return "feminine person";
      } else {
        return "person";
      }
    } else if (isOtherGender()) {
      if (document.getElementById("sexInfo").value !== "") {
        return document.getElementById("genderInfo").value;
      }
    }
    return "???";
  };

  iAmA = function() {
    return document.getElementById("iama").innerHTML = "I am a" + sexName() + " " + genderName() + ".";
  };

  sexInput = function() {
    var pref;
    // we want to get a preference viewed differently from sexName().
    pref = "neutral";
    document.getElementById("sexBarColorDiv").style.backgroundColor = getColor(sexPerc());
    if (sexPerc() < 0) {
      pref = "masculine";
    } else if (sexPerc() > 0) {
      pref = "feminine";
    }
    if (sexPerc() === -100) {
      pref = "men";
    } else if (sexPerc() === 100) {
      pref = "women";
    }
    // print preference rounded to 2 decimal places
    document.getElementById("sexMessage").innerHTML = "preference: " + Math.abs(sexPerc()) + "% " + pref;
    return iAmA();
  };

  genderInput = function() {
    document.getElementById("genderBarColorDiv").style.backgroundColor = getColor(genderPerc());
    if (isBigender()) {
      document.getElementById("genderMessage").innerHTML = "gender: bigender";
    } else {
      document.getElementById("genderMessage").innerHTML = "gender: " + Math.abs(genderPerc()) + "% " + genderName();
    }
    return iAmA();
  };

  noSexSpectrum = function() {
    document.getElementById("sexBarDiv").style.display = "none";
    document.getElementById("otherSexDiv").style.display = "none";
    return sexInput();
  };

  noGenderSpectrum = function() {
    document.getElementById("genderBarDiv").style.display = "none";
    document.getElementById("otherGenderDiv").style.display = "none";
    return genderInput();
  };

  $(document).ready(function() {
    document.getElementById("sexBar").oninput = sexInput;
    document.getElementById("sexSelection").oninput = function() {
      var sexSelected;
      sexSelected = document.getElementById("sexSelection").value;
      if (sexSelected === "Bisexual") {
        document.getElementById("sexBarDiv").style.display = "block";
        document.getElementById("otherSexDiv").style.display = "none";
        return sexInput();
      } else if (sexSelected === "Other") {
        document.getElementById("sexBarDiv").style.display = "none";
        document.getElementById("otherSexDiv").style.display = "block";
        return sexInput();
      } else {
        return noSexSpectrum();
      }
    };
    document.getElementById("genderBar").oninput = genderInput;
    document.getElementById("genderSelection").oninput = function() {
      var genderSelected;
      genderSelected = document.getElementById("genderSelection").value;
      if (genderSelected === "Binary") {
        document.getElementById("genderBarDiv").style.display = "block";
        document.getElementById("otherGenderDiv").style.display = "none";
        return genderInput();
      } else if (genderSelected === "Other") {
        document.getElementById("genderBarDiv").style.display = "none";
        document.getElementById("otherGenderDiv").style.display = "block";
        return genderInput();
      } else {
        return noGenderSpectrum();
      }
    };
    document.getElementById("sexInfo").oninput = iAmA;
    document.getElementById("genderInfo").oninput = iAmA;
    document.getElementById("sexBar").value = 0;
    document.getElementById("genderBar").value = 0;
    document.getElementById("sexSelection").value = "Heterosexual";
    document.getElementById("genderSelection").value = "Male";
    noSexSpectrum();
    noGenderSpectrum();
    return $('#page').fadeIn(1000);
  });

}).call(this);
