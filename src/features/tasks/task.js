export class Task {
    constructor(title, notes, dueDate, priority = false, done = false, isCreator = false) {
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
        this.isCreator = isCreator;
        this.id = crypto.randomUUID();
    }
    toJSON() {
        const { project, ...plain } = this; 
        return plain;                       
    }
}