window.addEventListener('keydown', key => {
    if(key == 'e'){
        if('alt' in window){
            alt.emit('close:Webview');
        }
    }
})








