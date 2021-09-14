export default class TodoService {
  static url = "http://localhost:3001/todos/";

  /**
   * Persists a new task
   * @param {*} newTask
   */
  static addTask(newTask) {
    return fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    });
  }

  /**
   * Updates an existing task. Only completed and the title can be changed.
   * @param {*} modifiedTask
   * @returns
   */
  static updateTask(modifiedTask) {
    return fetch(this.url + modifiedTask.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifiedTask)
    });
  }
}
