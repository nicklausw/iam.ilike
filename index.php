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

        <hr style="border: 1px solid white;" />

        <h2>sexual preference</h2>
        <div>
            <input type="checkbox" name="likesBothCheck" id="likesBoth"><label for="likesBoth">I like both</label>
        </div>
        <div id="sexBarDiv">
            <input id="sexBar" name="sexBar" step="5" type="range" value="0" min="-100" max="100">
        </div>
        <h3 id="sexMessage">input sexual attraction on a spectrum from masculine to feminine...</h3>
        
        <hr style="border: 1px solid white;" />

        <h2>gender</h2>
        <div>
            <input type="checkbox" name="bigenderCheck" id="isBoth"><label for="isBoth">I am both</label>
            <input type="checkbox" name="transCheck" id="isTrans"><label for="isTrans">I am trans</label>
        </div>
        <div id="genderBarDiv">
            <input id="genderBar" name="genderBar" step="5" type="range" value="0" min="-100" max="100">
        </div>
        <h3 id="genderMessage">input gender level on a spectrum from masculine to feminine...</h3>

        <hr style="border: 1px solid white;" />
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
            $servername = "localhost";
            $username = "u437327308_iamilikeuser";
            $password = "HooteyBig6";
            $dbname = "u437327308_iamilikedb";

            // Create connection
    
            $conn = new mysqli($servername, $username, $password, $dbname);

            $likeboth = isset($_POST['likesBothCheck']);
            $amboth = isset($_POST['bigenderCheck']);
            $amtrans = isset($_POST['transCheck']);
            $progress = $_POST['sexBar'];
            $transprogress = $_POST['genderBar'];
            $info = $_POST['info'];

            $sql = "INSERT INTO `NewData` (Bisexual, Bigender, Trans, Preference, Gender, Info) VALUES ('$likeboth', '$amboth', '$amtrans', '$progress', '$transprogress', '$info')"; 

	        $conn->query($sql);
        }
    ?> 
</html>