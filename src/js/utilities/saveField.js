import { Project } from "@js/utilities/project";

export function saveField(fieldEl, task) {
    let prop = fieldEl.dataset.field;
    //if not a task property then ignore
    if (!prop) return;

    let value;
    if (fieldEl.type === 'checkbox') {
        value = fieldEl.checked;
    } else if (fieldEl.type === 'date') {
        //convert date to JS date and store if it exists
        value = fieldEl.value 
                ? new Date(fieldEl.value).toLocaleDateString()
                : null;
    } else {
        //for text inputs remove white space
        value = fieldEl.value.trim();
    }
    console.log('saved', value, 'to', fieldEl.dataset.field)
    task[prop] = value;
    
}