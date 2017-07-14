/* global $ */

var output
var buttons = $('.button')
var userArr = []
var compArr = []
var cC = -1
var text = ''
var sSays = 'obgy'
var level = 0
// returns saved high score... works on my browser when hosted locally, but not on githubpages
// var hiScore = parseInt(localStorage.getItem('hiScore'))
var hiScore = 0
var sound = document.getElementById('loseSound')
var power = true

// to play sounds
function playAudio () {
  sound.play()
}

// kick it up a notch!
function playAudioK () {
  document.getElementById('kickSound').play()
}

function onOff () {
  if (power === true) {
    buttons.addClass('off')
    $('h2').css({'border-color': 'gray', 'color': 'gray', 'background-color': 'gray'})
    sound = document.getElementById('byeSound')
    playAudio()
    power = false
  } else if (power === false) {
    buttons.removeClass('off')
    $('h2').css({'border-color': 'black', 'color': 'black', 'background-color': 'white'})
    sound = document.getElementById('hiSound')
    playAudio()
    power = true
  }
}

// to reset the game
function newGame () {
  sSays = 'obgy'
  compArr = []
  level = 0
  $('#says2').html(`Score: ${level}`)
  $('#p').css('display', 'none')
  $('#r').css('display', 'none')
  $('#l').css('display', 'none')
  $('#c').css('display', 'none')
  $('#says').html('SimonBoy')
  playGame()
}

// if the user clicked the wrong button, they lose; if they clicked all the buttons in the sequence, they win
function handleClick () {
  cC++
  sound = document.getElementById(`${$(this).attr('id')}Sound`)
  playAudio()
  output = $(this).attr('id')
  $(this).css({'height': '150px', 'width': '150px'})
  setTimeout(function () {
    fixElse($(this))
  }, 400)
  console.log(output)
  userArr.push(output)
  if (userArr[cC] !== compArr[cC]) {
    console.log('You lose')
    sound = document.getElementById('loseSound')
    playAudio()
    if (level > hiScore) {
      hiScore = level
      // save high score even if page refresh.. broken online?
      // localStorage.setItem('hiScore', hiScore)
      $('#hi').html(`High Score: ${hiScore}`)
      $('#says2').html(`New High Score: ${hiScore}`)
    } else if (hiScore >= level) {
      $('#says2').html(` You had to beat ${1 + hiScore - level} more levels to beat the high score of ${hiScore}`)
    }
    $('#says').html('LOSER!')
    scoreFix()
  } else {
    if (userArr.length === compArr.length) {
      console.log('You win!')
      level++
      $('#says2').html(`Score: ${level}`)
      setTimeout(playGame(), 600)
    }
  }
}

// resets elements to their defaults
function fixElse (element) {
  console.log(element)
  element.css({'height': '100px', 'width': '100px', 'filter': 'blur(0px)', 'border-color': 'transparent'})
}

// creates a border on hover
function borderHov () {
  $(this).css({'border-color': 'black'})
}

// the AI
function simon () {
  // takes a random character from the sSays string, then pushes it to array
  text = sSays.charAt(Math.floor(Math.random() * sSays.length))
  compArr.push(text)
  // loops through the AI's array and animates/plays sounds for each in sequence
  function loop () {
    for (let i = 0; i < compArr.length; i++) {
      setTimeout(function () {
        $(`#${compArr[i]}`).css({'height': '150px', 'width': '150px', 'border-color': 'black'})
      }, (i + 1) * 1200)

      setTimeout(function () {
        sound = document.getElementById(`${compArr[i]}Sound`)
        playAudio()
      }, (i + 1) * 1200)

      setTimeout(function () {
        fixElse($(`#${compArr[i]}`))
      }, (i + 1) * 1400)
    }
  }
  setTimeout(loop, 500)
}

// the basic setup for level 1
function firstLevel () {
  userArr = []
  cC = -1
  setTimeout(simon(), 700)
  console.log(compArr)
}

// additional diversity for later levels
function playGame () {
  if (level === 3) {
    sound = document.getElementById('kickSound')
    playAudio()
    sSays = sSays + 'ogbyprprprpr'
    $('#p').css('display', 'inline')
    $('#r').css('display', 'inline')
    firstLevel()
  } else if (level === 5) {
    sound = document.getElementById('kickSound')
    playAudio()
    sSays = sSays + 'lclclclc'
    $('#l').css('display', 'inline')
    $('#c').css('display', 'inline')
    firstLevel()
  } else if (level >= 2) {
    sound = document.getElementById('levelUpSound')
    playAudio()
    firstLevel()
  } else {
    firstLevel()
  }
}



buttons.on('click', handleClick)

$('#start').on('click', newGame)
$('#kick').on('click', playAudioK)
$('#power').on('click', onOff)

buttons.hover(borderHov, function () {
  console.log(this)
  fixElse($(this))
})
