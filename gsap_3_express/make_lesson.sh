#!/bin/bash

# Validate argument presence
if [ -z "$1" ]; then
  echo "Error: Provide a directory name."
  echo "Usage: ./make-gsap.sh 01-basic-tween"
  exit 1
fi

DIR_NAME=$1

# Scaffold directory and enter it
mkdir $DIR_NAME
cd $DIR_NAME

# Generate HTML with GSAP CDNs pre-injected
cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GSAP: $DIR_NAME</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Exercise: $DIR_NAME</h1>
    <div class="box"></div>

    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
EOF

# Generate baseline CSS
cat <<EOF > style.css
* { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
}

body { 
    background-color: #121212; 
    color: #ffffff; 
    font-family: sans-serif;
    padding: 2rem; 
}

.box { 
    width: 100px; 
    height: 100px; 
    background-color: #0ae448; 
    margin-top: 2rem; 
    border-radius: 8px;
}
EOF

# Generate baseline JavaScript
cat <<EOF > script.js
// Register plugin globally
gsap.registerPlugin(ScrollTrigger);

console.log("GSAP Sandbox Ready: $DIR_NAME");

// Basic testing tween
gsap.to(".box", { 
    x: 200, 
    rotation: 360,
    duration: 1.5,
    ease: "power2.inOut"
});
EOF

echo "Success: Workspace '$DIR_NAME' initialized."