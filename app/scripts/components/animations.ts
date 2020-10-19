import { gsap } from "gsap";
//import Draggable from 'gsap/Draggable';
// import { PixiPlugin } from "gsap/PixiPlugin.js";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

//without this line, PixiPlugin and MotionPathPlugin may get dropped by your bundler (tree shaking)...
//gsap.registerPlugin(Draggable); //,PixiPlugin, MotionPathPlugin

export function runAnimations() {

    let tweenBball1 = gsap.to(".basketballImg1",
        {
            duration: 3,
            x: document.querySelector<HTMLElement>('.svg-container').offsetWidth,
            backgroundColor: "coral",
            borderRadius: "20%",
            border: "3px solid black",
            ease: "power3.out",
            paused: true,                              // if true, the animation will pause itself immediately upon creation
            clearProps: "x,backgroundColor,border"     // clear from the element’s style property when the tween completes
        }
    );
    document.querySelector<HTMLInputElement>('#action_bball1').onclick = () => tweenBball1.restart();

    /*
     *  Opacity, Y, and Stagger 
     *    using stagger to perform opacity and y (translateY) at an interval throughout the duration
     */
    let tweenCircles1 = gsap.from("#circles1 .circle", {
        duration: 2,
        alpha: 0,
        //y: () => Math.random() * 400 - 200,       // if no helper function available, a direct function can be used!
        y: "random(-200, 200, 10)",
        stagger: 0.5,
        ease: "steps (5)"
    });

    document.querySelector<HTMLInputElement>('#action_circles1_play').onclick = () => {
        tweenCircles1.play(0);
    }
    document.querySelector<HTMLInputElement>('#action_circles1_pause').onclick = () => tweenCircles1.pause();
    document.querySelector<HTMLInputElement>('#action_circles1_seek').onclick = () => tweenCircles1.seek(1.5);
    document.querySelector<HTMLInputElement>('#action_circles1_progress').onclick = () => tweenCircles1.progress(0.2);
    document.querySelector<HTMLInputElement>('#action_circles1_reverse').onclick = () => tweenCircles1.reverse();
    document.querySelector<HTMLInputElement>('#action_circles1_timeScale1').onclick = () => tweenCircles1.timeScale(4);
    document.querySelector<HTMLInputElement>('#action_circles1_timeScale2').onclick = () => tweenCircles1.timeScale(0.2);

    /*
     *  ROTATION 
     *    rotation around a transform-origin
     *    tween object is stored as variable to access restart() method
     */
    let tweenRotate1 = gsap.to(".dogSVG1, .basketballImg2", {
        duration: 2,
        rotation: 360,
        ease: "power3.in",
        paused: true
    });
    gsap.set(".dogSVG1, .basketballImg2", { transformOrigin: "50% 50%" });
    document.getElementById('action_rotate').addEventListener("click", () => {
        tweenRotate1.restart();
    });

    /*
     *  SCALE 
     *    scale the icons from smaller and zero opacity in a stagger
     */
    let scaleAnimation1 = gsap.to(".dogSVG1, .basketballImg2", {
        duration: 1.5,
        scale: 2,
        stagger: 0.75
    }).reverse();
    document.getElementById('action_scale').addEventListener("click", () => {
        if (scaleAnimation1.reversed()) {
            scaleAnimation1.play();
        } else {
            scaleAnimation1.reverse();
        }
    });

    /*
     *  ROTATION
     *    with yoyo and rotation targeting specific svg group
     *    repeat of -1 is used to run infinitely
     */
    gsap.set(".seesaw", { rotation: -30, transformOrigin: "50% 50%" });
    gsap.to(".seesaw", {
        duration: 4,
        rotation: 30,
        ease: "back.inOut(1)",
        yoyo: true,
        repeat: -1
    });

    /*
     *  Timeline 1
     *    simple timeline on multiple tweens with timeline label
     */
    var tl1 = gsap.timeline({ paused: true });
    tl1.from(".basketballImg3", { duration: 1.5, opacity: 0, scale: 0.3, ease: "back" });
    tl1.to(".basketballImg3", { duration: 1, rotation: 360 }, "<.5");
    tl1.from("#circles2 .circle", { duration: 1, opacity: 0, y: 150, stagger: 0.25 });
    tl1.addLabel("circlesOutro", "+=1");
    tl1.to("#circles2 .circle", { duration: 0.5, opacity: 0, x: 300, ease: "power3.out" }, "circlesOutro");
    tl1.to(".basketballImg3", { duration: 0.5, opacity: 0, x: -300, ease: "power3.out" }, "circlesOutro");
    document.querySelector<HTMLInputElement>("#action_timeline1").onclick = () => {
        tl1.restart();
    }

    /*
     *  Timeline 2
     *    easing through rainbow colors
     *    --rainbowColor is a CSS var() stored within the html node that is then accessed in other DOM node styles
     */
    document.querySelector<HTMLInputElement>("#action_rainbow1").onclick = (event) => {
        let tl2 = gsap.timeline({ paused: true, repeat: -1 });
        let colors = ["#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#2E2B5F", "#8B00FF"];
        for (let i = 0; i < colors.length; i++) {
            let color = colors[i];
            tl2.to("html", { "--rainbowColor": color, duration: 2 });
        }
        let btnEl = event.currentTarget as HTMLInputElement;
        btnEl.disabled = true;
        btnEl.innerText = "rainbow activated";
        tl2.play();
    }

    let transform1Count = 0;
    let tl3 = gsap.timeline({ paused: true });
    //tl3
    document.getElementById("box_percent-transform1").onclick = (event) => {
        if (transform1Count > 5) { transform1Count = 0; }
    };
}

function restartTween(tween: GSAPTween) {
    tween.invalidate();
    tween.play(0);
}