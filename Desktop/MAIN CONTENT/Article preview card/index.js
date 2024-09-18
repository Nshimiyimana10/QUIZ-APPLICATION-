let shareIcon = document.querySelector('#share-icon');
let socialMedia = document.querySelector('#social-media');

shareIcon.addEventListener('click', () => {
    if(socialMedia.classList.contains('hidden')){
        socialMedia.classList.remove('hidden')
    }
    else{
        socialMedia.classList.add('hidden')
    }
})