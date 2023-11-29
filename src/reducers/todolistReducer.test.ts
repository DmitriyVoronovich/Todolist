import { todolistReducer } from './todolistReducer';
import { changeFilter, removeTodolist, changeTodolistTitle, addTodolist } from './todolistReducer'
import {FilterType} from "../App";

describe('Todolist Reducer', () => {
    const initialState = [
        { id: '1', title: 'First Todo', filter: FilterType.ALL },
        { id: '2', title: 'Second Todo', filter: FilterType.ALL },
    ];

    it('should handle CHANGE-FILTER action', () => {
        const action = changeFilter('1', FilterType.COMPLETED);
        const newState = todolistReducer(initialState, action);

        expect(newState[0].filter).toBe(FilterType.COMPLETED);
        expect(newState[1].filter).toBe(FilterType.ALL);
    });

    it('should handle REMOVE-TODOLIST action', () => {
        const action = removeTodolist('1');
        const newState = todolistReducer(initialState, action);

        expect(newState).toHaveLength(1);
        expect(newState[0].id).toBe('2');
    });

    it('should handle CHANGE-TODOLIST-TITLE action', () => {
        const action = changeTodolistTitle('1', 'Updated First Todo');
        const newState = todolistReducer(initialState, action);

        expect(newState[0].title).toBe('Updated First Todo');
        expect(newState[1].title).toBe('Second Todo');
    });

    it('should handle ADD-TODOLIST action', () => {
        const action = addTodolist('3', 'New Todo');
        const newState = todolistReducer(initialState, action);

        expect(newState).toHaveLength(3);
        expect(newState[0].title).toBe('New Todo');
        expect(newState[0].id).toBe('3');
    });
});