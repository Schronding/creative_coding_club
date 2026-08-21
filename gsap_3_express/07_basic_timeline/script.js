// Register plugin globally
gsap.registerPlugin(ScrollTrigger);

console.log("GSAP Sandbox Ready: 07_basic_timeline");

gsap.timeline()
/*1. In terms of the actual effect
being shown it indeed looks like 
`autoAlpha` serves as a way to 
introduce blinking to the animation. */
    .from("#demo", {autoAlpha: 0})
/*0. I assume alpha has to do something with opacity, as I
think there was something in CSS that was used in order to 
dissipate the colors in RGB format.  */
    .from("#title", {opacity: 0, scale: 0, ease: "back"})
/*2. The effect of the title looks 
quite well even though it is very 
simple. It appears and grows
simultaneously. */
    .from("#freds img", {y:160, stagger:0.1, duration:0.8, ease:"back"})
/*3. The animation above seems to simply
describe each of the freds coming from
below, going a little bit beyond their
final point before returning to it, 
in order from left to right. Indeed it
happened that way, but I thought each 
fred would have finished settling into their
position before the next one even started
moving. I think that the mismatch between
what I thought would happen and what actually
happened is that we are using `stagger` 
instead of `delay`. */
  .from("#time", {xPercent:100, duration:0.2})
/*4. In this I think the `#time` box 
will come out of the visible screen
and set up in its correct position
very quickly. Indeed that is what 
happens! I find it important to note
that while every value above 100 in
`xPercent` would work, I imagine that 
visually I would get something faster 
than the actual `duration:0.2` as the 
distance increased but the time 
remained the same. */

