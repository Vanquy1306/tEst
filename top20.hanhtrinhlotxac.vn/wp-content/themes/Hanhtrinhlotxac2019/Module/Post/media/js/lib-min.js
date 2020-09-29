function onScroll() {
    const e = document.querySelectorAll(".menu a");
    let t = document.documentElement.scrollTop,
        l = document.querySelectorAll(".temp"),
        o = 0;
    l.forEach((function (l) {
        let c = l.offsetTop - 70,
            n = document.querySelectorAll(".menu a.active");
        c <= t && (n[0].classList.remove("active"), e[o].classList.add("active")), o < e.length - 1 && o++
    }))
}
var Accordion = function (e) {
        var t = "string" == typeof e.element ? document.getElementById(e.element) : e.element,
            l = e.openTab,
            o = e.oneOpen || !1;

        function c(e) {
            var l, c; - 1 !== e.target.className.indexOf("accordion-title") && (o ? (n(), [].forEach.call(t.querySelectorAll(".accordion-title"), (function (e) {
                e.classList.remove("active")
            })), e.target.classList.add("active")) : e.target.classList.toggle("active"), l = e.target.nextElementSibling, c = l.scrollHeight, "0px" === l.style.height || "" === l.style.height ? l.style.height = c + "px" : l.style.height = 0)
        }

        function n() {
            [].forEach.call(t.querySelectorAll(".accordion-content"), (function (e) {
                e.style.height = 0
            }))
        }

        function a(e) {
            return t.querySelectorAll(".accordion-content")[e - 1]
        }

        function s(e) {
            var t = a(e);
            t && (o && n(), t.style.height = t.scrollHeight + "px")
        }
        return [].forEach.call(t.querySelectorAll("button"), (function (e) {
            e.classList.add("accordion-title"), e.nextElementSibling.classList.add("accordion-content")
        })), t.addEventListener("click", c), n(), l && s(l), {
            open: s,
            close: function (e) {
                var t = a(e);
                t && (t.style.height = 0)
            },
            destroy: function () {
                t.removeEventListener("click", c)
            }
        }
    },
    acc = document.getElementsByClassName("accordions-title");
for (i = 0; i < acc.length; i++) acc[i].addEventListener("click", (function () {
    this.classList.toggle("active");
    var e = this.nextElementSibling;
    e.style.maxHeight ? e.style.maxHeight = null : e.style.maxHeight = e.scrollHeight + "px"
}));
var i;
acc = document.getElementsByClassName("accordions_lv-title");
for (i = 0; i < acc.length; i++) acc[i].addEventListener("click", (function () {
    this.classList.toggle("active");
    var e = this.nextElementSibling;
    "block" === e.style.display ? e.style.display = "none" : e.style.display = "block"
}));
let tab_navs = document.querySelectorAll("ul.tabs li"),
    tab_links = document.querySelectorAll("ul.tabs li.tab-link");
for (let e of tab_navs) e.addEventListener("click", t => {
    let l = t.target.getAttribute("data-tab"),
        o = t.target.parentElement.children;
    for (let e of o) e.classList.remove("current");
    let c = t.target.parentElement.parentElement.children;
    for (let e of c) e.classList.remove("current");
    let n = document.getElementById(l);
    e.classList.add("current"), n.classList.add("current")
});
const tab_nav_sis = document.querySelectorAll(".tabs .tab");
for (let e of tab_nav_sis) e.addEventListener("click", t => {
    let l = t.target.parentElement.children;
    for (let e of l) e.classList.remove("active");
    e.classList.add("active")
});
const tab_nav_si_imgs = document.querySelectorAll(".tabs .tab img");
for (let e of tab_nav_si_imgs) e.addEventListener("click", t => {
    let l = t.target.parentElement.parentElement.children;
    for (let e of l) e.classList.remove("active");
    e.classList.add("active")
});
let modalButton = document.getElementsByClassName("modal-btn"),
    modals = document.getElementsByClassName("modal"),
    modalClose = document.getElementsByClassName("modal-close"),
    closePic = document.getElementsByClassName("modal-closePic"),
    modalBG = document.getElementsByClassName("modal-bg");
for (let e = 0; e < modalButton.length; e++)
    for (let t = 0; t < modals.length; t++) {
        let l = modalButton[e].getAttribute("data-modal"),
            o = modals[t].getAttribute("id"),
            c = function () {
                if (l == o) return !0
            };
        modalButton[e].addEventListener("click", () => {
            c() && (modals[t].style.display = "block")
        });
        let n = function (e) {
            for (let l = 0; l < e.length; l++) e[l].addEventListener("click", () => {
                c() && (modals[t].style.display = "none")
            })
        };
        n(modalClose), n(modalBG), n(closePic)
    }
let container = document.getElementsByTagName("body");
container[0].insertAdjacentHTML("beforeEnd", '<div class="modal modal-clipBox" id="modal-clip">\n    <div class="modal-closePic">&times;</div>\n    <div class="modal-bg"></div>\n    <div class="modal-box modal-box-video animate-zoom">\n        <div class="modal-video">\n            <iframe id="youtube" src="" frameborder="0" allowfullscreen></iframe>\n        </div>\n    </div>\n</div>');
let modalVideos = document.getElementsByClassName("modal-clip");
for (let e of modalVideos) {
    let t = e.getAttribute("data-video");
    t = `//www.youtube-nocookie.com/embed/${t}?rel=0&controls=1&autoplay=1&nocookie=true`;
    let l = document.getElementsByClassName("modal-clipBox"),
        o = document.getElementById("youtube");
    e.addEventListener("click", () => {
        o.setAttribute("src", t), setTimeout(() => {
            l[0].style.display = "block"
        }, 200)
    });
    for (let e of closePic)
        for (let t of l) e.addEventListener("click", () => {
            t.style.display = "none"
        });
    for (let e of modalBG)
        for (let t of l) e.addEventListener("click", () => {
            t.style.display = "none"
        })
}

function myLoad(e, t) {
    const l = document.querySelectorAll(e);
    let o = document.documentElement.scrollTop;
    for (let e = 0; e < l.length; e++) {
        l[e].offsetTop < o + 600 && l[e].classList.add(t)
    }
}

function addClass(e, t, l) {
    let o = document.querySelectorAll(e),
        c = document.querySelectorAll(t);
    for (let e = 0; e < o.length; e++) o[e].addEventListener("click", () => {
        for (let e = 0; e < c.length; e++) c[e].classList.add(l)
    })
}

function removeClass(e, t, l) {
    let o = document.querySelectorAll(e),
        c = document.querySelectorAll(t);
    for (let e = 0; e < o.length; e++) o[e].addEventListener("click", () => {
        for (let e = 0; e < c.length; e++) c[e].classList.remove(l)
    })
}

function addImgDefault(e, t) {
    const l = document.querySelectorAll(e);
    let o = "data:image/gif;base64,R0lGODlhAQABAPAAAMzMzAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
    for (let e = 0; e < l.length; e++) switch (t) {
        case "src":
            l[e].src = o;
            break;
        case "srcset":
            l[e].srcset = o;
            break;
        default:
    }
}

function myLazy(e, t) {
    const l = document.querySelectorAll(e);
    let o = window.innerHeight;
    for (let e = 0; e < l.length; e++) {
        let c = l[e].getBoundingClientRect().top,
            n = l[e].getBoundingClientRect().bottom;
        if (c <= o && n >= 0) switch (t) {
            case "src":
                l[e].src = l[e].dataset.src, l[e].classList.remove("lazy");
                break;
            case "srcset":
                l[e].srcset = l[e].dataset.srcset, l[e].classList.remove("lazy");
                break;
            case "img-bg":
                l[e].classList.remove("lazy-bg"), l[e].classList.add("img-bg");
                break;
            default:
        }
    }
}