# percentage functions return from the range of -95 to 95.
# -95 is male/masculine, 0 is neutral, 95 is female/feminine.
genderPerc = -> Math.round(document.getElementById("genderBar").value)
sexPerc = -> Math.round(document.getElementById("sexBar").value)

# sexuality info.
isBisexual = -> document.getElementById("bisexualCheck").selected
isAsexual = -> document.getElementById("asexualCheck").selected
isOtherSex = -> document.getElementById("otherSexCheck").selected
isHetero = -> document.getElementById("heterosexualCheck").selected
isHomo = -> document.getElementById("homosexualCheck").selected

# gender/presentation info.

isAgender = -> document.getElementById("agenderCheck").selected
isBigender = -> document.getElementById("bigenderCheck").selected
isMan = -> document.getElementById("maleCheck").selected
isWoman = -> document.getElementById("femaleCheck").selected
isBinary = -> document.getElementById("binaryCheck").selected
isNonbinary = -> document.getElementById("nonbinaryCheck").selected
isOtherGender = -> document.getElementById("otherGenderCheck").selected
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

  document.getElementById("sexSelection").oninput = ->
    sexSelected = document.getElementById("sexSelection").value
    if sexSelected == "Bisexual"
      document.getElementById("sexBarDiv").style.display = "block"
      document.getElementById("otherSexDiv").style.display = "none"
      sexInput()
    else if sexSelected == "Other"
      document.getElementById("sexBarDiv").style.display = "none"
      document.getElementById("otherSexDiv").style.display = "block"
      sexInput()
    else noSexSpectrum()

  document.getElementById("genderBar").oninput = genderInput

  document.getElementById("genderSelection").oninput = ->
    genderSelected = document.getElementById("genderSelection").value
    if genderSelected == "Binary"
      document.getElementById("genderBarDiv").style.display = "block"
      document.getElementById("otherGenderDiv").style.display = "none"
      genderInput()
    else if genderSelected == "Other"
      document.getElementById("genderBarDiv").style.display = "none"
      document.getElementById("otherGenderDiv").style.display = "block"
      genderInput()
    else noGenderSpectrum()

  document.getElementById("sexInfo").oninput = iAmA
  document.getElementById("genderInfo").oninput = iAmA

  document.getElementById("sexBar").value = 0
  document.getElementById("genderBar").value = 0
  document.getElementById("sexSelection").value = "Heterosexual"
  document.getElementById("genderSelection").value = "Male"
  noSexSpectrum()
  noGenderSpectrum()
  $('#page').fadeIn(1000)