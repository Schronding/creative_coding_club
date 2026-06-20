// gsap.from(".fred", {x: 666, y:666, duration:2})
/* gsap.fromTo(".fred", {x: 400, y: 200, opacity: 0, duration: 3}, 
    {x: 200, y: 100, opacity: 1, scale: 3}); /*
/* 0. Something interesting here is that while I put 3 seconds, it seems that 
the animation is practically instantaneous. I attribute that to the fact that I am 
asking it to move a very little distance and that `.fred` moves and grows at the 
same time, so instead of taking 3 seconds it seems to take the 500ms of the default...
I wonder if that is caused becaused the duration must be in the `to` vars object (
it doesn't make much sense to be on the `from` vars object, as I tell him that 
the start should take 3 seconds but by definition the start takes 0 seconds to start;
it is instantaneous).  */

/* gsap.fromTo(".fred", {x: 400, y: 200, opacity: 0, duration: 3}, 
    {x: 200, y: 100, opacity: 1, scale: 3, duration: 3}); */

/* 1. Yep, that was it! The duration in the from vars object is very useless in that
regard. What bothers me a bit is that while the tween is happening there seems to be
a shadow of `.fred` in the "end" (to vars object) position. I assume the reason for
this is that under the hood, the animation eliminates one frame of fred while it 
moves drawing the next one, but as in the end position it is static, it goes gradually
from opacity 0 to opacity one, showing the effect that there is a transparent fred in
the background... What is interesting is that this shadow only appears when my 
screen is about half of the 1080 p I have. */
/* 2. When I open the Chrome Dev tools however it surprises me to see that before
the translate, opacity and scale attributes are being changed, there is 
`transform: none;` and `rotate:none` in the in-line styling. Why does GSAP include
those explicitly? I imagine that under the hood without those explicit attributes
the tween would rotate or do something else without being told to do so. Lets
try with other properties, particularly as I don't know them. */

/*
gsap.fromTo(".fred", 
{x: 400, y: 200, opacity: 0, duration: 3, borderRadius: 0, backgroundColor: "blue",
    skewX: 0, skewY: 50, top: 50
},

{x: 200, y: 100, opacity: 1, scale: 3, duration: 3, borderRadius:20, backgroundColor: "yellow",
    skewX: 0, skewY: 0, top: 0
}); /*
/* 3. As this is a static image, `boderRadius` doesn't seem to do much.  */
/* 4. The borderRadius did work! Is just that it changed the box in which `.fred` is
located. As it is a png without background, it is not until I put the backgroundColor
property that I saw the borders. Also, going from one color to the other seems to be
something that is akin to gradients. */
/* 5. I can't quite grasp what skewX does, as while I put it to 50 it seems as it the
top pixels of the image moved to the left (why not to the right? As that is where
the positive numbers lie in GSAP) and the browser simply connected the lines forming
a trapezoid.  */
/* 6. skewY seems to do the same but in the pixels of the right instead of the top */
/* 7. When I add `top` even thought the position of `.fred` is relative nothing seems
to happen in the tween. My suspicion is that the x and y coordinates are overriding
the behavior of top, as for what I recall top says how many pixels is the block from
the top of the image. Lets test that out.  */
/* gsap.fromTo(".fred", {top: 100, left: 100, color:"blue"}, 
    {top: 10, left: 10, duration: 3, color:"red"}) /*
/* 8. Indeed now that I have only top I do see how it gradually moves upwards. I
wonder where I would prefer to choose top and left over x and y. Also, I think I 
now see why people often talk only about top and left: as the screen is 2D you only
need two directions to move wherever you want; right and bottom are just the opposite
of top and left. */
/* 9. It seems that color would only be able to penetrate .fred if it was a SVG
with astro.props.  */
/* 10. While I might getting ahead of myself I would really like to know how I could
create a tween that simulated a curve, as for now everything seems to follow a 
straight line... I think I might be able to create a function that generates numbers
(like a parabolla) and pass those values one by one to GSAP in order to have 
my tweens move in curves. I also wonder if the concept of Berznier curves could have
something to do in here. */
/* gsap.fromTo(".fred", {rotationX: 0, rotationY: 0, rotation:0}, 
    {rotationX: 180, rotationY:180, rotation: 0, duration: 3})  /*
/* 11. Damn, the effect of rotationX is sick! What I don't understand is why 200
is completely inversed... could it be that kind of CSS property that does the same
thing up to when the number gets large enough? It might: when I put rotationX to
150 I practically have the same inverted image, in 180 it looks completely inverted
and with 360 it seems it does a backflip. I think it is safe those numbers are actually
degrees. */
/* 12. With rotationY: 180 I get a mirror image. As These rotation work around
the axis, I think it safe to assume that simply `rotation` will be moving the
image with the center of the block that contains it as the axis of revolution. Indeed
it is! rotation: 180 gets to the same result that rotationX: 180 and rotationY: 180
but following a different path. */
/* gsap.fromTo(".fred", {scaleX: 0, scaleY: 0, scale:0}, 
    {scaleX: 0, scaleY:0, scale: 2, duration: 3}) /*
/* 13. When I simply do scaleX the image seems to blink as I recharge the browser, it
is not until I move scaleY too that I see the actual scaling that is normally seen
with `scale` alone. I think scaleX and scaleY are simply ways to be more specific about
which number we want to multiply the height or width to in order to expand the image
in any of the given axis, therefore I assume whatever number you give to scale
it gives the same value to X and Y... That is odd, when I put the other scales (X, Y)
to zero, but scale normally with 2 the image simply doesn't appear. `.fred` just
appears in a blink but then dissappears, when I look for him with the Dev Tools
he is nowhere to be seen. I image the reason could be that I am passing way too many
scales at the same time and the browser is confused (even though they're all to 
zero). */
gsap.fromTo(".fred", {scale:0}, 
    {scale: 2, duration: 3}) 
/* 14. Indeed now that I just used scale alone I see `.fred` appear out of nowhere
to gradually increase its size. I now see why scale benefits from the GPU! As I 
recall of the classes of Jose Luis Aragon a scale is simply multiplyng all the values
of a matrix by a scalar (am I right?) Besides the dot product and matrix multiplication
what other operations can the GPU do related to linear algebra? Which of those are
applicable to CSS and why? Does these need a specified GPU or even laptops without
it can run it? (I don't know if there are modern laptops without GPU, but I know 
some seem to have 500 Mb or so, which seems very little for anything that it is not
rendering graphics). */

// NOTES OF THIS FOLDER `03_from_fromTo` ALREADY TAKEN AND IN doubts.md