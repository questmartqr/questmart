function copyPromoCode() {

    const code = document.getElementById("promoCode").innerText;
    const message = document.getElementById("copyMessage");

    navigator.clipboard.writeText(code)
        .then(function () {

            message.style.display = "block";

            setTimeout(function () {
                message.style.display = "none";
            }, 1800);

        })
        .catch(function () {

            alert("Promo Code: " + code);

        });
}


// =========================
// PRODUCT IMAGE SLIDER
// =========================

const productImages = Array.from(
    document.querySelectorAll(".zoomable-product")
);

let currentProductImage = 0;

const viewer =
    document.getElementById("productImageViewer");

const largeImage =
    document.getElementById("largeProductImage");

const nextImage =
    document.getElementById("nextProductImage");


// =========================
// OPEN IMAGE
// =========================

function openProductImage(image) {

    currentProductImage =
        productImages.indexOf(image);

    largeImage.src = image.src;
    largeImage.alt = image.alt;

    loadNextImage();

    largeImage.style.transform =
        "translate3d(0, 0, 0)";

    nextImage.style.transform =
        "translate3d(100%, 0, 0)";

    viewer.classList.add("show");

    document.body.style.overflow = "hidden";
}


// =========================
// LOAD NEXT IMAGE
// =========================

function loadNextImage() {

    let nextIndex =
        currentProductImage + 1;

    if (nextIndex >= productImages.length) {
        nextIndex = 0;
    }

    nextImage.src =
        productImages[nextIndex].src;

    nextImage.alt =
        productImages[nextIndex].alt;
}


// =========================
// LOAD PREVIOUS IMAGE
// =========================

function loadPreviousImage() {

    let previousIndex =
        currentProductImage - 1;

    if (previousIndex < 0) {
        previousIndex =
            productImages.length - 1;
    }

    nextImage.src =
        productImages[previousIndex].src;

    nextImage.alt =
        productImages[previousIndex].alt;
}


// =========================
// NEXT IMAGE
// =========================

function nextProductImage(event) {

    if (event) {
        event.stopPropagation();
    }

    currentProductImage++;

    if (currentProductImage >= productImages.length) {
        currentProductImage = 0;
    }

    largeImage.src =
        productImages[currentProductImage].src;

    largeImage.alt =
        productImages[currentProductImage].alt;

    loadNextImage();

    largeImage.style.transform =
        "translate3d(0, 0, 0)";

    nextImage.style.transform =
        "translate3d(100%, 0, 0)";
}


// =========================
// PREVIOUS IMAGE
// =========================

function previousProductImage(event) {

    if (event) {
        event.stopPropagation();
    }

    currentProductImage--;

    if (currentProductImage < 0) {
        currentProductImage =
            productImages.length - 1;
    }

    largeImage.src =
        productImages[currentProductImage].src;

    largeImage.alt =
        productImages[currentProductImage].alt;

    loadNextImage();

    largeImage.style.transform =
        "translate3d(0, 0, 0)";

    nextImage.style.transform =
        "translate3d(100%, 0, 0)";
}


// =========================
// CLOSE IMAGE
// =========================

function closeProductImage(event) {

    if (event) {
        event.stopPropagation();
    }

    viewer.classList.remove("show");

    document.body.style.overflow = "";

    largeImage.style.transform =
        "translate3d(0, 0, 0)";

    nextImage.style.transform =
        "translate3d(100%, 0, 0)";
}


// =========================
// LIVE MOBILE SWIPE
// =========================

let touchStartX = 0;
let touchCurrentX = 0;
let isDragging = false;


// =========================
// TOUCH START
// =========================

viewer.addEventListener(
    "touchstart",
    function(event) {

        if (event.touches.length !== 1) {
            return;
        }

        touchStartX =
            event.touches[0].clientX;

        touchCurrentX =
            touchStartX;

        isDragging = true;

        largeImage.style.transition =
            "none";

        nextImage.style.transition =
            "none";

    },
    { passive: true }
);


// =========================
// TOUCH MOVE
// =========================

viewer.addEventListener(
    "touchmove",
    function(event) {

        if (!isDragging) {
            return;
        }

        if (event.touches.length !== 1) {
            return;
        }

        touchCurrentX =
            event.touches[0].clientX;

        const distance =
            touchCurrentX - touchStartX;


        // =====================
        // IMAGE GAP
        // =====================

        const imageGap = 10;


        // =====================
        // SWIPE LEFT
        // =====================

        if (distance < 0) {

            /*
             * Current image moves LEFT
             *
             * Next image comes from RIGHT
             *
             * 10px gap remains between them
             */

            largeImage.style.transform =
                `translate3d(${distance}px, 0, 0)`;

            nextImage.style.transform =
                `translate3d(calc(100% + ${distance}px + ${imageGap}px), 0, 0)`;
        }


        // =====================
        // SWIPE RIGHT
        // =====================

        else {

            /*
             * Current image moves RIGHT
             *
             * Previous image comes from LEFT
             *
             * 10px gap remains between them
             */

            let previousIndex =
                currentProductImage - 1;

            if (previousIndex < 0) {
                previousIndex =
                    productImages.length - 1;
            }


            // Load previous image

            if (
                nextImage.src !==
                productImages[previousIndex].src
            ) {

                nextImage.src =
                    productImages[previousIndex].src;

                nextImage.alt =
                    productImages[previousIndex].alt;
            }


            // Move current image RIGHT

            largeImage.style.transform =
                `translate3d(${distance}px, 0, 0)`;


            // Move previous image from LEFT
            // with 10px gap

            nextImage.style.transform =
                `translate3d(calc(-100% + ${distance}px - ${imageGap}px), 0, 0)`;
        }

    },
    { passive: true }
);


// =========================
// TOUCH END
// =========================

viewer.addEventListener(
    "touchend",
    function() {

        if (!isDragging) {
            return;
        }

        isDragging = false;

        const distance =
            touchCurrentX - touchStartX;

        const threshold = 70;


        // =====================
        // SWIPE LEFT → NEXT
        // =====================

        if (distance < -threshold) {

            largeImage.style.transition =
                "transform 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)";

            nextImage.style.transition =
                "transform 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)";

            largeImage.style.transform =
                "translate3d(-100%, 0, 0)";

            nextImage.style.transform =
                "translate3d(0, 0, 0)";


            setTimeout(function() {

                currentProductImage++;

                if (
                    currentProductImage >=
                    productImages.length
                ) {
                    currentProductImage = 0;
                }

                largeImage.src =
                    productImages[currentProductImage].src;

                largeImage.alt =
                    productImages[currentProductImage].alt;

                largeImage.style.transition =
                    "none";

                nextImage.style.transition =
                    "none";

                largeImage.style.transform =
                    "translate3d(0, 0, 0)";

                nextImage.style.transform =
                    "translate3d(100%, 0, 0)";

                loadNextImage();

            }, 280);

        }


        // =====================
        // SWIPE RIGHT → PREVIOUS
        // =====================

        else if (distance > threshold) {

            largeImage.style.transition =
                "transform 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)";

            nextImage.style.transition =
                "transform 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)";

            largeImage.style.transform =
                "translate3d(100%, 0, 0)";

            nextImage.style.transform =
                "translate3d(0, 0, 0)";


            setTimeout(function() {

                currentProductImage--;

                if (currentProductImage < 0) {
                    currentProductImage =
                        productImages.length - 1;
                }

                largeImage.src =
                    productImages[currentProductImage].src;

                largeImage.alt =
                    productImages[currentProductImage].alt;

                largeImage.style.transition =
                    "none";

                nextImage.style.transition =
                    "none";

                largeImage.style.transform =
                    "translate3d(0, 0, 0)";

                nextImage.style.transform =
                    "translate3d(100%, 0, 0)";

                loadNextImage();

            }, 280);

        }


        // =====================
        // SMALL SWIPE → RETURN
        // =====================

        else {

            largeImage.style.transition =
                "transform 0.25s ease-out";

            nextImage.style.transition =
                "transform 0.25s ease-out";

            largeImage.style.transform =
                "translate3d(0, 0, 0)";

            nextImage.style.transform =
                "translate3d(100%, 0, 0)";
        }

    },
    { passive: true }
);


// =========================
// TOUCH CANCEL
// =========================

viewer.addEventListener(
    "touchcancel",
    function() {

        isDragging = false;

        largeImage.style.transition =
            "transform 0.25s ease-out";

        nextImage.style.transition =
            "transform 0.25s ease-out";

        largeImage.style.transform =
            "translate3d(0, 0, 0)";

        nextImage.style.transform =
            "translate3d(100%, 0, 0)";
    },
    { passive: true }
);