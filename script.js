const SONG_URL = 'https://cdn.pixabay.com/download/audio/2023/01/23/audio_384c4a93a5.mp3?filename=nature-calls-136344.mp3';

let bfs;
const PLAY_ICON = '<iconify-icon icon="material-symbols:play-arrow-rounded"></iconify-icon>';
const STOP_ICON = '<iconify-icon icon="material-symbols:stop-rounded"></iconify-icon>'; 

window.onload = () => {
    let playButton = document.querySelector('#play');
    playButton.addEventListener('click', async () => {
        playButton.classList.remove('animate-bounce');
        playButton.classList.remove('animate-spin');
        playButton.classList.remove('animate-ping');


        if (bfs) {
            bfs.stop();
            bfs = null;
            playButton.innerHTML = PLAY_ICON;
            playButton.classList.add('animate-bounce');
        } else {
            playButton.classList.add('animate-ping');
            let context = new AudioContext();
            let buffer = await fetch(SONG_URL)
                .then(data => data.arrayBuffer())
                .then(arrayBuffer => context.decodeAudioData(arrayBuffer));

            playButton.classList.remove('animate-ping');

            bfs = context.createBufferSource();
            bfs.buffer = buffer;
            bfs.connect(context.destination);
            bfs.start(0);


            playButton.classList.add('animate-spin');
            playButton.innerHTML = STOP_ICON;
        }
    })
}
