let profile_photo_wrapper = document.getElementsByClassName('profile-photo-wrapper')
, profile_photo_wrapper_width = profile_photo_wrapper[0].clientWidth
profile_photo_wrapper[0].style.height = profile_photo_wrapper_width + 'px'


// adjust profile photo height/width so to fit image within circular div
let profile_photo = document.getElementsByClassName('profile-photo')
, profile_photo_width = profile_photo[0].clientWidth
, profile_photo_height =  profile_photo[0].clientHeight

let adjust_profile_img_size = (width, height, img_element) => {
  if (width > height) {
    // photo is landscape
    img_element.style.maxHeight = '100%'
  } else if (width < height) {
    // photo is portrait
    img_element.style.maxWidth = '100%'
  } else if (width === height) {
    // photo is square
    img_element.style.height = '100%'
    img_element.style.width = '100%'
  }
}

if (profile_photo_width !== 0 && profile_photo_height !== 0) {
  adjust_profile_img_size(profile_photo_width, profile_photo_height, profile_photo[0])
}

profile_photo[0].onload = function() {
  let profile_photo_width = this.width
  let profile_photo_height =  this.height
  adjust_profile_img_size(profile_photo_width, profile_photo_height, profile_photo[0])
}


let generate_achievement_card = (achievement_data) => {
  let achievement_card_builder = `
    <div class="mdc-card">
      <div class="mdc-card__primary-action">
        <div class="mdc-card__media" >
          <img src="crown.png" alt="">
        </div>
        <div class="mdc-card__secondary-action">
          <div class="mdc-card__secondary-action-top">
            <span class="mdc-list-item__text">
              <span class="mdc-list-item__primary-text">Achievement Title</span>
              <span class="mdc-list-item__secondary-text">Sub-Title</span>
            </span>
          </div>
          <hr class="mdc-list-divider">
          <div class="mdc-card__secondary-action-bottom">
             <i class="material-icons">directions_run</i>
             <i class="material-icons">fitness_center</i>
             <i class="material-icons">rowing</i>
          </div>
        </div>
      </div>
    </div> <!-- end mdc card -->`

  var htmlObject = document.createElement('div');
  htmlObject.className = 'card'
  htmlObject.innerHTML = achievement_card_builder

  let root = document.getElementsByClassName('achievement-container')[0]
  root.appendChild(htmlObject)
}

let generate_workout_card = (workout_data) => {
  let workout_card_builder = `
    <div class="mdc-card workout-card">
      <div class="mdc-card__primary-action">
        <span class="mdc-list-item__text workout-list-item-text">
          <span class="mdc-list-item__primary-text workout-list-item-primary-text">Workout Title</span>
          <span class="mdc-list-item__secondary-text">Workout Description</span>
          <span class="mdc-list-item__secondary-text">Athlete Score</span>
        </span>
      </div>
      <div class="mdc-card__button-container">
        <button class="mdc-button mdc-button--outlined">
          <span class="mdc-button__label">View Workout</span>
        </button>
        <button class="mdc-button mdc-button--outlined">
          <span class="mdc-button__label">Leaderboard</span>
        </button>
      </div>
    </div> <!-- end mdc card -->
    `

  var htmlObject = document.createElement('div');
  htmlObject.className = 'card'
  htmlObject.innerHTML = workout_card_builder

  let root = document.getElementsByClassName('workout-container')[0]
  root.appendChild(htmlObject)
}

let generate_pr_card = (pr_data) => {
  let pr_card_builder = `
    <div class="mdc-card mdc-card-pr-container" >
      <div class="mdc-card__primary-action mdc-card__primary-action-pr-container">
        <span class="mdc-list-item__text workout-list-item-text">
          <span class="mdc-list-item__primary-text workout-list-item-primary-text">PR Title</span>
        </span>
      </div>

      <div class="mdc-card__secondary-action-wrapper">
        <div class="mdc-card__secondary-action mdc-card__secondary-action-pr-container">
          <h4 class="athlete-score-pr-card">Athlete Score</h4>
          <i class="material-icons pr-list-material-icons">directions_run</i>
        </div>
      </div>
    </div>
    `

  var htmlObject = document.createElement('div');
  htmlObject.className = 'card'
  htmlObject.innerHTML = pr_card_builder

  let root = document.getElementsByClassName('pr-container')[0]
  root.appendChild(htmlObject)
}

// generate temporary cards
let number_of_temp_cards = 10
for (let i = 0; i < number_of_temp_cards; i++) {
  generate_achievement_card()
  generate_workout_card()
  generate_pr_card()
}


// we want the height of the achievement_container, workout_container, and pr_container
// ... to be 1/3 of the remaining window height after taking the difference of the total
// ... window height and the height of the profile-photo-container...
// also need to take into account the gutter height... do that
// let achievement_container = document.getElementsByClassName('achievement-container')
// , workout_container = document.getElementsByClassName('workout-container')
// , pr_container = document.getElementsByClassName('pr-container')
let profile_photo_container = document.getElementsByClassName('profile-photo-container')
, xp_container = document.getElementsByClassName('xp-container')
, scrolling_wrapper_flexbox = document.getElementsByClassName('scrolling-wrapper-flexbox')
let difference_height = window.innerHeight - (profile_photo_container[0].clientHeight + xp_container[0].clientHeight)

// set height and margin of containers
for (let i = 0; i < scrolling_wrapper_flexbox.length; i++) {
  scrolling_wrapper_flexbox[i].style.height = ((difference_height * (1/3))-12) + 'px'
  scrolling_wrapper_flexbox[i].style.marginBottom = '24px'
}

// set card width
let cards = document.getElementsByClassName('card')
for (card in cards) {
  if (cards[card].style) {
    cards[card].style.width = scrolling_wrapper_flexbox[0].clientWidth/4 + 'px'
  }
}


let lvl = document.getElementsByClassName('lvl')[0]
, choice_achiev = document.getElementsByClassName('choice-achievement')[0]

lvl.style.height = lvl.clientWidth + 'px'
choice_achiev.style.height = lvl.clientWidth + 'px'


// scroll animation for achievements container
let start_scroll_animation = () => {
  let ac = document.getElementsByClassName('achievement-container')[0]
  , wc = document.getElementsByClassName('workout-container')[0]
  , pc = document.getElementsByClassName('pr-container')[0]


  let ac_int = setInterval(() => {
    ac.scrollLeft+=1 // scroll to the left by 1 additional pixel

    if (ac.scrollLeft !== 0) { // as long as the scroll isnt at 0...
      if (ac.scrollLeft % (ac.children[0].clientWidth) == 0) { // if we've reached the end of a card...
        // then clone the head of the list, remove the head and append the clone onto the end
        let clone = ac.children[0].cloneNode(true)
        ac.children[0].remove()
        ac.scrollLeft = 0
        ac.appendChild(clone)
      }
    }
  },20)

  let wc_int = setInterval(() => {
    wc.scrollLeft+=1 // scroll to the left by 1 additional pixel
    if (wc.scrollLeft !== 0) { // as long as the scroll isnt at 0...
      if (wc.scrollLeft % (wc.children[0].clientWidth) == 0) { // if we've reached the end of a card...
        // then clone the head of the list, remove the head and append the clone onto the end
        let clone = wc.children[0].cloneNode(true)
        wc.children[0].remove()
        wc.scrollLeft = 0
        wc.appendChild(clone)
      }
    }
  },15)

  let pc_int = setInterval(() => {
    pc.scrollLeft+=1 // scroll to the left by 1 additional pixel
    if (pc.scrollLeft !== 0) { // as long as the scroll isnt at 0...
      if (pc.scrollLeft % (pc.children[0].clientWidth) == 0) { // if we've reached the end of a card...
        // then clone the head of the list, remove the head and append the clone onto the end
        let clone = pc.children[0].cloneNode(true)
        pc.children[0].remove()
        pc.scrollLeft = 0
        pc.appendChild(clone)
      }
    }
  },12.5)
}

start_scroll_animation()
