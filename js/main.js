/// <reference types="../@types/jquery" />
$('.text .value').on('click',function(){
    console.log('ha');
})

let countDownDate = new Date("Oct 25, 2024 23:59:59").getTime();
// console.log(countDownDate);

let counter = setInterval(()=>{

//Get Date Now
let dateNow = new Date().getTime();

//Find The Date Difference Between Now And CountDown Date
let dateDiff = countDownDate - dateNow;

// Get Time Unit
let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((dateDiff % (1000 * 60 * 60 )) / (1000 * 60 ));
let seconds = Math.floor((dateDiff % (1000 * 60 )) / 1000 );

document.querySelector(".text .day").innerHTML = days;
document.querySelector(".text .hours").innerHTML = hours;
document.querySelector(".text .minutes").innerHTML = minutes;
document.querySelector(".text .seconds").innerHTML = seconds;

if (dateDiff < 0) {
    clearInterval(counter)
}

}, 1000);

$('.openNav').on('click',function(){
    $('.sidenav').animate({width:'toggle', paddingInline:'toggle'}, 1000)
})



let sectionOffset = $('#singer').offset().top; 

let navBar = $('.sidenav');

let icon = $('.openNav')

$('a[href^="#"]').on('click', function(e){

    let aHref = e.target.getAttribute('href')

    let sectionOffset = $(aHref).offset().top;

    $('body,html').animate({scrollTop:sectionOffset}, 1000)
})



$(window).on('scroll', function(){
    let curentScroll = $(window).scrollTop();

    if (curentScroll > sectionOffset - icon.outerHeight(true)) {
        icon.css('color', 'black')
    } else {
        icon.css('color', 'white')
    }
})


$(function(){
    $('.loader').fadeOut(1000, function(){
        $('.loading').slideUp(1000, function(){
            $('body').css('overflow' , 'auto');

            $('.loading').remove();
        });
    })
})


console.log(sectionOffset);