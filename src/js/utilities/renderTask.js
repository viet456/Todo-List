import { Task } from '@js/utilities/task.js'; 
import { saveTask } from '@js/utilities/saveTask.js';  
import { resizeTextArea } from '@js/utilities/domUtils.js';
import { getInboxProject, notifyTasks } from '@js/utilities/projectService.js';  
import { fileTask } from './projectService';

// renders a task from its data

export function renderTask(task, projectContext) { // projectContext is the currently active project
    const wrapper = document.createElement('div');
    wrapper.className = 'task'; 
    wrapper.dataset.taskId = task.id; 
    if (task.isCreator) {
        wrapper.classList.add('task-creator'); 
    }

    const taskBody = document.createElement('div');
    taskBody.className = 'task__body'; 

    // Done: toggle yes/no
    const doneInput = document.createElement('input');
    doneInput.type = 'checkbox'; 
    doneInput.checked = task.done; 
    doneInput.dataset.field = 'done'; 
    if (task.isCreator) {
        doneInput.style.visibility = 'hidden'; 
    } else {
        doneInput.addEventListener('change', () => { 
            saveTask(doneInput, task); 
        });
    }

    // Title: single-line input
    const titleInput = document.createElement('input');
    titleInput.type = 'text'; 
    titleInput.value = task.title;  
    titleInput.placeholder = 'New task'; 
    titleInput.dataset.field = 'title';    

    // Due date: date picker
    const dateInput = document.createElement('input');
    dateInput.type = 'date'; 
    dateInput.value = task.dueDate; 
    dateInput.dataset.field = 'dueDate'; 

    // Priority: toggle yes/no
    const priorityBtn = document.createElement('button');
    priorityBtn.classList.add("priority-btn"); 
    priorityBtn.dataset.field = 'priority'; 
    priorityBtn.setAttribute("aria-pressed", task.priority ? 'true' : 'false');  
    priorityBtn.setAttribute("title", "Toggle priority"); 

    const flagFilledSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>flag-variant</title>
                        <path fill="currentColor" d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z" />
                        </svg>`; 
    const flagOutlineSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>flag-variant-outline</title>
                        <path fill="currentColor" d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3M7,7.25V11.5C7,11.5 9,10 11,10C13,10 14,12 16,12C18,12 18,11 18,11V7.5C18,7.5 17,8 16,8C14,8 13,6 11,6C9,6 7,7.25 7,7.25Z" />
                        </svg>`; 
    priorityBtn.innerHTML = task.priority ? flagFilledSVG : flagOutlineSVG; 

    if (!task.isCreator) {
        priorityBtn.addEventListener('click', (e) => { 
            const isPressed = priorityBtn.getAttribute('aria-pressed') === 'true';  
            const newPressedState = !isPressed; 
            priorityBtn.setAttribute('aria-pressed', newPressedState ? 'true' : 'false'); 
            priorityBtn.innerHTML = newPressedState ? flagFilledSVG : flagOutlineSVG; 
            saveTask(priorityBtn, task); 
        });
    } else {
         priorityBtn.addEventListener('click', (e) => {
            const isPressed = priorityBtn.getAttribute('aria-pressed') === 'true';
            const newPressedState = !isPressed;
            priorityBtn.setAttribute('aria-pressed', newPressedState ? 'true' : 'false');
            priorityBtn.innerHTML = newPressedState ? flagFilledSVG : flagOutlineSVG;
        });
    }


    // notes: multi-line textarea
    const notes = document.createElement('textarea');
    notes.value = task.notes; 
    notes.placeholder = 'Notes'; 
    notes.dataset.field = 'notes'; 
    resizeTextArea(notes); 

    // Helper to create a new task from creator inputs
    const tryCreateNewTask = () => {
        const title = titleInput.value.trim();
        if (title !== '') {
            const newTask = new Task(
                title,
                notes.value.trim(),
                dateInput.value || null,
                priorityBtn.getAttribute('aria-pressed') === 'true'
            );
            fileTask(newTask, projectContext);            
        }
    };

    // task element sections
    const taskHeader = document.createElement('header');
    taskHeader.classList.add('task__header'); 
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task__info'); 

    taskHeader.append(doneInput, titleInput, priorityBtn); 
    taskInfo.append(notes, dateInput); 
    taskBody.append(taskHeader, taskInfo);  
    wrapper.append(taskBody); 

    // set class for collapsing if footer is empty
    if (!task.isCreator) {
        const footerFields = [task.notes, task.dueDate]; 
        const isEmpty = footerFields.every(val => !val || val === ''); 
        if (isEmpty) wrapper.classList.add("collapsed"); 
    } else {
        doneInput.style.visibility = 'hidden';
        notes.placeholder = "Notes";
    }
    
    // expand when task focused on (delegated to wrapper)
    wrapper.addEventListener('focusin', (e) => { 
        if (task.isCreator) return; 
        const prop = e.target.dataset.field; 
        if (prop !== 'done' && prop !== 'priority') {  
            wrapper.classList.remove("collapsed"); 
            resizeTextArea(notes); 
        }
    });
    
    // save field when focusout (delegated to wrapper)
    wrapper.addEventListener('focusout', e => {  
        const fieldEl = e.target; 
        const prop = fieldEl.dataset.field; 

        if (task.isCreator) {
            if (prop === 'title' && !wrapper.contains(e.relatedTarget)) {
                tryCreateNewTask();
            }
            return; 
        }

        // Logic for REAL tasks:
        if (prop !== 'done' && prop !== 'priority') { 
            if (task.title.trim() !== '' || prop !== 'title') {
                 saveTask(fieldEl, task); 
            } else if (task.title.trim() === '' && prop === 'title') {
                saveTask(fieldEl, task); 
            }
        }
        // if focus left the task (for real tasks)
        if (!wrapper.contains(e.relatedTarget)) { 
            const isFooterEmpty = !task.notes && !task.dueDate; // 
            if (isFooterEmpty) { 
                wrapper.classList.add("collapsed"); 
            }
        }
    });

    // save input field on enter or escape key (delegated to wrapper)
    wrapper.addEventListener('keydown', e => { 
        const fieldEl = e.target; 
        const field = fieldEl.dataset.field; 
        if (!field) return; 
        if (e.key === 'Enter' || e.key === 'Escape') { 
            e.preventDefault();
            if (task.isCreator && field === 'title') {
                fieldEl.blur();
                return;
            }
        }
        if (!task.isCreator) {
            if (e.key === 'Enter' && field === 'notes' && !e.shiftKey) {
                return;
            }
            fieldEl.blur();
        }
    });

    return wrapper;
}