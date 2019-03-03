let idx = 0;
const FOLDER = './images/';

var images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'];
var source = ['Sponge Bob', 'Patrick Star', 'Sandy Cheeks', 'Squidward Tentacles', 'Larry the Lobster',
    'Eugene H. Krabs', 'Mrs. Puff', 'Pearl Krabs', 'Sheldon J. Plankton'];
var loading = 'loading.gif'

function previousImage() {
    if (idx === 0) {
        document.getElementById("prev").classList.add('disabled');
    }
    if (idx === 8) {
        document.getElementById("next").classList.remove('disabled');
    }
    if (idx > 0) {
        idx--;
        setTimeout(function () {
            document.querySelector('#display').src = FOLDER + images[idx];
        }
            , 200);
        document.querySelector('#display').src = FOLDER + loading;
        document.getElementById("source").innerText = source[idx];
    }
}

function nextImage() {
    if (idx === 0) {
        document.getElementById("prev").classList.remove('disabled');
    }
    if (idx === 8) {
        document.getElementById("next").classList.add('disabled');
    }
    if (idx < 8) {
        idx++;
        setTimeout(function () {
            document.querySelector('#display').src = FOLDER + images[idx];
        }
            , 200);
        document.querySelector('#display').src = FOLDER + loading;
        document.getElementById("source").innerText = source[idx];
    }
}

window.addEventListener("load", function () {
    var func = function () {
        const loader = document.querySelector(".loader");
        loader.className += " hidden";
    }
    setTimeout(func, 1000);
});
