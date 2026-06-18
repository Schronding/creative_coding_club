gsap.to("h1", {x:-400, y: -100})
gsap.to("h1", {x: 400, y: 100}, "+=1")
/* 0. It seems this x is the start of where the objects will be placed. Even
though the h1 of my index.html have very different widths they both seem to have
been put next to a box that has the height of two of both of them combined and
a width of 400 px. What is interesting to me is that when I open the DevTools the
box where both h1 were is displayed as "body" but when you go to where the elements
actually are it correctly shows that they're h1 and their bounding boxes. How does
GSAP achieve this internally? I assumed it just created invisible objects that moved
the elements around by means of gaps, paddings or magins (that sounds quite fragile
though). */
/* 1. Also it is important to note that GSAP seems to follow a totally positive 
coordinate system in which the origin (0, 0) is on the upper left corner.*/
/* 2. There are negative numbers in GSAP too! Even though the negative quadrants
aren't visible on the screen, I can send my objects outside of the page, I assume by
a distance equal to the value I put... lets test that out. I am surprised that
it doesn't. While I would expect to have my h1 in exactly the same place that they
started it seems like outside of the screen is like the "infinite"; it doesn't 
matter if you are 2, 3, 4 times infinite, they all are infinite, so the distance is
the same. While another idea might be that these coordinates are absolutes, the 
animation do seem to happen outside of the screen and then to return. Lets test
that out. */
gsap.to("h2", {x: 100})
gsap.to("h2", {y: 50}, "+=1")
gsap.to("h2", {x: -100, y:-50}, "+=1")
/* 3. I can't quite grasp the behavior, as it is not commutative; the h2 goes 
outside of the screen even though it moved backwards exactly the same amount of 
... is it pixels? that it moved forwards. Maybe if I separate the instructions
one by one I would return to the same position, as the diagonal might be causing
the unexpected behavior. */
gsap.to("h3", {x: 100})
gsap.to("h3", {y: 100}, "+=0.5")
gsap.to("h3", {x: -100}, "+=0.5")
gsap.to("h3", {y:-100}, "+=0.5")
/* 4. This behavior is even worse with h3! It goes completely out of the screen. 
I have an hypothesis though: gsap treats each object or block as an independent 
coordinate system, so when it moves to a positive number it pushes from the top 
left corner but when it moves to a negative number, it pushes from the bottom right
corner... I think that is actually nonsense! If the origin is on the top left of the
screen then whatever negative number will always get the object (at least partially)
out of the screen. */
gsap.to("h4", {x: 100})
gsap.to("h4", {x: 0}, "+=0.5")
gsap.to("h4", {x: 100}, "+=0.5")
gsap.to("h4", {x: 0}, "+=0.5")
gsap.to("h4", {y: -10}, "+=0.5")
gsap.to("h4", {x: -10}, "+=0.5")
gsap.to("h4", {x: 0}, "+=0.5")


/* 5. It seems I was just partially right. It seems that with positive numbers 
it follows absolutes (actual coordinates in the screen) but with negative numbers 
it follows relatives (according to this current position, move yourself number pixels
to the opposite direction of the axis; left for x and top for y). */

// DOUBTS ALREADY ON doubts.md