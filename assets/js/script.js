// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
// Random ID generator - TODO check
function generateTaskId() {
    return crypto.randomUUID();
}

// Todo: create a function to create a task card
// Create task elements - TODO
function createTaskCard(task) {

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

    buttonEl.on('click', handleDeleteTask);

    // ? Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        // ? If the task is due today, make the card yellow. If it is overdue, make it red.
        if (now.isSame(taskDueDate, 'day')) {
            cardEl.addClass('bg-warning text-white');
        }
        
        else if (now.isAfter(taskDueDate)) {
            cardEl.addClass('bg-danger text-white');
            buttonEl.addClass('border-light');
        }
    }

    // TODO: Append the card description, card due date, and card delete button to the card body.
    cardBodyEl.append(cardDescriptionEl, cardDueDateEl, buttonEl);
    // TODO: Append the card header and card body to the card.
    cardEl.append(cardHeaderEl, cardBodyEl);
    // ? Return the card so it can be appended to the correct lane.
    return cardEl;
}

// Todo: create a function to render the task list and make cards draggable
// Local storage parse - TODO check
// List appending - TODO check
// Draggable feature - TODO check
function renderTaskList() {
    if (!taskList) {
        taskList = [];
    }

    // ? Empty existing project cards out of the lanes
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

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
    
      // ? Use JQuery UI to make task cards draggable
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
            // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

// Todo: create a function to handle adding a new task
// Add new task - TODO check
function handleAddTask(event){
    event.preventDefault();

    const taskTitle = $('#taskTitle').val();
    const taskDueDate = $('#taskDueDate').val();
    const taskDescription = $('#taskDescription').val();

    const task = {
        id: generateTaskId(),
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
        status: 'to-do'
    }

    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();

    $('#taskTitle').val('');
    $('#taskDueDate').val('');
    $('#taskDescription').val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    //event.preventDefault();

    const taskId = $(this).attr('data-task-id');
    console.log(`taskId = ${taskId}`);
    // TODO: Loop through the projects array and remove the project with the matching id.
    for (let task of taskList) {
        console.log(`task.id = ${task.id}`);
        if (task.id === taskId) {
            console.log(task);
            taskList.splice(taskList.indexOf(task), 1);
            console.log(taskList);
        }
    }

    // ? We will use our helper function to save the projects to localStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // ? Here we use our other function to print projects back to the screen
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // ? Read projects from localStorage
    // ? Get the project id from the event
    const taskId = ui.draggable[0].dataset.taskId;

    // ? Get the id of the lane that the card was dropped into
    const newStatus = event.target.id;

    for (let task of taskList) {
        // ? Find the project card by the `id` and update the project status.
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }
    // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// Render the task list - TODO check
// Add event listeners - TODO
// Make lanes droppable - TODO check
// Due date field date pick - DONE
$(document).ready(function () {
    // ? Print project data to the screen on page load if there is any
    renderTaskList();

    // ? Add event listener to the form element, listen for a submit event, and call the `handleProjectFormSubmit` function.
    // Form submit - works, TODO logic
    $('#taskForm').on('submit', handleAddTask);

    // TODO: Add an event listener to listen for the delete buttons. Use event delegation to call the `handleDeleteProject` function.
    // Button delete - TODO
    //$('').on('click', '.btn-delete-project', handleDeleteTask);

    // ? Make lanes droppable
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
    
    $('#taskDueDate').datepicker({
        changeMonth: true,
        changeYear: true,
    });
});
