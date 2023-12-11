import {addTodolist, changeFilter, changeTodolistTitle, removeTodolist, todolistReducer} from './todolistReducer';
import {v1} from 'uuid';
import {FilterType, TodolistType} from '../App';

let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<TodolistType>

beforeEach(() => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: FilterType.ALL},
        {id: todolistId2, title: "What to buy", filter: FilterType.ALL}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolist(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistId = v1();
    let newTodolistTitle = "New Todolist";

    const endState = todolistReducer(startState, addTodolist(newTodolistId, newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe(FilterType.ALL);
    expect(endState[2].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitle(todolistId2, newTodolistTitle);

    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = FilterType.COMPLETED;


    const action = changeFilter(todolistId2, newFilter);
    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



