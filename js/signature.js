
document.addEventListener("DOMContentLoaded", () => {

    const signature =
        document.getElementById("curioraSignature");

    if (!signature) {
        console.error("Curiora Signature not found.");
        return;
    }

    const glass =
        signature.querySelector(".signature-glass");

    if (!glass) {
        console.error("Curiora Glass not found.");
        return;
    }

    const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        return;
    }

    signature.addEventListener("pointermove", (event) => {

        const rect =
            signature.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const percentX =
            (x / rect.width) * 100;

        const percentY =
            (y / rect.height) * 100;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateY =
            ((x - centerX) / centerX) * 8;

        const rotateX =
            ((centerY - y) / centerY) * 6;


        glass.style.setProperty(
            "--mouse-x",
            `${percentX}%`
        );

        glass.style.setProperty(
            "--mouse-y",
            `${percentY}%`
        );


        glass.style.transform =
            `perspective(700px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(8px)`;
    });


    signature.addEventListener("pointerleave", () => {

        glass.style.setProperty(
            "--mouse-x",
            "50%"
        );

        glass.style.setProperty(
            "--mouse-y",
            "50%"
        );

        glass.style.transform =
            "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)";

    });
});