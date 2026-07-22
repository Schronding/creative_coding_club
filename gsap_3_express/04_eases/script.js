gsap.registerPlugin(ScrollTrigger);

console.log("GSAP Sandbox Ready: 04_eases");

/*1. 
gsap.to(".green", {duration:3, x:600, ease:"back(6)"});
I wonder what the `ease:"back(6)"` tells the browser, as when I 
open the Chrome Web Dev Tools it seems that the maximum position that 
the `green` tween goes is about `x:1000`... but how does 6 translate
into 400 extra pixels? I want to think that the 6 tells the tween
to go beyond 0.6 pixels of the distance he traveled. Counting padding
I have that the distance traveled is about 600 - 2rem (32) = 568 pixels.
Maybe for each 1 the tween moves an extra 50 pixels in the `ease:"back"`. */
/*0. 
gsap.to(".pink", {duration:0, x:600, ease:"linear"});
It seems that some easy way to make things appear from one place
to another is by using `duration:0` */
/*2. 
gsap.to(".green", {duration:3, x:600, ease:"power1"});
gsap.to(".pink", {duration:3, x:600, ease:"power2"});
I feel that all the power eases are just for checking manually
and iterating until you find the one that feels right. The curves
in the ease visualizer look almost the same and it is not until I compare
these 2 that I can clearly see that `power2` goes faster at the 
beginning that `power1` */

/*4. 
gsap.to(".green", {duration:3, x:600, ease:"power1"});
gsap.to(".pink", {duration:3, x:600, ease:"power2"}); 
gsap.to(".green", {duration:3, x:600, ease:"power3"});
gsap.to(".pink", {duration:3, x:600, ease:"power4"}); 
It seems that if I have a redudant ease (as it is the case here in
which I describe different eases for the same class) the one that is
actually applied is the last one. */ 

/*3. 
gsap.to(".green", {duration:3, x:600, ease:"power3"});
gsap.to(".pink", {duration:3, x:600, ease:"power4"});    
I actually like `power3` and `power4`. It is as if they "jumped"
with force  */

/*5. 
gsap.to(".green", {duration:3, x:600, ease:"power1"});
gsap.to(".pink", {duration:3, x:600, ease:"power2"}); 
gsap.to(".blue", {duration:3, x:600, ease:"power3"});
gsap.to(".red", {duration:3, x:600, ease:"power4"});
gsap.to(".orange", {duration:3, x:600, ease:"power5"});  
It seems that the higher the number in the power the "bigger" the
starting jump, except in the case of `power5` which looks pretty much 
like a `linear` ease. In fact, it is a bit slower than `power1`. */

/*6. 
gsap.to(".green", {duration:3, x:600, ease:"bounce"});
gsap.to(".pink", {duration:3, x:600, ease:"circ"}); 
gsap.to(".blue", {duration:3, x:600, ease:"elastic"});

gsap.to(".red", {duration:3, x:600, ease:"sine"});
gsap.to(".orange", {duration:3, x:600, ease:"expo"});
`bounce` and `elastic` are very over the top, but the other 3 seem
practically just like another version of `power1` ease at different speeds.
(I wonder if these easings could be more visible with more complex kinds
of animations, such as radial ones.) */  

/*8. 
gsap.to(".green", {duration:3, x:600, ease:"power1"});
gsap.to(".pink", {duration:3, x:600, ease:"circ"}); 
gsap.to(".blue", {duration:3, x:600, ease:"power5"});
gsap.to(".red", {duration:3, x:600, ease:"sine"});
gsap.to(".orange", {duration:3, x:600, ease:"expo"});
Damn my bad, it seems that I have messed up the order, as I had this
list in different order that it appears on the screen. However I can still
say that `sine` feels very much alike the `power1` and `power5` eases. */

/*10. 
gsap.to(".green", {duration:3, x:600, ease:"none"});
gsap.to(".pink", {duration:3, x:600, ease:"steps(12)"}); 
gsap.to(".blue", {duration:3, x:600, ease:"rough"});
gsap.to(".red", {duration:3, x:600, ease:"slow"});
gsap.to(".orange", {duration:3, x:600, ease:"expoScale"});
How interesting. The `steps` ease seems to need a number by default, as when 
I left it without one it simply didn't moved. The others on the other hand remain in
place and it is only when the time has passed that they arrive at the `x:600` 
coordinate. That is not a problem of a missing parameter, as when I put numbers 
in them nothing changes... I think that when GSAP doesn't recognize an ease (which
makes sense, as these are not part of the core package) it simply replaces it with
the default which is `back.out` if I remember correctly. */

/*12. 
gsap.to(".green", {duration:3, x:600, ease:"none"});
gsap.to(".pink", {duration:3, x:600, ease:"linear"}); 
My hypothesis was correct! A `linear` ease is the same as not having any 
ease whatsoever (`none`). This was probably just a decision that the developers took
in order to make the library more intuitive (which I wonder what its current state is,
as I have heard that CSS is beginning to copy a lot of GSAP great features and putting
them as a native part of the language. I think CSS is probably very behind still, but
that it will come a moment in which GSAP dissappears just as coffescript dissappeared:
they were so good they became the norm). */

/*13. It seems that all of these eases have a lot of arguments you can tweak... not
really, the ones that actually allow a lot of customatization are the ones that were
explicitly created to do so, such as `CustomEase` which seems to follow the same
nomenclature of an SVG, `CustomBounce` and `CustomWiggle`.  */

gsap.to(".green", {duration:3, x:600, ease:"CustomEase"});
gsap.to(".pink", {duration:3, x:600, ease:"CustomWiggle"}); 
gsap.to(".blue", {duration:3, x:600, ease:"CustomBounce"});
/*14. Indeed none of these work. I wonder how you enable them. I assume it is by 
putting the url of the GSAP code (which I don't think it is open source) in a 
`<script>` tag. */
