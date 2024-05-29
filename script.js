let userItems = [];
let userItemsKeys = [];
let userItems_length = userItems.length - 1;










function enterTodoDate(){

    let myObj = {};
    localStorage.setItem('', myObj)
}

function createTodo(todoData){
    let dayOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let todo = document.createElement('div');
    todo.classList.add('task');
    todo.innerHTML = 
    `
        <h3>${todoData.taskName}</h3>
        <div class="task-info flex">
            <div class="time_diff">
                <div class="time red_">${dayOfTheWeek[todoData.date.getDay()]}</div>
                <div class="diff">
                    <span class="low"></span>
                    <span class="mid"></span>
                    <span class="high"></span>
                </div>
            </div>
    
            <div class="location">${todoData.taskLocation}</div>
        </div>
    `
}

function cancelBtn(){

}