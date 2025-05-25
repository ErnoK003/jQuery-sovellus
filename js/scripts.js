var pluku=0
function addTask() {
    const task = $('#task').val()  //haetaan input-kentän sisältö(val) muuttujaan
    if (task.length <=2) { //estetään liian lyhyt tehtävän kuvaus
        if (task=='' || task==' '){
            alert('Please enter a task')
            $('#task').val('') //tyhjennetään input-kenttä
            return
        } else {
            alert('Task description is too short')
            $('#task').val('') //tyhjennetään input-kenttä
            return
        }
    }
    // Luodaan uusi div-elementti, johon lisätään tehtävä ja napit
    const apuluku = pluku
    const uusitask = $('<div>').attr('id', apuluku).appendTo('body') //uuden div-elementin luonti (saadaan nappi ja p-elementti saman divin alle)
    $('<p>').attr('id', "taskname").text(task).appendTo(uusitask) //uuden p-elementin luonti ja lisätään p-elementtiin input-kentän sisältö
    $('<button>').attr('class', "btn btn-success").html('✓').on('click', function() {didTask(apuluku)}).appendTo(uusitask) //uuden button-elementin luonti
    $('<button>').attr('class', "btn btn-danger").html('X').on('click', function() {removeTask(apuluku)}).appendTo(uusitask) //uuden poistonappi-elementin luonti
    
    // Tallennetaan tehtävä localStorageen
    let taskit = JSON.parse(localStorage.getItem('tasks')) || []
    const aTask = {id: apuluku, text: task} //luodaan aTask-objekti, joka sisältää id:n ja tekstin
    taskit.push(aTask) //lisätään aTask-objekti taskit-taulukkoon
    localStorage.setItem('tasks', JSON.stringify(taskit)) //tallennetaan taskit-taulukko localStorageen
    
    $('#tasks').append(uusitask) //lisätään uusitask diviin
    $('#task').val('') //tyhjennetään input-kenttä
    pluku+=1

}

// Kuuntelija, joka tarkistaa localStoragesta, onko tehtäviä olemassa ja tuo ne näkyviin
$(document).ready(function oldTasks() {
    const taskit = JSON.parse(localStorage.getItem('tasks')) || []
    console.log(taskit)
    if (taskit.length > 0) {
        taskit.forEach(function(task) {
            const uusitask = $('<div>').attr('id', task.id)
            $('<p>').attr('id', "taskname").text(task.text).appendTo(uusitask)
            $('<button>').attr('class', "btn btn-success").html('✓').on('click', function() { didTask(task.id); }).appendTo(uusitask)
            $('<button>').attr('class', "btn btn-danger").html('X').on('click', function() { removeTask(task.id); }).appendTo(uusitask)
            $('#tasks').append(uusitask)
        });
    }
});

// Kuuntelija, joka tarkistaa localStoragesta, onko !tehtyjä! tehtäviä olemassa ja tuo ne näkyviin
$(document).ready(function doneTasks() {
    const donetaskit = JSON.parse(localStorage.getItem('donetasks')) || []
    console.log(donetaskit)
    if (donetaskit.length > 0) {
        donetaskit.forEach(function(task) {
            const uusitask = $('<div>').attr('id', task.id)
            $('<p>').text(task).appendTo(uusitask)
            $('#donetasks').append(uusitask)
        });
    }

    const h2 = $('h2') //haetaan done listan h2-elementti
    const clearDoneButton = $('#cleardone')
    if (donetaskit.length > 0) {      //jos done listalla on taskeja, h2-elementti ja clear-nappi tulee näkyviin
        h2.css('opacity', '100%') //muutetaan h2-elementin ja napin tyyliä
        clearDoneButton.css('opacity', '100%')
    } else {
        h2.css('opacity', '0%') //muutetaan h2-elementin ja napin tyyliä
        clearDoneButton.css('opacity', '0%')
    }
});

function enterdown() {
    if (event.key == 'Enter') { //mahdollistetaan enterin käyttö syöttäessä
        addTask()
    }
}

function didTask(taskId) {
    const taskReady = $('#' + taskId).children('p')       //otetaan talteen taski
    $('#' + taskId).remove() //poistetaan taski
    const doneTasks = $('#donetasks') //haetaan done listan elementti
    doneTasks.append(taskReady) //lisätään done listaan tehty tehtävä

    // Tallennetaan tehty tehtävä localStorageen ja täten tehtyihin tehtäviin
    let donetaskit = JSON.parse(localStorage.getItem('donetasks')) || [] //luodaan aTask-objekti, joka sisältää id:n ja tekstin
    donetaskit.push(taskReady.text()) //lisätään tehty tehtävä donetaskit-taulukkoon
    localStorage.setItem('donetasks', JSON.stringify(donetaskit)) //tallennetaan taskit-taulukko localStorageen

    // Poistetaan tehtävä taskit-taulukosta
    let taskit = JSON.parse(localStorage.getItem('tasks')) || []
    taskit = taskit.filter(task => task.id != taskId)
    localStorage.setItem('tasks', JSON.stringify(taskit)) //tallennetaan taskit-taulukko localStorageen
    
    const h2 = $('h2') //haetaan done listan h2-elementti
    const clearDoneButton = $('#cleardone')
    if (doneTasks.length > 0) {      //jos done listalla on taskeja, h2-elementti ja clear-nappi tulee näkyviin
        h2.css('opacity', '100%') //muutetaan h2-elementin ja napin tyyliä
        clearDoneButton.css('opacity', '100%')
    } else {
        h2.css('opacity', '0%') //muutetaan h2-elementin ja napin tyyliä
        clearDoneButton.css('opacity', '0%')
    }

}

function removeTask(taskId) {
    console.log('Removing task with ID:', taskId)
    let taskit = JSON.parse(localStorage.getItem('tasks')) || []     //haetaan taskit-taulukko localStoragesta
    taskit = taskit.filter(task => task.id != taskId)       //suodatetaan pois poistettava taski
    localStorage.setItem('tasks', JSON.stringify(taskit)) //tallennetaan taskit-taulukko localStorageen
    $('#'+taskId).remove()

}

function clearDone() {
    $('#donetasks').empty() //tyhjennetään done listan sisältö
    $('h2').css('opacity', '0%') //piilotetaan done listan h2-elementti
    $('#cleardone').css('opacity', '0%') //piilotetaan clear-nappi
    localStorage.removeItem('donetasks') //poistetaan done listan tehtävät localStoragesta
}