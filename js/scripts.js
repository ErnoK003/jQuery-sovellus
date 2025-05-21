var pluku=0
function addTask() {
    const task = document.getElementById('task').value  //haetaan input-kentän sisältö muuttujaan
    if (task.length <=3) { //estetään liian lyhyt tehtävän kuvaus
        if (task=='' || task==' '){
            alert('Please enter a task')
            document.getElementById('task').value = ''
            return
        } else {
            alert('Task description is too short')
            document.getElementById('task').value = ''
            return
        }
    }
    const uusitask = document.createElement('div') //uuden div-elementin luonti (saadaan nappi ja p-elementti saman divin alle)
    const uusip = document.createElement('p') //uuden p-elementin luonti
    uusip.setAttribute('id',pluku)
    uusip.innerHTML = task //lisätään p-elementtiin input-kentän sisältö
    const uusinappi = document.createElement('button') //uuden button-elementin luonti
    const poistonappi = document.createElement('button') //uuden poistonappi-elementin luonti
    uusinappi.innerHTML = '✓' //lisätään button-elementtiin Done -teksti
    poistonappi.innerHTML = 'X' //lisätään poistonapin-elementtiin X -teksti
    uusinappi.setAttribute('onclick', 'didTask('+pluku+')') //laitetaan button poistamaan taski
    poistonappi.setAttribute('onclick', 'removeTask('+pluku+')')
    uusitask.appendChild(uusip) //lisätään p-elementti diviin
    uusitask.appendChild(uusinappi) //lisätään button-elementti p-elementin sisään
    uusitask.appendChild(poistonappi) //lisätään poistonappi-elementti p-elementin sisään
    document.getElementById('tasks').appendChild(uusitask) //lisätään uusitask diviin
    console.log(uusitask)
    document.getElementById('task').value = '' //tyhjennetään input-kenttä seuraavaa syötettä varten
    pluku+=1
    console.log(uusip.getAttribute('id'))
}

function enterdown() {
    if (event.key == 'Enter') { //mahdollistetaan enterin käyttö syöttäessä
        addTask()
    }
}

function didTask(taskId) { 
    const taskEle = document.getElementById(taskId).parentElement
    const taskReady = document.getElementById(taskId)        //otetaan talteen taski
    taskEle.remove()      //poistetaan taski todo listasta
    taskDone = document.getElementById('donetasks')
    taskDone.appendChild(taskReady)              //lisätään taski done listalle

    const h2 = document.querySelector('h2')
    const clearDoneButton = document.getElementById('cleardone')
    if (taskDone.children.length > 0) {      //jos done listalla on taskeja, h2-elementti ja clear-nappi tulee näkyviin
        h2.style.opacity = "100%";
        clearDoneButton.style.opacity = "100%";
    } else {
        h2.style.opacity = "0%";
        clearDoneButton.style.opacity = "0%";
    }
}

function removeTask(taskId) {
    const taskEle = document.getElementById(taskId).parentElement
    taskEle.remove()      //poistetaan taski todo listasta
}

function clearDone() {
    const taskDone = document.getElementById('donetasks')
    taskDone.innerHTML = '' //tyhjennetään done listan sisältö
    const h2 = document.querySelector('h2')
    h2.style.opacity = "0%"; //piilotetaan h2-elementti
    const clearDoneButton = document.getElementById('cleardone')
    clearDoneButton.style.opacity = "0%"; //piilotetaan clear-nappi
}