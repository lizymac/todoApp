//todo class
class Todo{
    constructor(task){
        this.task = task;
    }
}


//UI class: handle UI tasks
class UI{
    static displayTodo(){
       
        const todos = Store.getTodo();

        todos.forEach((todo)=> UI.addTodoToList(todo));
    }

   static addTodoToList(todo){
        const list = document.querySelector('#todo-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${todo.task}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
   
   }
   static deleteTask(el){
       if(el.classList.contains('delete')){
           el.parentElement.parentElement.remove();
       }
   }

   static showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#todo-form');
    container.insertBefore(div,form);

    //vanish in 2 sec
    setTimeout(()=>document.querySelector('.alert').remove(),2000);
   }

   static clearFields(){
       document.querySelector('#task').value='';
   }
}

//store class: handle storage
class Store{
    static getTodo(){
        let todos;
        if(localStorage.getItem('todos') === null){
            todos=[];
        } else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        return todos;
    }

    static addTodo(todo){
        const todos = Store.getTodo();
        todos.push(todo);

        localStorage.setItem('todos',JSON.stringify(todos));
    }

    static removeTodo(task){
        const todos = Store.getTodo();
        todos.forEach((todo,index)=>{
            if(todo.task === task){
                todos.splice(index,1);
            }
        });

        localStorage.setItem('todos',JSON.stringify(todos));
    }
}

//Event: display todo 
document.addEventListener('DOMContentLoaded',UI.displayTodo);

//Event: Add a Todo
document.querySelector('#todo-form').addEventListener('submit',(e)=>{
    //prevent actual submit
    e.preventDefault();

    //get form values
    const task = document.querySelector('#task').value;

    //validate
    if(task===''){
        UI.showAlert('Please enter the task', 'danger');
    }else{
         //Instantiate task
        const todo = new Todo(task);
        // console.log(todo); 

        //Add task to UI
        UI.addTodoToList(todo);

        //add task to store
        Store.addTodo(todo);

        //show success message
        UI.showAlert('Task added','success');

        //clear fields
        UI.clearFields();
    }

});

//Event: Remove a todo
document.querySelector('#todo-list').addEventListener('click',(e)=>{
    //remove todo from UI
 UI.deleteTask(e.target);

 //remove from store
//  Store.removeTodo(e.target.parentElement.previousElementSibling.textContent);
    Store.removeTodo(e.target.parentElement.previousElementSibling.textContent);

 //show success message
 UI.showAlert('Task removed','success');
});