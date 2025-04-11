
document.addEventListener('DOMContentLoaded',()=>{
    const allNotes = document.qaseSelector('.notes');
    const notes  = document.querySelectorAll('.note');
    const form = document.getElementById('form')
    const noteName = document.getElementById('title')
    const notask = document.querySelector(".notask")

    noteName.addEventListener('keypress',(Element)=>{
        if(Element.target.value.length > 25){
            alert('Title is too long.. only 25 characters are allowed')
            Element.target.value = ''
        }
    })


    form.addEventListener('submit',(Element)=>{
        // Element.preventDefault()
        const title = Element.target.title.value
        const description = Element.target.textarea.value
    })

    notes.forEach((note)=>{
        const description = note.querySelector('.note-description');
        const seeMoreLink  = note.querySelector('.see-more')
        const words = description.innerHTML.split(' ')
        const letterNeed = 25


        if(words.length > letterNeed){
            const visibleText = words.splice(0,letterNeed).join(' ')
            if(visibleText){
                description.innerHTML = visibleText + '...'
                seeMoreLink.style.display = 'block'
            }
        }
        

    })

})