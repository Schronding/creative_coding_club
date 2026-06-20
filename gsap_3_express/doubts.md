# Doubts and Solutions: GSAP Coordinate System & Transforms

## GSAP 3 Express

### 0. GSAP Internal Movement Mechanics (`01_our_development_environment/script.js` - Comment 0)
**User's Discovery/Doubt:**
"It seems this x is the start of where the objects will be placed... What is interesting to me is that when I open the DevTools the box where both h1 were is displayed as 'body' but when you go to where the elements actually are it correctly shows that they're h1 and their bounding boxes. How does GSAP achieve this internally? I assumed it just created invisible objects that moved the elements around by means of gaps, paddings or margins (that sounds quite fragile though)."

**Explanation:**
Your intuition that using margins or paddings would be fragile is absolutely correct! Manipulating those layout properties triggers a "layout recalculation" (reflow) in the browser, which is terrible for performance. Instead, GSAP manipulates CSS Transforms (specifically `transform: translate()` or 3D matrices) via inline HTML styles. CSS Transforms operate directly on the GPU and manipulate the visual representation of the element *without* affecting the normal document flow. That is why the `body` and original layout bounding boxes remain exactly where they started in DevTools, even though the elements visually move across the screen.

---

### 1. The GSAP Coordinate Origin (`01_our_development_environment/script.js` - Comment 1)
**User's Discovery/Doubt:**
"Also it is important to note that GSAP seems to follow a totally positive coordinate system in which the origin (0, 0) is on the upper left corner."

**Explanation:**
You are on the right track, but there is a crucial distinction to make. While the standard web/DOM coordinate system treats the top-left corner of the browser window as `(0,0)`, GSAP's `x` and `y` transform values use the element's **original, static position in the document flow** as `(0,0)`. Every element has its own localized `(0,0)` origin point based on exactly where your standard HTML/CSS initially rendered it before any JavaScript ran.

---

### 2. Negative Numbers and "Infinite" Distance (`01_our_development_environment/script.js` - Comment 2)
**User's Discovery/Doubt:**
"There are negative numbers in GSAP too! ... I am surprised that it doesn't [return to exactly the same place]. While I would expect to have my h1 in exactly the same place that they started it seems like outside of the screen is like the 'infinite'... While another idea might be that these coordinates are absolutes, the animation do seem to happen outside of the screen and then to return."

**Explanation:**
Your secondary idea—that these coordinates are absolute—is the correct one! Negative numbers do not represent an "infinite" distance. A negative value simply translates the element to the left (for `x`) or upwards (for `y`) relative to its starting coordinate. If an element starts near the left edge of the screen and you animate it to `x: -400`, it will naturally fly off-screen because you literally instructed it to sit 400 pixels to the left of its home base. 

---

### 3. Non-Commutative Movements and Diagonals (`01_our_development_environment/script.js` - Comment 3)
**User's Discovery/Doubt:**
"I can't quite grasp the behavior, as it is not commutative; the h2 goes outside of the screen even though it moved backwards exactly the same amount of... pixels? that it moved forwards. Maybe if I separate the instructions one by one I would return to the same position, as the diagonal might be causing the unexpected behavior."

**Explanation:**
The animations are not commutative here for two reasons. First, standard `gsap.to()` calls parse raw numerical values as **Absolute Target Coordinates**, not as sequential mathematical steps (more on this in Comment 5). Second, because you triggered multiple `gsap.to()` animations back-to-back on the same element without organizing them inside a `gsap.timeline()`, the animations ran simultaneously, fought for control, and read intermediate starting values, causing the erratic diagonal behavior you observed.

---

### 4. Independent Coordinate Systems Hypothesis (`01_our_development_environment/script.js` - Comment 4)
**User's Discovery/Doubt:**
"This behavior is even worse with h3! It goes completely out of the screen. I have an hypothesis though: gsap treats each object or block as an independent coordinate system, so when it moves to a positive number it pushes from the top left corner but when it moves to a negative number, it pushes from the bottom right corner... I think that is actually nonsense! If the origin is on the top left of the screen then whatever negative number will always get the object (at least partially) out of the screen."

**Explanation:**
You correctly debunked your own hypothesis! GSAP does indeed treat each object as an independent coordinate system (with its own `(0,0)` origin point as established in Comment 1), but it does not switch to pushing from the bottom-right for negative numbers. The erratic behavior of `h3` flying off-screen was caused by the same issue as `h2`: overlapping animations and passing absolute destination coordinates instead of relative values.

---

### 5. Absolute vs. Relative Positioning Conclusion (`01_our_development_environment/script.js` - Comment 5)
**User's Discovery/Doubt:**
"It seems I was just partially right. It seems that with positive numbers it follows absolutes (actual coordinates in the screen) but with negative numbers it follows relatives (according to this current position, move yourself number pixels to the opposite direction of the axis; left for x and top for y)."

**Explanation:**
Your final conclusion was very close, but the golden rule of GSAP's `x` and `y` properties is much simpler: 

**Both positive AND negative raw numbers are ALWAYS Absolute Transform Coordinates relative to the element's original DOM starting position.**

* `x: 100` means "Go exactly 100px to the right of where you started."
* `x: -10` means "Go exactly 10px to the left of where you started."

GSAP does not care where the element *currently* is mid-animation when you use raw numbers. If you want to achieve true **relative** movement (e.g., "move 10px from your *current* position"), you must pass the values as strings combined with mathematical assignment operators: `x: "+=100"` or `x: "-=10"`.

# Doubts and Solutions: GSAP Coordinate System & Transforms

Folder: `schronding@StormTrooper:~/repos/creative_coding_club/gsap_3_express/03_from_fromTo$`

### 1. The `duration` Parameter in `fromTo` Tweens (`script.js` - Comments 0 & 1)
**User's Discovery/Doubt:**
"I wonder if that is caused becaused the duration must be in the `to` vars object (it doesn't make much sense to be on the `from` vars object, as I tell him that the start should take 3 seconds but by definition the start takes 0 seconds to start; it is instantaneous)... Yep, that was it! The duration in the from vars object is very useless in that regard. What bothers me a bit is that while the tween is happening there seems to be a shadow of `.fred` in the 'end' position."

**Explanation:**
Your deduction is absolutely flawless. In a `gsap.fromTo()` tween, the first object strictly defines the **starting state** (the initial values), and the second object defines the **destination state AND the animation properties**. GSAP ignores playback properties like `duration`, `delay`, and `ease` if placed in the `from` vars because, logically, you cannot animate *how* something begins, only *how* it travels to its destination. 

Regarding the "shadow" or ghosting effect: GSAP does not actually draw two frames simultaneously. What you experienced is a browser rendering artifact (known as "ghosting" or "sub-pixel rendering"). When browsers compute opacity and hardware-accelerated transforms (`x`, `y`, `scale`) simultaneously, certain monitor refresh rates or resolutions (like your half-1080p window) struggle to repaint the pixels fast enough, creating an optical illusion of a transparent trailing shadow.

---

### 2. Initial Matrix Normalization in DevTools (`script.js` - Comment 2)
**User's Discovery/Doubt:**
"When I open the Chrome Dev tools however it surprises me to see that before the translate, opacity and scale attributes are being changed, there is `transform: none;` and `rotate:none` in the in-line styling. Why does GSAP include those explicitly? I imagine that under the hood without those explicit attributes the tween would rotate or do something else without being told to do so."

**Explanation:**
GSAP is highly defensive about cross-browser bugs. By explicitly setting `transform: none` or initializing the matrix before the animation starts, GSAP forces the browser to calculate a pristine, normalized starting state. If GSAP didn't do this, external CSS stylesheets or browser defaults could inject hidden transform origins or skewed perspectives that would silently corrupt the math for the duration of the tween. It establishes a perfectly clean slate.

---

### 3. Box Model Transparency vs Element Boundaries (`script.js` - Comments 3 & 4)
**User's Discovery/Doubt:**
"As this is a static image, `borderRadius` doesn't seem to do much... The borderRadius did work! Is just that it changed the box in which `.fred` is located. As it is a png without background, it is not until I put the backgroundColor property that I saw the borders."

**Explanation:**
You correctly identified how the CSS Box Model interacts with raster images! An `<img>` tag is just a rectangular container holding graphic data. Because Fred is a PNG with a transparent background, rounding the corners of his invisible rectangular container produces no visual change. Adding `backgroundColor` fills that rectangular box, instantly making the CSS `borderRadius` visible behind the transparent PNG. Furthermore, GSAP handles color transitions (like blue to yellow) by mathematically interpolating the RGB values, creating that smooth, gradient-like transition effect.

---

### 4. Skew Angles and Trigonometry (`script.js` - Comments 5 & 6)
**User's Discovery/Doubt:**
"I can't quite grasp what skewX does, as while I put it to 50 it seems as it the top pixels of the image moved to the left... skewY seems to do the same but in the pixels of the right instead of the top."

**Explanation:**
The numbers you pass to `skewX` and `skewY` are **degrees**, not pixels. A CSS skew performs a trigonometric distortion (shearing) along the 2D plane. 
When you specify `skewX: 50`, the browser tilts the vertical axis by 50 degrees. In standard CSS math, positive `skewX` values shear the element to the left (counter-clockwise). `skewY` operates on the horizontal axis, dragging the right edge downwards (clockwise).

---

### 5. Layout Properties vs. Transform Properties (`script.js` - Comments 7 & 8)
**User's Discovery/Doubt:**
"When I add `top` even thought the position of `.fred` is relative nothing seems to happen in the tween. My suspicion is that the x and y coordinates are overriding the behavior of top... Indeed now that I have only top I do see how it gradually moves upwards. I wonder where I would prefer to choose top and left over x and y."

**Explanation:**
`top` and `left` are CSS **Layout** properties. `x` and `y` are CSS **Transform** properties. While they compound each other visually, you should almost *always* prefer `x` and `y` for animations. 
Animating `top` and `left` forces the browser to recalculate the document layout (Reflow) on every single frame, which is computationally expensive and causes lag. Animating `x` and `y` offloads the work to the GPU (Hardware Acceleration), simply sliding the visual layer around without disturbing the surrounding HTML layout. `top` and `left` should only be used to set the initial, static resting place of the element in your CSS file.

---

### 6. The Limitations of CSS Color (`script.js` - Comment 9)
**User's Discovery/Doubt:**
"It seems that color would only be able to penetrate .fred if it was a SVG with astro.props."

**Explanation:**
Spot on. The CSS `color` property only affects typography and borders natively. It cannot tint raster images like PNGs or JPGs. If `.fred` were an inline `<svg>` injected directly into the HTML DOM, it could inherit the `color` property if its internal paths were set to `fill="currentColor"`.

---

### 7. Animating Curves and Bezier Paths (`script.js` - Comment 10)
**User's Discovery/Doubt:**
"I would really like to know how I could create a tween that simulated a curve, as for now everything seems to follow a straight line... I think I might be able to create a function that generates numbers (like a parabolla) and pass those values one by one to GSAP... I also wonder if the concept of Berznier curves could have something to do in here."

**Explanation:**
You are hitting advanced animation theory! Your instinct to use mathematical functions or Bezier curves is exactly how it is done. However, you don't need to write the math yourself. GSAP has an official plugin called the **MotionPathPlugin**. It allows you to feed GSAP an array of coordinate points or a literal SVG Bezier `<path>`, and GSAP handles the complex calculus to move the object smoothly along that exact curved trajectory.

---

### 8. 3D Rotation Degrees (`script.js` - Comments 11 & 12)
**User's Discovery/Doubt:**
"Damn, the effect of rotationX is sick!... I think it is safe those numbers are actually degrees. With rotationY: 180 I get a mirror image. As These rotation work around the axis, I think it safe to assume that simply `rotation` will be moving the image with the center of the block that contains it as the axis of revolution."

**Explanation:**
Yes, these values represent degrees (`deg`). 
* `rotationX` spins the element through the Z-depth around the horizontal axis (creating a 3D flip effect). 
* `rotationY` spins it around the vertical axis (creating a mirror/card-flip effect). 
* `rotation` (which is technically `rotationZ`) spins it in 2D space around its mathematical center point (or whatever CSS `transform-origin` you have defined).

---

### 9. GPU Linear Algebra and Matrices (`script.js` - Comments 13 & 14)
**User's Discovery/Doubt:**
"When I simply do scaleX the image seems to blink... I imagine the reason could be that I am passing way too many scales at the same time and the browser is confused... As I recall of the classes of Jose Luis Aragon a scale is simply multiplyng all the values of a matrix by a scalar (am I right?) Besides the dot product and matrix multiplication what other operations can the GPU do related to linear algebra? Which of those are applicable to CSS and why?"

**Explanation:**
Supplying `scale`, `scaleX`, and `scaleY` in the exact same tween overwrites the matrix calculations and confuses the GSAP parser, resulting in the blinking/disappearing element you saw. 

Your understanding of linear algebra is completely correct! Under the hood, CSS Transforms (`scale`, `rotate`, `translate`, `skew`) are all combined into a single 4x4 affine transformation matrix: `matrix3d()`. 
* **Scaling** multiplies coordinate vectors by scalars.
* **Translation** relies on vector addition.
* **Rotation** utilizes sine and cosine trigonometric functions within the matrix.

GPUs are explicitly designed to execute thousands of simple matrix multiplications in parallel simultaneously, which is why 3D rendering and CSS transforms are incredibly fast on them compared to the CPU. Even basic modern laptops have integrated graphics (iGPUs) built directly into the CPU chip. While an iGPU might only have 500MB of shared memory, rendering a 4x4 matrix calculation for a 2D CSS `scale` requires virtually zero memory overhead. Any machine manufactured in the last 15 years can process CSS hardware acceleration effortlessly.