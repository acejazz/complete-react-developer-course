import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />);
});

test('should render ExpenseListFilter correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilter with alt correctly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    // wrapper.find('input').prop('onChange')({target: {value: 'batman'}});

    const value = 'rent'
    wrapper.find('input').simulate('change', {
        target: {
            value
        }

    });

    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
    const value = 'date';
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target: {
            value
        }
    });

    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: {
            value
        }
    });

    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const start = moment(0).add(4, 'years');
    const end = moment(0).add(8, 'years');

    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate: start, endDate: end });

    expect(setStartDate).toHaveBeenLastCalledWith(start);
    expect(setEndDate).toHaveBeenLastCalledWith(end);
});

test('should handle date focus change', () => {
    wrapper.find('DateRangePicker').prop('onFocusChange')('endDate');

    expect(wrapper.state('calendarFocused')).toBe('endDate');
});
