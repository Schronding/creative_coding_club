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