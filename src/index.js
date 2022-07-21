import './style.css';
// import Icon from './img.png';


function component() {
    let element = contentGen();


    let main = rightGen();

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

    const popup = makeProjectDOM(sidebar);
    
    const addProjectBtn = document.createElement('button');
    addProjectBtn.id ='addProjectBtn';
    addProjectBtn.innerHTML = 'Create a project';
    addProjectBtn.addEventListener('click', () => popup.showModal());
    sidebar.appendChild(addProjectBtn);

    //Click on each project changes main





    content.appendChild(sidebar);
    return content
    

    function projectFactory(title, container) {
        let thing = document.createElement('div');
        thing.id = title;
        thing.innerHTML = title;
        thing.classList.add('projects');
        const taskList = [];
    
        const addTask = () => {
            
        }

        

        container.appendChild(thing);
        return {title, taskList, addTask};
    }

    //sidebar stuff
    function makeProjectDOM(sidebar) {
        const popup = document.createElement('DIALOG');
        popup.id = 'popup';

        const popupHeader = document.createElement('div');
        popupHeader.id = 'popupHeader';
        popupHeader.innerHTML = 'New Project';

        
        const popupForm = document.createElement('FORM');
        popupForm.id = 'popupForm';
        popupForm.method = 'get';
        popupForm.action = './index.html';
        const textarea = document.createElement('TEXTAREA');
        textarea.id = 'textarea';
        popupForm.appendChild(textarea);

        const popupContainer = document.createElement('div');
        popupContainer.id = 'popupContainer';

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.id = 'submitBtn';
        submitBtn.innerHTML = 'Submit';

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.id = 'closeBtn';
        closeBtn.innerHTML = 'Cancel';
        closeBtn.addEventListener('click', () => {popup.close()});

        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(textarea.value);
            projectFactory(textarea.value, projectContainer);
            //might need counter 
            // counter++;
        })
        
        popup.appendChild(popupHeader);
        popup.appendChild(popupForm);
        popupContainer.appendChild(submitBtn);
        popupContainer.appendChild(closeBtn);
        popupForm.appendChild(popupContainer);
        sidebar.appendChild(popup);

        return popup
    }




    //Right side stuff

}

function rightGen() {
    let element = document.createElement('div');
    element.id = 'main';
    
    //Default project opened
    //Task gen DOM + factory
        //Delete project button on main page at top
        //Contains title, description, due date, priority
            //Priority turns left side of box red

    //Add task function

    return element
}





















  document.body.appendChild(component());