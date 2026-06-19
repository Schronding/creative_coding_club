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

gsap.fromTo(".fred", 
{x: 400, y: 200, opacity: 0, duration: 3, borderRadius: 0, backgroundColor: "blue",
    skewX: 50, skewY: 0
},

{x: 200, y: 100, opacity: 1, scale: 3, duration: 3, borderRadius:20, backgroundColor: "yellow",
    skewX: 0, skewY: 50
});
/* 3. As this is a static image, `boderRadius` doesn't seem to do much.  */
/* 4. The borderRadius did work! Is just that it changed the box in which `.fred` is
located. As it is a png without background, it is not until I put the backgroundColor
property that I saw the borders. Also, going from one color to the other seems to be
something that is akin to gradients. */
/* 5. I can't quite grasp what skewX does, as while I put it to 50 it seems as it the
top pixels of the image moved to the left (why not to the right? As that is where
the positive numbers lie in GSAP) and the browser simply connected the lines forming
a trapezoid.  */