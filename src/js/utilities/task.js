export class Task {
    constructor(title, notes, dueDate, priority = false, done = false) {
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
        this.id = crypto.randomUUID();
    }
}