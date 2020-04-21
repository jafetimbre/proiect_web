<html>

<body>
    <?php include("./meniu.php") 
    ?>

    <div style="padding: 5px; border:1px solid black;margin:10px">
        <?php
            if(isset($_POST['trimis'])) {
                echo '<i>Bine ati venit <b>'.$_POST["nume"].' '.$_POST["p_nume"].'</b> !</i>';
            }
        ?>
        <form action="login.php" method="POST" style="margin: 10px">
            <label for="nume">Nume:</label><br>
            <input type="text" id="nume" name="nume"><br>
            <label for="p_nume">Prenume:</label><br>
            <input type="text" id="p_nume" name="p_nume"><br><br>
            <input type="submit" name="trimis" value="Trimite">
        </form>
    </div>
</body>

</html>