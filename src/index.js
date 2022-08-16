import './style.css';
// import Icon from './img.png';


function component() {
    let element = contentGen();

    



    //Footer stuff
//   const footer = document.createElement('div');
//   footer.id = 'footer';
//   footer.innerHTML = 'Copyright © 2022 PhlegmMignon'
//   content.appendChild(footer);

//   const mark = new Image();
//   mark.src = Icon;
//   mark.id = 'mark';

//   let aTag = document.createElement('a');
//   aTag.setAttribute('href', 'https://github.com/PhlegmMignon');
//   aTag.appendChild(mark);
//   footer.appendChild(aTag);

return element

}

function contentGen() {
    const content = document.createElement('div');
    content.id = 'content';


    let sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    
    const text = document.createElement('div');
    text.id = 'leftHeader';
    text.innerHTML = 'Projects';
    sidebar.appendChild(text);


    let projectContainer = document.createElement('div');
    projectContainer.id = 'projectContainer';
    sidebar.appendChild(projectContainer);
    
    //Needed to assign tasks to a project
    
    let defaultProject = projectFactory('First Project', projectContainer, '0', 'firstProject');

    let currentProjectID = '0';

    const popup = makePopupDOM(sidebar, projectContainer, 'makeProject', currentProjectID, projectFactory);
    
    const addProjectBtn = document.createElement('button');
    addProjectBtn.id ='addProjectBtn';
    addProjectBtn.innerHTML = 'Create a project';
    addProjectBtn.addEventListener('click', () => popup.showModal());
    sidebar.appendChild(addProjectBtn);

    //Click on each project changes main


    //Creates right side
    let main = document.createElement('div');
    main.id = 'main';

    let rightHeader = document.createElement('div');
    rightHeader.id = 'rightHeader';
    rightHeader.innerHTML = 'Task List';

    let taskContainer = document.createElement('div');
    taskContainer.id = 'taskContainer';

    // const popup = makePopupDOM(main, taskContainer, 'makeTask');
    let defaultTask = defaultProject.addTask('Default task', '', '7.24.22', 'low', '0', taskContainer);

    let addTask = document.createElement('div');
    addTask.id = 'addTask';
    addTask.innerHTML = '+ Add a new task';
    addTask.addEventListener('click', () => popup.showModal());

    
    // addTask.addEventListener('click', )



    
    
    //Default project opened
    //Task gen DOM + factory
        //Delete project button on main page at top
        //Contains title, description, due date, priority
            //Priority turns left side of box red

    //Add task function

    main.appendChild(rightHeader);
    main.appendChild(taskContainer);
    main.appendChild(addTask);

    content.appendChild(sidebar);
    content.appendChild(main);
    return content
    
    //Right side stuff

}

// //sidebar stuff
function makePopupDOM(side ,container, format, currentProjectID, projectFactory) {
    const popup = document.createElement('DIALOG');

    const popupHeader = document.createElement('div');

    
    const popupForm = document.createElement('FORM');
    popupForm.method = 'get';
    popupForm.action = './index.html';
    const textarea = document.createElement('TEXTAREA');
    textarea.classList.add('textarea');
    textarea.placeholder = 'Title...';
    textarea.required = true;
    popupForm.appendChild(textarea);

    const popupContainer = document.createElement('div');

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.innerHTML = 'Submit';
    submitBtn.classList.add('submitBtn');

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.innerHTML = 'Cancel';
    closeBtn.classList.add('closeBtn');
    closeBtn.addEventListener('click', () => {popup.close()});

    popup.appendChild(popupHeader);
    popup.appendChild(popupForm);
    popupContainer.appendChild(submitBtn);
    popupContainer.appendChild(closeBtn);
    popupForm.appendChild(popupContainer);
    
    if (format == 'makeProject') {
        popup.id = 'projectPopup';
        popupHeader.innerHTML = 'New Project';
        popupHeader.id = 'projectPopupHeader';

        popupForm.id = 'projectPopupForm';
        popupContainer.id = 'projectPopupContainer';
        // submitBtn.id = 'projectSubmitBtn';
        // closeBtn.id = 'projectCloseBtn';

        let projectNO = 1;
        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(textarea.value);
            if (textarea.value != '') {
                projectFactory(textarea.value, container, projectNO, currentProjectID);
                projectNO++;
            }
            else {
                alert('Project must be named');
            }
            //might need counter 
            // counter++;
        })

        side.appendChild(popup);
    }
    else if (format =='makeTask') {
        popup.id = 'taskPopup';
        popupHeader.innerHTML = 'New Task';
        popupHeader.id = 'taskPopupHeader';

        popupForm.id = 'taskPopupForm';
        popupContainer.id = 'taskPopupContainer';

        textarea.id = 'titleTextArea';
        const detailsTextArea = document.createElement('TEXTAREA');
        detailsTextArea.id = 'detailsTextArea';
        detailsTextArea.classList.add('textarea');
        detailsTextArea.placeholder = 'Details...';
        detailsTextArea.required = true;
        popupForm.insertBefore(detailsTextArea, popupContainer);

        let priorityBtn = document.createElement('button');
        priorityBtn.classList.add('priorityBtn');
        priorityBtn.type = 'button';
        priorityBtn.value = 'low';
        priorityBtn.innerHTML = 'Low';
        priorityBtn.addEventListener('click', () => {
            if (priorityBtn.value == 'low') {
                priorityBtn.innerHTML = 'High';
                priorityBtn.value = 'high';
            }
            else if (priorityBtn.value == 'high') {
                priorityBtn.innerHTML = 'Low';
                priorityBtn.value = 'low';
            }
        });
        popupContainer.appendChild(priorityBtn);

        let datePicker = document.createElement('INPUT');
        datePicker.setAttribute('type', 'date');
        datePicker.id = 'datePicker';
        datePicker.required = true;
        popupContainer.appendChild(datePicker);



        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(datePicker.value);
            let currentProject = document.getElementById(currentProjectID);
            document.getElementById(currentProjectID).addTask(textarea.value, detailsTextArea.value, priorityBtn.value, datePicker.value);
        });

        side.appendChild(popup);
    }

    return popup
}

function makeTaskDOM(title, details, dueDate, priority, taskID) {
    const taskCard = document.createElement('div');
    taskCard.id = taskID;
    let taskClass = title + 'Task';
    taskClass = taskClass.replace(/\s/g, '');
    // console.log(taskClass);
    taskCard.classList.add(taskClass);
    taskCard.classList.add('task');
    
    const taskText = document.createElement('div');
    taskText.innerHTML = title;
    taskText.classList.add('taskText');
    
    const taskDetails = document.createElement('div');
    taskDetails.innerHTML = details;
    taskDetails.classList.add('taskDetails');
    
    const taskDetailsBtn = document.createElement('button');
    
    
    const taskPriorityBtn = document.createElement('button');
    taskPriorityBtn.innerHTML = priority;
    taskPriorityBtn.classList.add('taskPriorityBtn');
    taskPriorityBtn.addEventListener('click', () => {
        if (priority == 'low') {
            priority = 'high';
            taskPriorityBtn.innerHTML = 'high';
        }
        else {
            priority = 'low';
            taskPriorityBtn.innerHTML = 'low';
        }
    });



    let taskDueDate = document.createElement('INPUT');
    taskDueDate.setAttribute('type', 'date');
    taskDueDate.classList.add('taskDueDate');

    const deleteBtn = document.createElement('div');
    deleteBtn.innerHTML = 'X';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        taskCard.remove();
    });




    taskCard.appendChild(taskText);
    taskCard.appendChild(taskDetails);
    taskCard.appendChild(taskPriorityBtn);
    taskCard.appendChild(taskDueDate);
    taskCard.appendChild(deleteBtn);

     

    return taskCard
}

function projectFactory(title, projectContainer, projectNO, currentProjectID) {
    let thing = document.createElement('div');
    thing.id = 'project' + projectNO;
    thing.innerHTML = title;
    thing.classList.add('projects');
    const taskList = [];
    
    thing.addEventListener('click', () => {
        currentProjectID = thing.id;
    });
    
    
    
    let taskID = 0;
    const addTask = (title, details, dueDate, priority, taskID, taskContainer) => {
        // console.log('ello');
        let task = makeTaskDOM(title, details, dueDate, priority, taskID);
        // console.log(task);

        console.log(taskContainer);
        taskContainer.appendChild(task);
    }
    console.log(thing);
    projectContainer.appendChild(thing);
    

    return {addTask};    
}














  document.body.appendChild(component());