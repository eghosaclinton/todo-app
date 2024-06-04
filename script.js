let userKeys_pending = JSON.parse(localStorage.getItem('userKeys_pending'));
let userKeys_done = JSON.parse(localStorage.getItem('userKeys_done'));

//'create new todo' button
const add_todo_btn = document.querySelector('#addtodo_');
let count = 0;
//adding event listener to display dialog box to enter data to create new todo
add_todo_btn.addEventListener('click', () =>{
    count++;
    if(count % 2 !== 0){
        document.querySelector('.form-overlay').classList.remove('hidden');
        document.querySelector('.form-overlay').classList.add('flex');
        add_todo_btn.style.transform = 'rotate(45deg)';
    }else{
        document.querySelector('.form-overlay').classList.add('hidden');
        document.querySelector('.form-overlay').classList.remove('flex');
        add_todo_btn.style.transform = 'rotate(0deg)';
    }
});
//'submit todo data' button
const submit_todo_data = document.getElementById('submit_btn');
//adding event listener to enable submission of todo data and creation f new todo
submit_todo_data.addEventListener('click', ()=>{
    enterTodoDataa();
    createTodo(enterTodoDataa());
    document.querySelector('.form-overlay').classList.add('hidden');
    document.querySelector('.form-overlay').classList.remove('flex');
    add_todo_btn.style.transform = 'rotate(0deg)';
});

window.addEventListener('DOMContentLoaded', ()=>{
    let greetings = ['Hello', 'Hola', 'こんにちは', 'Bonjour']
    const greeting = document.querySelector('#greeting');
    const userName_display = document.querySelector('#userName');

    if (localStorage.getItem('userName') == null) {

        document.querySelector('.welcome_parent').classList.remove('hidden');
        document.querySelector('.welcome_parent').classList.add('flex');

        localStorage.setItem('userKeys_pending', JSON.stringify(['Task2']));
        localStorage.setItem('userKeys_done', JSON.stringify(['Task1']));

        localStorage.setItem('Task2', JSON.stringify({taskName: 'Task2', diff: '', prority: '', desc: 'Only Second to Task1', taskLocation: 'Home', isDone: false}));
        localStorage.setItem('Task2_date', JSON.stringify(new Date(2024, 0, 1)));
        localStorage.setItem('Task1', JSON.stringify({taskName: 'Task1', diff: '', prority: '', desc: 'Your Very First todo...already done though', taskLocation: 'Home', isDone: true}));
        localStorage.setItem('Task1_date', JSON.stringify(new Date(2024, 0, 1)));

        let userName_str = document.querySelector('#enter_userName');
        document.querySelector('#welcome_btn').addEventListener('click',() => {
            console.log('Enter user name');
            localStorage.setItem('userName', userName_str.value)
            document.querySelector('.welcome_parent').classList.remove('flex');
            document.querySelector('.welcome_parent').classList.add('hidden');
            window.location.reload();
        });
        
    }

    let randNum = Math.round(Math.random()*3);
    greeting.textContent = `${greetings[randNum]}, `
    userName_display.textContent = `${(localStorage.getItem('userName') == null)? '--': localStorage.getItem('userName')}`;

    userKeys_pending.forEach(k => {
        // createTodo(JSON.parse(localStorage.getItem(k)));
        let kObj = JSON.parse(localStorage.getItem(k));
        kObj.taskDate = JSON.parse(localStorage.getItem('Task2_date'))

        console.log(typeof kObj.taskDate);
    });

    userKeys_done.forEach(k => {
        // createTodo(JSON.parse(localStorage.getItem(k)));
        console.log(JSON.parse(localStorage.getItem(k)));
    });    
})

//the below function creates an object that has information for each todontask
function enterTodoDataa(){
    //input elements used for data collection
    let task_name = document.getElementById('taskName');
    let task_date = document.getElementById('taskDate');
    let diff = document.getElementById('diff');
    let priority = document.getElementById('priority');
    let task_location = document.getElementById('taskLocation'); 
    let text_desc = document.querySelector('textarea');   
    //this splits the value from the task_date var and turns them into an array of numbers
    //that is used for creation of date object later
    let date_arr = task_date.value.split('-');
    let date_arr2 = date_arr.map(e => parseInt(e));
    //object declaration
    let myObj;
    //object constructor
    function Obj(taskName, taskDate, diff, priority, description, taskLocation){
        this.taskName = taskName,
        this.taskDate = new Date(taskDate[0], taskDate[1]-1, taskDate[2]),
        this.diff =  diff,
        this.priority = priority,
        this.desc = description,
        this.taskLocation = taskLocation
        this.isDone = false;
    }

    //object var definition
    myObj = new Obj(task_name.value, date_arr2, diff.value, priority.value, text_desc.value, task_location.value);

    return myObj;
}

//this function creates the todo ui component for the user to view
function createTodo(todoData){
    //used to determine day of the week on the ui component
    let dayOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayOfThetodo = todoData.taskDate.getDay();
    console.log(dayOfThetodo);
    console.log(todoData.taskDate);

    let bg_color;
    switch (todoData.priority) {
        case 'low':
            bg_color = 'blue_';
            break;
        case 'medium':
            bg_color = 'yellow_';
            break;
        case 'high':
            bg_color = 'red_';
            break;
        default:
            bg_color = 'defualt-bg';
            break;
    }

    let bg1, bg2, bg3;
    switch (todoData.diff) {
        case 'easy':
            bg1 = bg_color;
            bg2= 'defualt-bg';
            bg3= 'defualt-bg';
            break;
        case 'moderate':
            bg1 = bg_color;
            bg2 = bg_color;
            bg3 = 'defualt-bg';
            break;
        case 'hard':
            bg1 = bg_color;
            bg2 = bg_color;
            bg3 = bg_color;
            break;
        default:
            bg1 = bg_color;
            bg2 = bg_color;
            bg3 = bg_color;
            break;
    }

    //parent container for the task ui component and addition of class
    let todo_parent = document.createElement('div');
    todo_parent.classList.add('todo-parent');
    

    //task ui component and its classes
    let todo = document.createElement('div');
    todo.classList.add('task');
    //click component to display toast that shows extra info
    todo.addEventListener('click', ()=>{
        todo.parentElement.lastElementChild.classList.remove('hidden');
    })

    //the extra info
    let task_desc = document.createElement('div');
    task_desc.classList.add('task-desc');
    task_desc.classList.add('hidden');

    //task ui component content
    todo.innerHTML = 
    `
            <h3>${todoData.taskName}</h3>
            <div class="task-info flex">
                <div class="time_diff flex">
                    <div class="time ${bg_color}">${dayOfTheWeek[dayOfThetodo]}</div>
                    <div class="diff flex">
                        <div class="diff-span ${bg1}"></div>
                        <div class="diff-span ${bg2}"></div>
                        <div class="diff-span ${bg3}"></div>
                    </div>
                </div>

                <div class="location">${todoData.taskLocation}</div>
            </div>
    `

    //'the extra info' content
    task_desc.innerHTML = 
    `
            <div class="task-desc-head flex">
                <div class="">
                    <h3>todo Description</h3>
                    <p>${todoData.desc}</p>
                </div>
                <div class="cancel-img"><img src="./assets/cancel-svgrepo-com.svg" class="cancel-btn"></div>
            </div>
            <div class="desc-actions flex">
                <button class="delete"><img src="./assets/delete-svgrepo-com.svg" alt=""> Delete Task</button>
                <button class="mark-as-done"><img src="./assets/done-all-alt-round-svgrepo-com.svg" alt=""> Mark as Done</button>
            </div>
    `  

    //removes the 'extra info' from display
    const removeInfo = () => { task_desc.querySelector('.cancel-btn').parentElement.parentElement.parentElement.classList.add('hidden');};
    task_desc.querySelector('.cancel-btn').onclick = removeInfo;   

    //appends the 'extra info' and task component to parent container
    todo_parent.appendChild(todo);
    todo_parent.appendChild(task_desc);

    //appends parent container to todo content container
    document.querySelector('.to-do-content').appendChild(todo_parent);

    //append ui component to done
    const mark_as_done = () => {
        document.querySelector('.to-do-content').removeChild(todo_parent);
        document.querySelector('.done-content').appendChild(todo_parent);
    }
    task_desc.querySelector('.mark-as-done').onclick = mark_as_done; 
}