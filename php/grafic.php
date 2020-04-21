<?php

$im_Width=360*2; 
$im_Height=500; 

$im = imagecreate($im_Width+1, $im_Height+1)
    or die("Cannot Initialize new GD image stream");

$background_color = imagecolorallocate($im, 255, 255, 255);

$cBlue=ImageColorAllocate($im,0,100,255); 
$cRed=ImageColorAllocate($im,255,100,0); 
$cBlack=ImageColorAllocate($im,0,0,0);

imageLine($im,0,0,0,$im_Height,$cBlack); 
imageLine($im,0,$im_Height/2,$im_Width,$im_Height/2,$cBlack);

$xv = 0;
$yv = $im_Height / 2;

function f($x) {
    return (1-exp(deg2rad($x)))*sin(deg2rad($x)*30);
}

for ($pt = 0; $pt < $im_Width; $pt++) {
    $x = $xv + 1;
    $y = ($im_Height / 2) + (1 - f($x) );
    ImageLine($im, $xv, $yv, $x, $y, $cBlue);
    $xv = $x;
    $yv = $y;
}

header("Content-Type: image/png");
imagepng($im);
imagedestroy($im);
?>

<?php

class Grafic
{
    private $im_Width;
    private $im_Height;
    private $im = null;
    private $background_color;
    private $cBlue;
    private $cBlack;

    function __construct()
    {
        $im_Width = 360 * 2;
        $im_Height = 600;
        $im = imagecreate($im_Width + 1, $im_Height + 1);

        $background_color = imagecolorallocate($im, 255, 255, 255);
        $cBlue = imagecolorallocate($im, 0, 100, 255);
        $cBlack = imagecolorallocate($im, 0, 0, 0);
    }
    function init()
    {
        imageLine($this->im, 0, 0, 0, $this->im_Height, $this->cBlack);
        imageLine($this->im, 0, $this->im_Height / 2, $this->im_Width, $this->im_Height / 2, $this->cBlack);
    }
    function f($x) {
        return (1-exp(deg2rad($x)))*sin(deg2rad($x)*30);
    }
    function render()
    {
        $this->init();
        $xv = 0;
        $yv = $this->im_Height / 2;
        for ($pt = 0; $pt < $this->im_Width; $pt++) {
            $x = $xv + 1;
            $y = ($this->im_Height / 2) + (1 - $this->f($x)) * ($this->im_Height / 100);
            ImageLine($this->im, $xv, $yv, $x, $y, $this->cBlue);
            $xv = $x;
            $yv = $y;
        }
        header("Content-Type: image/png");
        imagepng($this->im);
        imagedestroy($this->im);
    }
}
    $asd = new Grafic();
    $asd->render();

?>
