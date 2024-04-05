# Task Board Challenge - Scheduling Made Easier

## Description

This is a simple task board application that allows a team to manage project tasks. You'll be able to keep track of due dates and progress. This app will run in the browser and feature dynamically updated HTML and CSS powered by utilizing jQuery UI to make the application more interactive and user-friendly.

The application features the following functions:

- generateTaskId: This function will generate a random UUID (Universal Unique IDentifier) for each task.  A tool called `crypto` is used to generate the random UUID, which can be used to find the task in the array.  The tool `crypto` is a built-in module that we can use in the browser and Nodejs.

- createTaskCard: This function will create a task card from the information passed in `task` parameter and returns it.  It creates the appropriate element tags for each field and appends it to the correct elements before being returned and appended to the appropriate lane.

- renderTaskList: This function renders the task list display to the UI and makes cards draggable.

- handleAddTask: This function will detect an add task event when the modal form is submitted with user input.  It adds a task to local storage and prints the task data.

- handleDeleteTask: This function will detect a delete event when the delete button on a task is pressed.  It removes a task from local storage and prints the task data back to the page.

- handleDrop: This function will detect a draggable event and where in the UI it is dropped.  This function is called when a card is dropped into a lane.  It updates the status of the task and saves it to localStorage. 

## Installation

No installation is required!  This code has been deployed to GitHub Pages so that you can view it on your own device.  To do so, please visit the following link: https://kitkatbar.github.io/task-board-challenge/

## Usage

Please refer to the following image showing the functionality of the application.  When the page is first loaded, the task board should be empty as the user has no entered any data yet.  There will be an "Add Task" button.

![Image displaying the layout of the task board on initial loadout for first time users](https://github.com/KitKatBar/task-board-challenge/blob/main/assets/images/task-board-inital-display.png?raw=true)

When the "Add Task" button is pressed, a modal form will be presented.  In the form, you will see the fields "Task Title", "Task Due Date" and "Task Description".  The "Task Title" and "Task Description" fields will take in text input while the "Task Due Date" will use a date picker to enter the date.  Attempting to press the "Add Task" button without filling out the form completely will trigger a validation error, which tells the user to field out the unfilled fields.

![Image displaying the modal form popup when the first 'Add Task' button is pressed](https://github.com/KitKatBar/task-board-challenge/blob/main/assets/images/task-board-modal-form.png?raw=true)

![Image displaying the form validation error message when attempting to submit an unfilled form](https://github.com/KitKatBar/task-board-challenge/blob/main/assets/images/task-board-form-validation.png?raw=true)

Once the form is properly filled out and the "Add Task" button is clicked, all the user data inputted will be submitted and a task card display is created for the cards.  The task cards will initially be placed into the "To Do" lane on the left side.  They can be dragged to the "In Progress" and "Done" lanes, which removes the task card from the lane it was previously in and displays it to the lane it was dragged to.  This is done by using a cloning feature.  Any task cards in the "To Do" and "In Progress" lanes will display a certain color depending on the deadline of the due date inputted.  If the due date is more than a day, the color will be white.  If the due date is within a day, the color will be yellow.  If the due date is past, the color will be yellow.  Any task cards in the "Done" lane will always have a color of white regardless of the due date.

![Image displaying layout of the task board with tasks in each lane and color coded according to the due date](https://github.com/KitKatBar/task-board-challenge/blob/main/assets/images/task-board-display-tasks.png?raw=true)

Clicking on the "Delete" button will remove the task card from the display and also remove it from the local storage in the browser.  As such, reloading the page will not add the card back because it is correctly removed from the local storage and thus will not be read when rendering the display (it can't be read if it's no longer there).

## Credits

Bootstrap Documentation for helping create the modal form and input validation: https://getbootstrap.com/docs/5.1/getting-started/introduction/

The mini-project in class where we needed to build a project management board.  Majority of the technology we used was pretty much the same so I was able to apply the skills I learned to this module.

Our instructor Drew Hoang for introducing us to a new way of doing Javascript by using jQuery, Bootstrap and all the fun built-ins tools and libraries to make our lives easier.  It makes surviving the previous week seem a bit comical, but we're also appreciative that we're able to learn the basic fundamentals before diving into using all these advanced techniques.  His speed-run videos are also very insightful for providing information and for reviewing class material.

Our TA Kyle Vance for his continued guidance during class and taking the time to help out students individually with any questions regarding the class material or module assignments.  He also provides help on the module assignments and helps explain the criteria so we can better understand what we need to do.

Me for taking the extra time to look up how to do modal form validation even though it wasn't a requirement in the criteria.  Although I could've finished this module in half the time it took me, I wanted to once again consider the user experience by adding in an extra function that prevents them from adding in blank input. 🙂

## License

This project was built using the MIT License.  Please refer to the LICENSE in the repo for more information.