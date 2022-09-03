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
    let projectArray = [];
    
    let currentProjectID = 'project0';
    // console.log(Array.isArray(currentProjectID));
    

    let defaultProject = projectFactory('First Project');


    const popup = makePopupDOM('makeProject');
    
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

    const taskPopup = makePopupDOM('makeTask');
    let defaultTask = makeTaskDOM('Default task', '', 'low', '7.24.22');
    taskContainer.appendChild(defaultTask);

    let addTask = document.createElement('div');
    addTask.id = 'addTask';
    addTask.innerHTML = '+ Add a new task';
    addTask.addEventListener('click', () => taskPopup.showModal());

    
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

    // //sidebar stuff
    function makePopupDOM(format) {
        // console.log(currentProjectID);

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
                // console.log(textarea.value);
                if (textarea.value != '') {
                    projectFactory(textarea.value, projectNO);
                    projectNO++;
                }
                else {
                    alert('Project must be named');
                }
                //might need counter projectFactory(textarea.value, container, projectNO, currentProjectID, projectArray);
                // counter++;
            })

            sidebar.appendChild(popup);
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
                // console.log(datePicker.value);
                // let tempProject = currentProjectID[0];
                // console.log(tempProject);
                let currentProject = projectArray[0];
                // console.log(currentProject.id);
                console.log(projectArray[0]);

                let taskCard = makeTaskDOM(textarea.value, detailsTextArea.value, priorityBtn.value, datePicker.value);
                taskContainer.appendChild(taskCard);
            });

            main.appendChild(popup);
        }

        return popup
    }
    
    function makeTaskDOM(title, details, priority, dueDate) {
        const taskCard = document.createElement('div');
        // taskCard.id = taskID;
        // let taskClass = title + 'Task';
        // taskClass = taskClass.replace(/\s/g, '');
        // console.log(currentProjectID);
        // let tempID = getCurrentProjectID();
        // console.log(tempID);
        // taskCard.classList.add(taskClass);
        let taskClass = currentProjectID + 'Task';
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
    
    
    
        let taskDueDate = document.createElement('div');
        taskDueDate.classList.add('taskDueDate');
        taskDueDate.innerHTML = dueDate.replace(/\.|\-/g ,'/');
    
    
    
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

    function projectFactory(title, projectNO) {
        let thing = document.createElement('div');

        if (projectNO == undefined) {
            thing.id = 'project0';
        }
        else {
            thing.id = 'project' + projectNO;
        }

        thing.innerHTML = title;
        thing.classList.add('projects');
        const taskList = [];
    
        //Use to check if projectFactory is making projects with the correct ID
        // console.log('thingid = ' + thing.id);
    
        projectArray.push(thing);
        
        thing.addEventListener('click', () => {
            currentProjectID = thing.id;

            //Hides all tasks 
            let allTasks = document.getElementsByClassName('task');
            let allTasksArray = Array.from(allTasks);
            for (let i = 0; allTasksArray[i] != null; i++) {
                allTasksArray[i].style.display = 'none';
            }

            
            let myTasks = document.getElementsByClassName(thing.id + 'Task');
            // console.log(myTasks);
            let myArray = Array.from(myTasks);
            // console.log(myArray);
            for (let i = 0; myArray[i] != null; i++) {
                myArray[i].style.display = 'grid';
            }

            // let taskList = document.getElementsByClassName('task');
            

            // let taskDisplayYes = document.getElementsByClassName('')
            // for (const task in taskList) {
            //     let taskClass = currentProjectID + 'Task';
            //     if (task.classList.contains(taskClass)) {
            //         task.style.display = 'grid';
            //     }
            //     else {
            //         task.style.display = 'none';
            //     }
            // }
            

        });
        
        
        
        let taskID = 0;
        // const addTask = (title, details, dueDate, priority, taskID, taskContainer) => {
        //     // console.log('ello');
        //     let task = makeTaskDOM(title, details, dueDate, priority, taskID);
        //     // console.log(task);
    
        //     // console.log(taskContainer);
            // taskContainer.appendChild(task);
        // }
        // console.log(thing);
        projectContainer.appendChild(thing);
        
    
        // return {addTask};    
    }
}







// function getCurrentProjectID(currentProjectID) {
    

    
//     if (currentProjectID != undefined) {
//         let num = currentProjectID;
//     }
    
//     // console.log(currentProjectID + 'changer');
//     return num
// }

  document.body.appendChild(component());