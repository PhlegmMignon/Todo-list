import './style.css';
// import Icon from './img.png';


function component() {
    let element = contentGen();

    //How do I link the left project and it's list items on the right gen if they're 
    //in 2 different generators? I should add function in the factory when called it'll
    //add a list item to the object



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


    const projectContainer = document.createElement('div');
    projectContainer.id = 'projectContainer';
    sidebar.appendChild(projectContainer);

    let defaultProject = projectFactory('First Project', projectContainer);

    const popup = makePopupDOM(sidebar, projectContainer, 'makeProject');
    
    const addProjectBtn = document.createElement('button');
    addProjectBtn.id ='addProjectBtn';
    addProjectBtn.innerHTML = 'Create a project';
    addProjectBtn.addEventListener('click', () => popup.showModal());
    sidebar.appendChild(addProjectBtn);

    //Click on each project changes main


    //Creates right side
    let main = document.createElement('div');
    main.id = 'main';
    taskGen(defaultProject, main);



    content.appendChild(sidebar);
    content.appendChild(main);
    return content
    
    //Right side stuff

}

function taskGen(project, main) {
    let rightHeader = document.createElement('div');
    rightHeader.id = 'rightHeader';
    rightHeader.innerHTML = 'Task List';

    let taskContainer = document.createElement('div');
    taskContainer.id = 'taskContainer';

    const popup = makePopupDOM(main, taskContainer, 'makeTask');
    let defaultTask = project.addTask('Default task', '', '7.24.22', 'low');

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
    
    return main
}

//sidebar stuff
function makePopupDOM(side ,container, format) {
    const popup = document.createElement('DIALOG');

    const popupHeader = document.createElement('div');

    
    const popupForm = document.createElement('FORM');
    popupForm.method = 'get';
    popupForm.action = './index.html';
    const textarea = document.createElement('TEXTAREA');
    textarea.classList.add('textarea');
    textarea.placeholder = 'Title...';
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

        let projectNO = 0;
        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(textarea.value);
            if (textarea.value != '') {
                projectFactory(textarea.value, container, projectNO);
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
        popupForm.insertBefore(detailsTextArea, popupContainer);


        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(textarea.value);
            // projectFactory(textarea.value, container, );
            //might need counter 
            // counter++;
        })

        side.appendChild(popup);
    }

    return popup
}

function makeTaskDOM(title, details, dueDate, priority, taskID) {
    const taskCard = document.createElement('div');
    taskCard.id = taskID;

    const taskPriority = document.createElement('div');

    const taskText = document.createElement('div');
    taskText.innerHTML = title;

    const taskDetails = document.createElement('div');

    const taskDetailsBtn = document.createElement('button');

    const taskPriorityBtn = document.createElement('button');


     

    return taskCard
}

function projectFactory(title, container, projectNO) {
    let thing = document.createElement('div');
    thing.id = 'project' + projectNO;
    thing.innerHTML = title;
    thing.classList.add('projects');
    const taskList = [];
    
    let taskID = 0;
    const addTask = (title, details, dueDate, priority, taskID) => {
        let task = makeTaskDOM();
        container.appendChild(task);
    }
    
    container.appendChild(thing);
    return {title, taskList, addTask};    
}














  document.body.appendChild(component());