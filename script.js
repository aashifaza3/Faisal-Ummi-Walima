let selectedAttendance = "";
let formSubmitted = false;


const openingScreen =
    document.getElementById("openingScreen");

const openingContent =
    document.getElementById("openingContent");

const invitation =
    document.getElementById("invitation");

const openInvitation =
    document.getElementById("openInvitation");

const music =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");


// =====================================
// OPEN INVITATION
// =====================================

openInvitation.addEventListener(
    "click",
    async function () {


        openingScreen.classList.add("open");


        openingContent.style.opacity =
            "0";


        openingContent.style.transform =
            "scale(.9)";


        try {

            music.volume = .35;

            await music.play();

            musicButton.classList.add(
                "playing"
            );

        } catch (error) {

            console.log(
                "Music did not autoplay.",
                error
            );

        }


        setTimeout(function () {


            openingScreen.style.display =
                "none";


            invitation.style.display =
                "block";


            musicButton.style.display =
                "block";


            window.scrollTo(0,0);


            checkReveal();


        }, 2100);


    }
);


// =====================================
// MUSIC
// =====================================

musicButton.addEventListener(
    "click",
    function () {


        if (music.paused) {

            music.play();

            musicButton.textContent =
                "♫";

            musicButton.classList.add(
                "playing"
            );

        } else {

            music.pause();

            musicButton.textContent =
                "♩";

            musicButton.classList.remove(
                "playing"
            );

        }

    }
);


// =====================================
// YES
// =====================================

document
    .getElementById("yesButton")
    .addEventListener(
        "click",
        function () {

            selectAttendance(
                "Yes, I'll Attend",
                this
            );

        }
    );


// =====================================
// NO
// =====================================

document
    .getElementById("noButton")
    .addEventListener(
        "click",
        function () {

            selectAttendance(
                "No, Unable to Attend",
                this
            );

        }
    );


// =====================================
// SELECT ATTENDANCE
// =====================================

function selectAttendance(
    answer,
    button
) {


    selectedAttendance =
        answer;


    document
        .querySelectorAll(
            ".attendance"
        )
        .forEach(function(item) {

            item.style.outline =
                "none";

        });


    button.style.outline =
        "4px solid rgba(255,255,255,.7)";


    document
        .getElementById(
            "selectedResponse"
        )
        .textContent =
        "Your response: " +
        answer;


    const guestForm =
        document.getElementById(
            "guestForm"
        );


    guestForm.classList.add(
        "show"
    );


    setTimeout(function () {


        guestForm.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });


    },150);


}


// =====================================
// GOOGLE FORM
// =====================================

const googleForm =
    document.getElementById(
        "googleRSVPForm"
    );

const googleAttendance =
    document.getElementById(
        "googleAttendance"
    );


googleForm.addEventListener(
    "submit",
    function(event) {


        if (!selectedAttendance) {

            event.preventDefault();

            alert(
                "Please select YES or NO."
            );

            return;

        }


        const fullName =
            document
                .getElementById(
                    "fullName"
                )
                .value
                .trim();


        const fatherName =
            document
                .getElementById(
                    "fatherName"
                )
                .value
                .trim();


        if (!fullName) {

            event.preventDefault();

            alert(
                "Please enter your full name."
            );

            return;

        }


        if (!fatherName) {

            event.preventDefault();

            alert(
                "Please enter your father's name."
            );

            return;

        }


        googleAttendance.value =
            selectedAttendance;


        formSubmitted = true;


        const button =
            document.getElementById(
                "submitRSVP"
            );


        button.disabled = true;

        button.textContent =
            "SENDING...";


    }
);


// =====================================
// GOOGLE FORM COMPLETE
// =====================================

document
    .getElementById(
        "hidden_iframe"
    )
    .addEventListener(
        "load",
        function () {


            if (!formSubmitted) {

                return;

            }


            document
                .getElementById(
                    "guestForm"
                )
                .style.display =
                "none";


            document
                .getElementById(
                    "attendanceButtons"
                )
                .style.display =
                "none";


            const thankYou =
                document.getElementById(
                    "thankYou"
                );


            thankYou.classList.add(
                "show"
            );


            thankYou.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });


            formSubmitted = false;


        }
    );


// =====================================
// SCROLL REVEAL
// =====================================

function checkReveal() {


    document
        .querySelectorAll(
            ".reveal"
        )
        .forEach(function(element) {


            const top =
                element
                    .getBoundingClientRect()
                    .top;


            if (
                top <
                window.innerHeight - 60
            ) {

                element
                    .classList
                    .add(
                        "visible"
                    );

            }


        });


}


window.addEventListener(
    "scroll",
    checkReveal
);


window.addEventListener(
    "resize",
    checkReveal
);