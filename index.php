<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>iam.ilike - the gender-sexuality ID tool</title>
        <meta name="description" content="iam.ilike - the gender-sexuality ID tool.">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta property="og:url" content="https://nicklausw.com/iam.ilike">
        <link rel="stylesheet" href="main.css">
    </head>
	
    <form method="post"> 
	<body id="page">
    <center>
        <span>
        <h1>iam.ilike</h1>

        <h3>the gender-sexuality ID tool | <a href="https://nicklausw.com/">by nicklausw</a></h3>

        <hr style="border: 1px solid grey;" />

        <h2>sexual preference</h2>
        <h3>select the term that describes your sexual orientation best.</h3>
        <div>
            <input type="radio" name="sexualityRadio" value="Heterosexual" id="heterosexualCheck"><label for="heterosexualCheck">Heterosexual</label>
            <input type="radio" name="sexualityRadio" value="Homosexual" id="homosexualCheck"><label for="homosexualCheck">Homosexual</label>
            <input type="radio" name="sexualityRadio" value="Bisexual" id="bisexualCheck"><label for="bisexualCheck">Bisexual</label>
            <input type="radio" name="sexualityRadio" value="Asexual" id="asexualCheck"><label for="asexualCheck">Asexual</label>
            <input type="radio" name="sexualityRadio" value="Other" id="otherSexCheck"><label for="otherSexCheck">Other</label>
        </div>
        <div id="sexBarDiv">
            <h3>place your attraction to men/masculinity and women/femininity on the scale below.</h3>
            <div id="sexBarColorDiv">
                <input id="sexBar" name="sexBar" step="5" type="range" value="0" min="-95" max="95">
            </div>
            <h3 id="sexMessage">input sexual attraction on a spectrum from masculine to feminine...</h3>
        </div>
        <div id="otherSexDiv" style="display:none;">
            <textarea maxlength="25" id="sexInfo" name="sexInfo" rows="4" cols="50" placeholder="please specify your sexuality."></textarea>
        </div>
        
        <hr style="border: 1px solid grey;" />

        <h2>gender</h2>
        <h3>select the term that describes your gender best.</h3>
        <div>
            <input type="radio" name="genderRadio" value="Male" id="maleCheck"><label for="maleCheck">Male</label>
            <input type="radio" name="genderRadio" value="Female" id="femaleCheck"><label for="femaleCheck">Female</label>
            <input type="radio" name="genderRadio" value="Bigender" id="bigenderCheck"><label for="bigenderCheck">Bigender</label>
            <input type="radio" name="genderRadio" value="Agender" id="agenderCheck"><label for="agenderCheck">Agender</label>
            <input type="radio" name="genderRadio" value="Binary" id="binaryCheck"><label for="binaryCheck">Binary Spectrum</label>
            <input type="radio" name="genderRadio" value="Nonbinary" id="nonbinaryCheck"><label for="nonbinaryCheck">Nonbinary</label>
            <input type="radio" name="genderRadio" value="Other" id="otherGenderCheck"><label for="otherGenderCheck">Other</label>
        </div>
        <div id="genderBarDiv">
            <h3>place your orientation from male/masculine to female/feminine on the scale below.</h3>
            <div id="genderBarColorDiv">
                <input id="genderBar" name="genderBar" step="5" type="range" value="0" min="-95" max="95">
            </div>
            <h3 id="genderMessage">input gender level on a spectrum from masculine to feminine...</h3>
        </div>
        <div id="otherGenderDiv" style="display:none;">
            <textarea maxlength="25" id="genderInfo" name="genderInfo" rows="4" cols="50" placeholder="please specify your gender."></textarea>
        </div>

        <hr style="border: 1px solid grey;" />
        <h3 id="iama"></h3>

        <div>
            <textarea maxlength="2000" id="info" name="info" rows="4" cols="50" placeholder="does this statement fittingly describe your orientation? if not, what would be a better description?"></textarea>
        </div>
        <input type="submit" class="button" name="insert" value="Send Data for Analytics" onclick="letemknow()"/>
    </center>
    </body>
    </form>
    <script src="js/jquery.js"></script>
    <script src="js/main.js"></script>

    <?php
        if(isset($_POST['insert'])) { 
            $servername = "localhost"; //"localhost:3308";
            $username = "u437327308_iamilikeuser"; //"root";
            $password = "HooteyBig6"; //"";
            $dbname = "u437327308_iamilikedb"; //"data";

            // Create connection
    
            $conn = new mysqli($servername, $username, $password, $dbname);

            $Sexuality = $_POST['sexualityRadio'];
            $Gender = $_POST['genderRadio'];
            $sexSpectrum = $_POST['sexBar'];
            $genderSpectrum = $_POST['genderBar'];
            $Feedback = $_POST['info'];

            if ($Sexuality === "Other") {
                $Sexuality = $_POST['sexInfo'];
            }
            if ($Gender === "Other") {
                $Gender = $_POST['genderInfo'];
            }

            $sql = "INSERT INTO `NewData2` (Sexuality, Gender, sexSpectrum, genderSpectrum, Feedback) VALUES ('$Sexuality', '$Gender', '$sexSpectrum', '$genderSpectrum', '$Feedback')";
            $conn->query($sql);
            mysqli_close($conn);
        }
    ?> 
</html>