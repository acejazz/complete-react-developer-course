import moment from 'moment';
import filterReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filterReducer(undefined, { type: '@@INIT'});
    
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filterReducer(undefined, {type: 'SORT_BY_AMOUNT'});

    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        starDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };

    const action = {type: 'SORT_BY_DATE'};

    const state = filterReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const action = {
        type: 'SET_TEXT_FILTER',
        text: 'batman'
    }

    const state = filterReducer(undefined, action);

    expect(state.text).toBe('batman');
});

test('should set start date', () => {
    const now = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate: now
    };

    const state = filterReducer(undefined, action);

    expect(state.startDate).toEqual(now);
});

test('should set end date', () => {
    const now = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate: now
    };

    const state = filterReducer(undefined, action);

    expect(state.endDate).toEqual(now);
});
