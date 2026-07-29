// Register plugin globally
gsap.registerPlugin(ScrollTrigger);

console.log("GSAP Sandbox Ready: 05_stagger");

//add code to experiment with stagger object
/*1. For what I see all practically all special properties and attributes
of GSAP that are configurable work with objects, so I think it is fairly
safe to do it this way.  */
// let staggerVar = {
//     each: 0.5,
//     from: "center"
// };
/*14. It is interesting to note that even when I rewrite the `staggerVar` 
completely afterwards, the animation breaks. I don't understand why though, as
it shouldn't matter if I don't comment the `staggerVar` definition above, JS
should use the last declaration that precedes the `gsap.to()` method. Could it
because `staggerVar` is an object and JS tries to force some strange merge? */
/*0. While I have seen that many people like to create nested objects and
functions in JavaScript I find that I get confused quite often with the
hierarchy of operations. As there are many parentheses and curly braces 
I find it very difficult to notice what goes into which part, so for now
I will separate the variable to have perfect clarity about what I am doing. */

let staggerVar = {
    /*12. For what I understand `amount` distributes the time evenly, so it 
    seems pretty straightforward, as it doesn't matter if the elements are even
    or uneven, it performs a simple division. What I wonder is how precise it
    is though: does it round up? round down? uses decimals? if then how many
    decimals it uses? (I imagine the equivalent to a float in c; 8 bits destined
    for both the whole and decimal numbers).  */
    amount: 2,
    /*7. It seems I cannot, as GSAP seems to ignore the second argument after
    it has find a match... but it does though? In this case it could instruct
    the first option for the first element and the second option for the 
    second element and it would nonetheless look the same. Lets add back some
    freds to see how it behaves. */
    /*10. It is also important to note that it seems to be a very sensitive 
    attribute, as when I writ `from: "end "` that space makes so it goes again
    in (1, 2, 3) order. What I wonder though is if the default movement of 
    going from left to right it is called `start` or `left`. The former is my 
    personal bet. */
    from: "end"
    /*9. My theory of the default replacing takes strength, as now the order
    should have been (with `from: "end edge"`): (3, 1, 2)... but it is still
    (1, 2, 3). */
    /*6. How interesting! `edge` seems to be complementary of `center`, as now
    it is the left one (the element that is defined first in the HTML) the one
    that goes first. Can I not combine multiple `from`? For example 
    `from: "edge end"` in order to make the right one go first? */
};

gsap.to("#freds img", {y:-50, stagger:staggerVar});

let sndStaggerVar = {
    amount: 3, 
    
};
