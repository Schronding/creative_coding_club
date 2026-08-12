// Register plugin globally
gsap.registerPlugin(ScrollTrigger);

console.log("GSAP Sandbox Ready: 06_bug_challenge");

const button = document.querySelector(".button")
const bg = document.querySelector(".bg")


// const hover_tween = gsap.from(bg, {scale:0, duration:1, ease:"circ"});
button.addEventListener("mouseenter", function(){
    /*2. Indeed now it doesn't matter how quickly I return to hover the button, the 
    animation always grows at full size unless interrupted by the `mouseenter` 
    directive (I don't know if directive is the proper way to name that, please instruct
    me). Also I assume the difference between `mouseenter` and `hover` is that the 
    former is a trigger that executes each time the mouse enters a certain area and
    only triggers again when it goes outside and inside once again, while `hover` is
    something that triggers once and continues to trigger as long as the mouse is in there.
    While `hover` doesn't sound performative, I would like to know if that is actually
    the way it is implemented (for me it would make sense that `hover` would also
    turn on once it is over the area and not turn off until it has got out, but that
    would leave it as practically the same as `mouseenter`).  */
    hover_tween.restart();
    /*0. How interesting that indeed the ease `circ` is being used to fill a circle. */
	/*1. 
    gsap.from(bg, {scale:0, duration:1, ease:"circ"})
    What I notice is that the size of the small circle that grows depends on which
    state it was before I return the mouse to hover again. This makes me think that 
    when I hover GSAP believes that limited state was the whole, so the animation 
    continues until it grows to that new false state. This should be easily solvable
    by using the `repeat()` method, as I believe it is a much cleaner way to work on
    this problem. */
})


/*4. Indeed the problem is that `from()` animates from the known values, but when you
go over quickly you change the final scale of the tween (or rather, the newly created
tween has a different final scale than the previous one) so `from()` correctly animates
up to that state. Another way to solve the problem is by using `fromTo()` as then you
can explicitly specify what is the specific beginning and final states you want to 
be in. In code the instruction would be: 
*/
button.addEventListener("mouseenter", function(){
    /*6. I have a doubt. In `fromTo()` it doesn't matter where I put the ease? I
    assume it does not, as the transition is one-sided: it goes from the start, to
    the end. */
    /*7.
    gsap.fromTo(".bg", {scale: 0}, {scale: 1, duration: 2, ease:"elastic"})
    I used `ease:elastic` as it is the one that is one of the most obvious to see.
    Indeed it works when I put `ease` in the "to vars object" but lets see what happens
    when I put in in the "from vars object" */
    /*8. 
    gsap.fromTo(".bg", {scale: 0, ease:"elastic"}, {scale: 1, duration: 2})
    It does not work the same! It is as if it just grew slowly. I imagine this might
    be the equivalent of `ease:elastic.in` (if it even exists). Lets test it.   */
    /*9.
    gsap.fromTo(".bg", {scale: 0}, {scale: 1, duration: 2, ease:"elastic.in"})
     I thought it didn't exist but it does! Yet it looks nothing like 
    `gsap.fromTo(".bg", {scale: 0, ease:"elastic"}, {scale: 1, duration: 2})`
    This makes me think that when you put an ease in the "from vars object" GSAP just
    gets confused and defaults it to `ease:linear`. 
    */
    gsap.fromTo(".bg", {scale: 0, ease:"elastic"}, {scale: 1, duration: 2})
    gsap.fromTo(".bg", {scale: 0}, {scale: 1, duration: 2, ease:"linear"})

    /*11. At least on my eyes they look identical, but if they are they should have
    the same values throughout the whole process. I could check it with a for loop
    that compares arrays, but as this hover effect is growing radially I don't know how would
    I use the `gsap.getProperty()` method. I tried with chrome web dev tools and I 
    don't know if it was because I was in responsive, but I tried to use my mouse normally
    and instead I have a strange gray concentric circle instead of the mouse. */
})
/* 5. Indeed it works. No matter how quickly you go out and return the animation always
plays all the way through the end. However as we are creating a different tween each
time the mouse goes in and out of the circle I imagine this version performs worse. */