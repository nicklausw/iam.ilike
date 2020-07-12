# percentage functions return from the range of -95 to 95.
# -95 is male/masculine, 0 is neutral, 95 is female/feminine.
genderPerc = -> Math.round(document.getElementById("genderBar").value)
sexPerc = -> Math.round(document.getElementById("sexBar").value)

# sexuality info.
isBisexual = -> document.getElementById("bisexualCheck").checked
isAsexual = -> document.getElementById("asexualCheck").checked
isOtherSex = -> document.getElementById("otherSexCheck").checked
isHetero = -> document.getElementById("heterosexualCheck").checked
isHomo = -> document.getElementById("homosexualCheck").checked

# gender/presentation info.

isAgender = -> document.getElementById("agenderCheck").checked
isBigender = -> document.getElementById("bigenderCheck").checked
#isTrans = -> document.getElementById("isTrans").checked
isMan = -> document.getElementById("maleCheck").checked
isWoman = -> document.getElementById("femaleCheck").checked
isBinary = -> document.getElementById("binaryCheck").checked
isNonbinary = -> document.getElementById("nonbinaryCheck").checked
isOtherGender = -> document.getElementById("otherGenderCheck").checked
isMasc = -> genderPerc() < 0
isFem = -> genderPerc() > 0

# takes a percentage from -95 to 95 and returns an appropriate HSL color.
# from blue to black to pink.
getColor = (val) ->
  # difference from 0 to 95 should be reduced from 0 to 30
  hue = 280 + (val * (30/95))
  # for lighting, 0 to 95 becomes 0 to 60%
  lighting = Math.abs(val * (60/95))
  return "hsl("+hue+", 80%, "+lighting+"%)"

sexName = ->
  if isHetero()
    return " heterosexual"
  else if isHomo()
    return " homosexual"
  else if isBisexual()
    return " bisexual"
  else if isAsexual()
    return "n asexual"
  else if isOtherSex()
    if document.getElementById("sexInfo").value != ""
      return "(n) " + document.getElementById("sexInfo").value
  return " ???"

genderName = ->
  if isBigender()
    return "bigendered person"
  else if isAgender()
    return "genderless person"
  else if isMan()
    return "man"
  else if isWoman()
    return "woman"
  else if isNonbinary()
    return "nonbinary person"
  else if isBinary()
    if isMasc()
      return "masculine person"
    else if isFem()
      return "feminine person"
    else
      return "person"
  else if isOtherGender()
    if document.getElementById("sexInfo").value != ""
      return document.getElementById("genderInfo").value
  return "???"

letemknow = -> alert("Your input has been recorded! Thank you.")

iAmA = -> document.getElementById("iama").innerHTML = "I am a" + sexName() + " " + genderName() + "."

sexInput = ->
  # we want to get a preference viewed differently from sexName().
  pref = "neutral"
  document.getElementById("sexBarColorDiv").style.backgroundColor = getColor(sexPerc())
  if sexPerc() < 0
    pref = "masculine"
  else if sexPerc() > 0
    pref = "feminine"
  if sexPerc() == -100
    pref = "men"
  else if sexPerc() == 100
    pref = "women"
  # print preference rounded to 2 decimal places
  document.getElementById("sexMessage").innerHTML = "preference: " + Math.abs(sexPerc()) + "% " + pref
  iAmA()

genderInput = ->
  document.getElementById("genderBarColorDiv").style.backgroundColor = getColor(genderPerc())
  if isBigender()
    document.getElementById("genderMessage").innerHTML = "gender: bigender"
  else
    document.getElementById("genderMessage").innerHTML = "gender: " + Math.abs(genderPerc()) + "% " + genderName()
  iAmA()

noSexSpectrum = ->
  document.getElementById("sexBarDiv").style.display = "none"
  document.getElementById("otherSexDiv").style.display = "none"
  sexInput()

noGenderSpectrum = ->
  document.getElementById("genderBarDiv").style.display = "none"
  document.getElementById("otherGenderDiv").style.display = "none"
  genderInput()

$(document).ready ->
  document.getElementById("sexBar").oninput = sexInput
  document.getElementById("homosexualCheck").oninput = noSexSpectrum
  document.getElementById("heterosexualCheck").oninput = noSexSpectrum
  document.getElementById("asexualCheck").oninput = noSexSpectrum
  document.getElementById("bisexualCheck").oninput = ->
    document.getElementById("sexBarDiv").style.display = "block"
    document.getElementById("otherSexDiv").style.display = "none"
    sexInput()
  document.getElementById("otherSexCheck").oninput = ->
    document.getElementById("sexBarDiv").style.display = "none"
    document.getElementById("otherSexDiv").style.display = "block"
    sexInput()

  document.getElementById("genderBar").oninput = genderInput
  document.getElementById("maleCheck").oninput = noGenderSpectrum
  document.getElementById("femaleCheck").oninput = noGenderSpectrum
  document.getElementById("bigenderCheck").oninput = noGenderSpectrum
  document.getElementById("agenderCheck").oninput = noGenderSpectrum
  document.getElementById("nonbinaryCheck").oninput = noGenderSpectrum
  document.getElementById("binaryCheck").oninput = ->
    document.getElementById("genderBarDiv").style.display = "block"
    document.getElementById("otherGenderDiv").style.display = "none"
    genderInput()
  document.getElementById("otherGenderCheck").oninput = ->
    document.getElementById("genderBarDiv").style.display = "none"
    document.getElementById("otherGenderDiv").style.display = "block"
    genderInput()

  document.getElementById("sexInfo").oninput = iAmA
  document.getElementById("genderInfo").oninput = iAmA

  document.getElementById("sexBar").value = 0
  document.getElementById("genderBar").value = 0
  document.getElementById("heterosexualCheck").checked = true
  document.getElementById("maleCheck").checked = true
  noSexSpectrum()
  noGenderSpectrum()
  $('#page').fadeIn(1000)