// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

/*
  Here we use a tool called `crypto` to generate a random id for our task.
  This is a unique identifier that we can use to find the task in the array.
  `crypto` is a built-in module that we can use in the browser and Nodejs.
*/
function generateTaskId() {
    return crypto.randomUUID();
}

// Creates a task card from the information passed in `task` parameter and returns it
function createTaskCard(task) {
    // Create our element tags here and append the appropiate classes, attributes and text
    const cardEl = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);

    const cardHeaderEl = $('<div>')
        .addClass('card-header h4')
        .text(task.title);

    const cardBodyEl = $('<div>')
        .addClass('card-body');

    const cardDescriptionEl = $('<p>')
        .addClass('card-text')
        .text(task.description);

    const cardDueDateEl = $('<p>')
        .addClass('card-text')
        .text(task.dueDate);

    const buttonEl = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);

    // Button on the task will handle delete events
    buttonEl.on('click', handleDeleteTask);

    /*
      Sets the card background color based on due date.
      Only apply the styles if the dueDate exists and the status is not done.
    */
    if (task.dueDate && task.status !== 'done') {
        // Use the built in Day.js library to get time stamps and format it
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        // If the task is due today, make the card yellow. If it is overdue, make it red.
        if (now.isSame(taskDueDate, 'day')) {
            cardEl.addClass('bg-warning text-white');
        }
        
        else if (now.isAfter(taskDueDate)) {
            cardEl.addClass('bg-danger text-white');
            buttonEl.addClass('border-light');
        }
    }

    // Gather all the elements created above and append them to the correct elements
    cardBodyEl.append(cardDescriptionEl, cardDueDateEl, buttonEl);
    cardEl.append(cardHeaderEl, cardBodyEl);

    // Return the card so it can be appended to the correct lane
    return cardEl;
}

// Function to render the task list display and make cards draggable
function renderTaskList() {
    // If no tasks were retrieved from localStorage, assign tasks to a new empty array to push to later
    if (!taskList) {
        taskList = [];
    }

    // Empty existing task cards out of the lanes
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    // Loop through tasks and create task cards for each status
    for (let task of taskList) {
        if(task.status === 'to-do') {
            todoList.append(createTaskCard(task));
        }
    
        else if(task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        }
    
        else if(task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }
    
    // Use JQuery UI to make task cards draggable
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        /*
          This is the function that creates the clone of the card that is dragged.
          This is purely visual and does not affect the data.
        */
        helper: function (e) {
            /*
              Check if the target of the drag event is the card itself or a child element.
              If it is the card itself, clone it, otherwise find the parent card
              that is draggable and clone that.
            */
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            /*
              Return the clone with the width set to the width of the original card.
              This is so the clone does not take up the entire width of the lane.
              This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            */
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

// Adds a task to local storage and prints the task data
function handleAddTask(event){
    // Had to remove this in order for form validation to work
    // event.preventDefault();

    // Read user input from the form
    const taskTitle = $('#taskTitle').val();
    const taskDueDate = $('#taskDueDate').val();
    const taskDescription = $('#taskDescription').val();

    // Assign the inputs to the appropriate fields in the task object
    const task = {
        id: generateTaskId(),
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
        status: 'to-do'
    }

    // Push the new task to the array
    taskList.push(task);

    // Save the updated tasks array to localStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Print task data back to the screen
    renderTaskList();

    // Clear the form inputs
    $('#taskTitle').val('');
    $('#taskDueDate').val('');
    $('#taskDescription').val('');
}

// Removes a task from local storage and prints the task data back to the page
function handleDeleteTask(event) {
    // Prevent page from reloading
    event.preventDefault();

    // Grab the task id by the attribute
    const taskId = $(this).attr('data-task-id');

    // Remove task from the array
    for (let task of taskList) {
        console.log(`task.id = ${task.id}`);
        if (task.id === taskId) {
            console.log(task);
            taskList.splice(taskList.indexOf(task), 1);
            console.log(taskList);
        }
    }

    // Save the tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Here we use our other function to print tasks back to the screen
    renderTaskList();
}

/*
  This function is called when a card is dropped into a lane. 
  It updates the status of the task and saves it to localStorage. 
  You can see this function is called in the `droppable` method below.
*/
function handleDrop(event, ui) {
    // Get the task id from the event
    const taskId = ui.draggable[0].dataset.taskId;

    // Get the id of the lane that the card was dropped into
    const newStatus = event.target.id;

    for (let task of taskList) {
        // Find the task card by the `id` and update the task status
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }

    // Save the updated tasks array to localStorage (overwritting the previous one)
    localStorage.setItem('tasks', JSON.stringify(taskList));
    // Render the new task data to the screen
    renderTaskList();
}

/*
  When the page loads, render the task list to the screen and make the lanes droppable.
  An event listener is included for form submission, which will create a task.
  Initializes the date picker for the due date field.
*/
$(document).ready(function () {
    // Print task data to the screen on page load if there is any
    renderTaskList();
    
    // Event listener for form submission
    $('#taskForm').on('submit', handleAddTask);

    // Make lanes droppable
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
    
    // Date picker for due date field
    $('#taskDueDate').datepicker({
        changeMonth: true,
        changeYear: true,
    });
});
