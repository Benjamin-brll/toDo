document.getElementById('btn-enviar').addEventListener('click',(e)=>{
    e.preventDefault()
    createATask()
})

const createATask = () => {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let category = document.getElementById('category').value
    let time = document.getElementById('time').value

    let task = {
        title,
        description,
        category,
        time,
    }
    let timer = parseInt(time.split(':')[0])

    if(timer > 22 || timer < 5){
        Swal.fire({
            title: `No es una hora muy apropiada para hacer algo`,
            icon: 'info',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Tienes razón`,
            denyButtonText: `No me importa`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Buena decisión!', 'Este es un horario en el que debes estar descansando', 'success')
              deleteTask(time)
            } else if (result.isDenied) {
              Swal.fire('Eres importante para nosotros', 'Por favor realiza tareas en horarios adecuados', 'info')
            }
          })
    }


    if(localStorage.getItem('tasks')){
        let tasks = JSON.parse(localStorage.getItem('tasks'))

        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }else{
        let tasks = []
        tasks.push(task)
        
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    showTasks()
    document.getElementById('form').reset()
}

const deleteTask = (time) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'))

    for(let i = 0; i < tasks.length; i++){

        if(tasks[i].time == time){
            tasks.splice(i,1)
        }
        
    }
    
    localStorage.setItem('tasks',JSON.stringify(tasks))
    
    showTasks()
}

const showTasks = () => {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    let lista = document.getElementById('lista')
    lista.innerHTML = ""
    
    for(let i = 0; i < tasks.length; i++){
        lista.innerHTML += `<div class="card my-4">
            <div class="card-body">
                <h5 class="card-title">${tasks[i].title.toUpperCase()}</h5>
                <p class="card-text">${tasks[i].description}</p>
                <p class="card-text">${tasks[i].time}</p>
                </div>
            <div class="card-footer text-center">
                <p class="font-weight-bold">Categoria:</p>
                <p class="text-danger font-weight-bold">${tasks[i].category.toUpperCase()}</p>
                <button class="btn btn-danger" onclick="deleteTask('${tasks[i].time}')">Eliminar</button>
            </div>
        </div>`
    }
}


if(localStorage.getItem('tasks')){
    showTasks()
}