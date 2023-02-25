# dev_learning

This git repo create for checking the learning practice. 

I make each folder by name.

Thank you for your cooperation

File structure should be like below.

make onlye HTML file, do not seperate CSS and JS file.

use local server, in VScode add Live server extenstion.


<!-- @format -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Three sample</title>
    <style>
      body {
        margin: 0;
        height: 100vh;
        box-sizing: border-box;
      }
      #three {
        width: 100%;
        height: 100vh;
        display: block;
      }
    </style>
  </head>
  <body>
    <canvas id="three"></canvas>
    <script
      defer
      src="https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/es-module-shims.js"
    ></script>


    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three@0.147.0/build/three.module.js",
          <!-- if need add module here --> 

      }
    </script>
    <script type="module">
      import * as THREE from "three";
      
      <!--  your code --> 

    </script>
  </body>
</html>





Have a nice day!

If have a chance to visit Korea, I want to see you guys.
