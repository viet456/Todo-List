import { Task } from 'src/features/tasks/task.js';
import { saveTask } from 'src/features/tasks/saveTask.js'; 
import { resizeTextArea } from 'src/features/tasks/domUtils.js';
import { notifyTasks, fileTask, getInboxProject } from 'src/features/projects';
import { Project } from 'src/features/projects';
import { showContextMenu } from 'src/shared/contextMenu';

export function renderTask(task, projectContext) {
    const wrapper = document.createElement('div');
    wrapper.className = 'task';
    wrapper.dataset.taskId = task.id;
    if (task.isCreator) {
        wrapper.classList.add('task-creator');
    }

    const taskBody = document.createElement('div');
    taskBody.className = 'task__body';

    const doneInput = document.createElement('input');
    doneInput.type = 'checkbox';
    doneInput.checked = task.done;
    doneInput.dataset.field = 'done';
    if (task.isCreator) {
        doneInput.style.visibility = 'hidden';
    } else {
        doneInput.addEventListener('change', () => {
            const updateResult = saveTask(doneInput, task);
            if (updateResult.changed || updateResult.deleted) {
                wrapper.dataset.changedSinceFocusIn = "true";
                notifyTasks();
            }
        });
    }

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = task.title || "";
    titleInput.placeholder = 'New task';
    titleInput.dataset.field = 'title';

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = task.dueDate || ""; 
    dateInput.dataset.field = 'dueDate';

    const priorityBtn = document.createElement('button');
    priorityBtn.classList.add("priority-btn");
    priorityBtn.dataset.field = 'priority';
    priorityBtn.setAttribute("aria-pressed", task.priority ? 'true' : 'false');
    priorityBtn.setAttribute("title", "Toggle priority");
    const flagFilledSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>flag-variant</title><path fill="currentColor" d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z" /></svg>`;
    const flagOutlineSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>flag-variant-outline</title><path fill="currentColor" d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3M7,7.25V11.5C7,11.5 9,10 11,10C13,10 14,12 16,12C18,12 18,11 18,11V7.5C18,7.5 17,8 16,8C14,8 13,6 11,6C9,6 7,7.25 7,7.25Z" /></svg>`;
    priorityBtn.innerHTML = task.priority ? flagFilledSVG : flagOutlineSVG;

    if (!task.isCreator) {
        priorityBtn.addEventListener('click', () => {
            const isPressed = priorityBtn.getAttribute('aria-pressed') === 'true';
            const newPressedState = !isPressed;
            priorityBtn.setAttribute('aria-pressed', newPressedState ? 'true' : 'false');
            priorityBtn.innerHTML = newPressedState ? flagFilledSVG : flagOutlineSVG;
            const updateResult = saveTask(priorityBtn, task);
            if (updateResult.changed) {
                wrapper.dataset.changedSinceFocusIn = "true";
            }
            notifyTasks();
        });
    } else {
        priorityBtn.addEventListener('click', () => {
            const isPressed = priorityBtn.getAttribute('aria-pressed') === 'true';
            priorityBtn.setAttribute('aria-pressed', !isPressed ? 'true' : 'false');
            priorityBtn.innerHTML = !isPressed ? flagFilledSVG : flagOutlineSVG;
        });
    }

    const notes = document.createElement('textarea');
    notes.value = task.notes || "";
    notes.placeholder = task.isCreator ? "Notes" : "Notes";
    notes.dataset.field = 'notes';
    resizeTextArea(notes);

    const tryCreateNewTask = () => {
        const currentTitle = titleInput.value.trim();
        if (currentTitle !== '') {
            const newTask = new Task(
                currentTitle,
                notes.value.trim(),
                dateInput.value || null,
                priorityBtn.getAttribute('aria-pressed') === 'true',
                false, false,
                projectContext 
            );
            fileTask(newTask, projectContext);
            titleInput.value = '';
            notes.value = '';
            dateInput.value = '';
            priorityBtn.setAttribute('aria-pressed', 'false');
            priorityBtn.innerHTML = flagOutlineSVG;
            resizeTextArea(notes);
            if (!task.isCreator) titleInput.focus(); 
        }
    };

    const taskHeader = document.createElement('header');
    taskHeader.classList.add('task__header');
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task__info');
    taskHeader.append(doneInput, titleInput, priorityBtn);
    taskInfo.append(notes, dateInput);
    taskBody.append(taskHeader, taskInfo);
    wrapper.append(taskBody);

    if (!task.isCreator) {
        const footerFields = [task.notes, task.dueDate];
        const isEmpty = footerFields.every(val => !val || (typeof val === 'string' && val.trim() === ''));
        if (isEmpty) wrapper.classList.add("collapsed");
    }

    wrapper.addEventListener('focusin', (e) => {
        if (task.isCreator) return;
        wrapper.classList.remove("collapsed");
        resizeTextArea(notes);
        wrapper.dataset.changedSinceFocusIn = "false";
    });

    wrapper.addEventListener('focusout', e => {
        const fieldEl = e.target;
        const prop = fieldEl.dataset.field;
        const relatedTarget = e.relatedTarget;

        if (task.isCreator) {
            if (relatedTarget === null || !wrapper.contains(relatedTarget)) {
                setTimeout(() => {
                    if (!wrapper.contains(document.activeElement)) {
                        tryCreateNewTask();
                    }
                }, 0);
            }
            return;
        }

        // --- REGULAR TASK focusout ---
        if (prop && prop !== 'done' && prop !== 'priority') { 
            const updateResult = saveTask(fieldEl, task);
            if (updateResult.changed || updateResult.deleted) {
                wrapper.dataset.changedSinceFocusIn = "true";
                if (updateResult.deleted) { 
                    notifyTasks(); 
                    return; 
                }
            }
        }

        setTimeout(() => {
            if (!wrapper.contains(document.activeElement)) {
                if (wrapper.dataset.changedSinceFocusIn === "true") {
                    notifyTasks();
                }
                const notesValue = notes.value.trim();
                const dueDateValue = dateInput.value;
                const isFooterEmpty = !notesValue && !dueDateValue;
                if (isFooterEmpty && !wrapper.classList.contains("collapsed")) {
                    wrapper.classList.add("collapsed");
                }
            }
        }, 0);
    });

    wrapper.addEventListener('keydown', e => {
        const fieldEl = e.target;
        const field = fieldEl.dataset.field;
        if (!field) return;

        if (task.isCreator && field === 'notes' && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); fieldEl.blur(); return;
        }
        if (field === 'notes' && e.key === 'Enter' && !e.shiftKey && !task.isCreator) {
            return;
        }
        if (e.key === 'Escape') {
            e.preventDefault(); fieldEl.blur(); return;
        }
        if (e.key === 'Enter') { 
            if (!task.isCreator && field === 'notes') return; 
            e.preventDefault();
            fieldEl.blur();
        }
    });
    wrapper.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopPropagation();
        const menuItems = [{
                    label: 'Delete',
                    action: () => {
                        task.project.deleteTask(task);
                    }
                }];
        showContextMenu(e.pageX, e.pageY, menuItems);
    });
    return wrapper;
}