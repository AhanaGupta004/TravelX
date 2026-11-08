/*=========================================
            TRAVELX SCRIPT
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initProgressBar();

    initNavbar();

    initBackToTop();

    initDarkMode();

    initCountdown();

    initCounters();

    initTravelDates();

    initWishlist();

    initDestinationModal();

    initBookingForm();

    initGallery();

    initSearch();

    initContactForm();

    initNewsletter();

});


/*=========================================
            PAGE LOADER
=========================================*/

function initLoader(){

    const loader=document.getElementById("loader");

    if(!loader) return;

    window.addEventListener("load",()=>{

        loader.style.opacity="0";

        setTimeout(()=>{

            loader.style.display="none";

        },500);

    });

}


/*=========================================
        PROGRESS BAR
=========================================*/

function initProgressBar(){

    const progress=document.getElementById("progressBar");

    if(!progress) return;

    window.addEventListener("scroll",()=>{

        const total=document.documentElement.scrollHeight-window.innerHeight;

        const value=(window.scrollY/total)*100;

        progress.style.width=value+"%";

    });

}


/*=========================================
            NAVBAR
=========================================*/

function initNavbar(){

    const navbar=document.querySelector(".custom-navbar");

    if(!navbar) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>60){

            navbar.classList.add("scrolled");

        }

        else{

            navbar.classList.remove("scrolled");

        }

    });

}


/*=========================================
        BACK TO TOP
=========================================*/

function initBackToTop(){

    const btn=document.getElementById("topBtn");

    if(!btn) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            btn.classList.add("show");

        }

        else{

            btn.classList.remove("show");

        }

    });

    btn.onclick=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

}


/*=========================================
            DARK MODE
=========================================*/

function initDarkMode(){

    const toggle=document.getElementById("themeToggle");

    if(!toggle) return;

    const icon=toggle.querySelector("i");

    if(localStorage.getItem("theme")==="dark"){

        document.body.classList.add("dark");

        icon.classList.replace("fa-moon","fa-sun");

    }

    toggle.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

            icon.classList.replace("fa-moon","fa-sun");

        }

        else{

            localStorage.setItem("theme","light");

            icon.classList.replace("fa-sun","fa-moon");

        }

    });

}


/*=========================================
        COUNTDOWN TIMER
=========================================*/

function initCountdown(){

    const days=document.getElementById("days");

    if(!days) return;

    const target=new Date();

    target.setDate(target.getDate()+10);

    function update(){

        const now=new Date();

        const diff=target-now;

        if(diff<=0) return;

        document.getElementById("days").textContent=Math.floor(diff/(1000*60*60*24));

        document.getElementById("hours").textContent=Math.floor((diff/(1000*60*60))%24);

        document.getElementById("minutes").textContent=Math.floor((diff/(1000*60))%60);

        document.getElementById("seconds").textContent=Math.floor((diff/1000)%60);

    }

    update();

    setInterval(update,1000);

}


/*=========================================
        COUNTER
=========================================*/

function initCounters(){

    const counters=document.querySelectorAll(".counter");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const counter=entry.target;

            const target=+counter.dataset.target;

            let count=0;

            const step=target/120;

            function update(){

                count+=step;

                if(count<target){

                    counter.textContent=Math.ceil(count);

                    requestAnimationFrame(update);

                }

                else{

                    counter.textContent=target.toLocaleString()+"+";

                }

            }

            update();

            observer.unobserve(counter);

        });

    },{

        threshold:.5

    });

    counters.forEach(counter=>observer.observe(counter));

}

/*=========================================
        TRAVEL DATE VALIDATION
=========================================*/

function initTravelDates(){

    const checkIn=document.getElementById("checkIn");

    const checkOut=document.getElementById("checkOut");

    if(!checkIn || !checkOut) return;

    const today=new Date().toISOString().split("T")[0];

    checkIn.min=today;

    checkOut.min=today;

    checkIn.addEventListener("change",()=>{

        checkOut.min=checkIn.value;

        if(checkOut.value<checkIn.value){

            checkOut.value="";

        }

    });

}


/*=========================================
            WISHLIST
=========================================*/

function initWishlist(){

    const buttons=document.querySelectorAll(".wishlist-btn");

    let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];

    buttons.forEach(button=>{

        const name=button.dataset.name;

        if(wishlist.includes(name)){

            button.classList.add("active");

            button.innerHTML='<i class="fa-solid fa-heart"></i>';

        }

        button.addEventListener("click",()=>{

            if(wishlist.includes(name)){

                wishlist=wishlist.filter(item=>item!==name);

                button.classList.remove("active");

                button.innerHTML='<i class="fa-regular fa-heart"></i>';

            }

            else{

                wishlist.push(name);

                button.classList.add("active");

                button.innerHTML='<i class="fa-solid fa-heart"></i>';

            }

            localStorage.setItem(

                "wishlist",

                JSON.stringify(wishlist)

            );

        });

    });

}


/*=========================================
        DESTINATION SEARCH
=========================================*/

function initSearch(){

    const form=document.getElementById("travelSearchForm");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const keyword=document.getElementById("searchDestination")

        .value

        .trim()

        .toLowerCase();

        const cards=document.querySelectorAll(".destination-card");

        let found=false;

        cards.forEach(card=>{

            card.classList.remove("search-highlight");

            const destination=card.dataset.destination;

            const country=card.dataset.country;

            if(destination===keyword || country===keyword){

                found=true;

                card.classList.add("search-highlight");

                card.scrollIntoView({

                    behavior:"smooth",

                    block:"center"

                });

            }

        });

        if(!found){

            alert("Destination not found.");

        }

    });

}


/*=========================================
        DESTINATION MODAL
=========================================*/

function initDestinationModal(){

    const modalElement=document.getElementById("destinationModal");

    if(!modalElement) return;

    const modal=new bootstrap.Modal(modalElement);

    document.querySelectorAll(".exploreBtn")

    .forEach(button=>{

        button.addEventListener("click",()=>{

            document.getElementById("destinationTitle")

            .textContent=button.dataset.name;

            document.getElementById("destinationCountry")

            .textContent=button.dataset.country;

            document.getElementById("destinationPrice")

            .textContent=button.dataset.price;

            document.getElementById("destinationDays")

            .textContent=button.dataset.days;

            document.getElementById("destinationImage")

            .src=button.dataset.image;

            modal.show();

        });

    });

}


/*=========================================
        BOOKING FORM
=========================================*/

function initBookingForm(){

    const form=document.getElementById("bookingForm");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        alert("🎉 Booking Submitted Successfully!");

        form.reset();

        bootstrap.Modal.getInstance(

            document.getElementById("bookingModal")

        ).hide();

    });

}


/*=========================================
        GALLERY LIGHTBOX
=========================================*/

function initGallery(){

    const gallery=document.querySelectorAll(".gallery-item img");

    if(gallery.length===0) return;

    const lightbox=document.createElement("div");

    lightbox.className="lightbox";

    lightbox.innerHTML=`

        <span class="lightbox-close">&times;</span>

        <img src="" alt="">

    `;

    document.body.appendChild(lightbox);

    const image=lightbox.querySelector("img");

    gallery.forEach(img=>{

        img.addEventListener("click",()=>{

            lightbox.classList.add("active");

            image.src=img.src;

        });

    });

    lightbox.addEventListener("click",()=>{

        lightbox.classList.remove("active");

    });

}


/*=========================================
        CONTACT FORM
=========================================*/

function initContactForm(){

    const form=document.getElementById("contactForm");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        alert("Message Sent Successfully!");

        form.reset();

    });

}


/*=========================================
        NEWSLETTER
=========================================*/

function initNewsletter(){

    const form=document.getElementById("newsletterForm");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        alert("Thanks for subscribing!");

        form.reset();

    });

}


/*=========================================
        ACTIVE NAVBAR
=========================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-link");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        if(scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});
