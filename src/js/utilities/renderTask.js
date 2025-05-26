import { Task } from '@js/utilities/task.js'
import { saveTask } from '@js/utilities/saveTask';
import { showTaskMenu } from '@js/components/taskMenu.js'
import '@css/utilities/tasks.css'
import { resizeTextArea } from '@js/utilities/domUtils';

export function renderTask(task) {
    const wrapper = document.createElement('div');
    wrapper.className = 'task'
    wrapper.dataset.taskId = task.id;

    // Done: toggle yes/no
    const doneInput = document.createElement('input');
    doneInput.type = 'checkbox';
    doneInput.checked = task.done;
    doneInput.dataset.field = 'done';

    // Title: single-line input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = task.title; 
    titleInput.dataset.field = 'title';   

    // Due date: date picker
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = task.dueDate;
    dateInput.dataset.field = 'dueDate';

    // Priority: toggle yes/no
    const prioInput = document.createElement('input');
    prioInput.type = 'checkbox';
    prioInput.checked = task.priority;
    prioInput.dataset.field = 'priority';

    // notes: multi-line textarea
    const notes = document.createElement('textarea');
    notes.value = task.notes;
    notes.placeholder = 'Notes';
    notes.dataset.field = 'notes';
    resizeTextArea(notes);

    // task element sections
    const taskHeader = document.createElement('header');
    taskHeader.classList.add('task__header');
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task__info');
    taskHeader.append(doneInput, titleInput, prioInput);
    taskInfo.append(notes, dateInput);
    wrapper.append(taskHeader, taskInfo);
    resizeTextArea(notes);

    // set class for collapsing if footer is empty
    const footerFields = [task.notes, task.dueDate];
    const isEmpty = footerFields.every(val => !val || val === '');
    if (isEmpty) wrapper.classList.add("collapsed");
    // expand when task focused on
    wrapper.addEventListener('focusin', (e) => {
        wrapper.classList.remove("collapsed");
        resizeTextArea(not);
    });
    wrapper.addEventListener('focusout', e => {
        let fieldEl = e.target;
        saveTask(fieldEl, task);
        // if focus left the task
        if (!wrapper.contains(e.relatedTarget)) {
            const isFooterEmpty = !task.notes && !task.dueDate;
            // then collapse if empty
            if (isFooterEmpty) {
                wrapper.classList.add("collapsed");
            }
        }
    });

    // save input field on enter or escape key
    wrapper.addEventListener('keydown', e => {
        const fieldEl = e.target;
        const field = fieldEl.dataset.field;
        if (!field) return;
        if (e.key !== 'Enter' && e.key!== 'Escape') return;
        // ignore 'Enter' in textareas to allow for new lines
        if (fieldEl.dataset.field === 'notes' && e.key === 'Enter') {
            return;
        }
        e.preventDefault();
        fieldEl.blur();
    });
    
    // delete task on rightclick
    wrapper.addEventListener('contextmenu', e => {
        // prevent regular rightclick menu
        e.preventDefault();
        // show new menu at mouse position
        showTaskMenu(e.pageX, e.pageY, task);
    });
    return wrapper;
}