import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state',() => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by ID', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if ID not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const newExpense = {
        id: 4,
        description: 'Pen',
        note: 'just a pen',
        amount: 12,
        createdAt: moment()
    };

    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expect.arrayContaining([...expenses, newExpense]));
});

test('should edit an expense', () => {
    const updates = {
        description: 'Mortgage',
        note: 'Now it\'s a mortgage',
        amount: 12000,
        createdAt: moment()
    };

    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expect.arrayContaining([{id: expenses[1].id, ...updates}]));
});

test('should not edit an expense if ID is not found', () => {
    const updates = {
        description: 'Mortgage',
        note: 'Now it\'s a mortgage',
        amount: 12000,
        createdAt: moment()
    };

    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});