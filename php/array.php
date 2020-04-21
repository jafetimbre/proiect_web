<html>
    <body>
        <?php include("./meniu.php") ?>
        <div style="padding: 5px; border:1px solid black;margin:10px">
            <table border='1'>
                <?php
                $tablou = array_fill(0, 10, array_fill(0, 10, 0));
                for ($i = 0; $i < 10; $i++) {
                    for ($j = 0; $j < 10; $j++) {
                        $tablou[$i][$j] = rand(1, 10);
                    }
                };
                foreach ($tablou as $row) {
                    echo '<tr>';
                    foreach ($row as $el) {
                        echo '<td>' . $el . '</td>';
                    }
                    echo '</tr>';
                }
                ?>
            </table>

        </div>
    </body>
</html>