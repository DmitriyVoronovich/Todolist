import { tasksReducer } from './tasksReducer';
import { addTask, removeTask, changeTaskStatus, changeTaskTitleValue, addTaskToTodolist } from './tasksReducer';

describe('Tasks Reducer', () => {
    const initialState = {
        todolist1: [
            { id: '1', title: 'Task 1', isDone: false },
            { id: '2', title: 'Task 2', isDone: true },
        ],
        todolist2: [
            { id: '3', title: 'Task 3', isDone: false },
        ],
    };

    it('should handle ADD-TASK action', () => {
        const action = addTask('todolist1', 'New Task');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolist1']).toHaveLength(3);
        expect(newState['todolist1'][0].title).toBe('New Task');
        expect(newState['todolist1'][0].isDone).toBe(false);
    });

    it('should handle REMOVE-TASK action', () => {
        const action = removeTask('todolist1', '1');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolist1']).toHaveLength(1);
        expect(newState['todolist1'].find(task => task.id === '1')).toBeUndefined();
    });

    it('should handle CHANGE-TASK-STATUS action', () => {
        const action = changeTaskStatus('todolist1', '2', false);
        const newState = tasksReducer(initialState, action);

        expect(newState['todolist1'][1].isDone).toBe(false);
    });

    it('should handle CHANGE-TASK-TITLE-VALUE action', () => {
        const action = changeTaskTitleValue('todolist1', '1', 'Updated Task');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolist1'][0].title).toBe('Updated Task');
    });

    it('should handle ADD-TASK-TO-TODOLIST action', () => {
        const action = addTaskToTodolist('newTodolistId');
        const newState = tasksReducer(initialState, action);

        expect(newState['newTodolistId']).toEqual([]);
    });
});
