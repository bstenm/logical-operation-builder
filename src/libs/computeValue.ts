import { constantValues } from 'config';
import isEmpty from 'lodash/isEmpty';
import { Argument } from 'features/arguments/argumentsSlice';
import { OperationEntry } from 'features/operations/operationsSlice';
import { CorruptedStateError } from './customErrors';

/**
 * Compute the boolean value of an entry of type "constant"
 *
 * @param entry the "constant" entry
 * @returns the computed value from the entry
 */
const getValueFromConstantEntry = (entry: OperationEntry): boolean => {
    const { value, id } = entry;
    if (value !== 'true' && value !== 'false') {
        throw new CorruptedStateError(id);
    }
    return value === 'true';
};

/**
 * Compute the boolean value of an entry of type "argument"
 *
 * @param entry the "argument" entry
 * @param args the list of arguments that will allow to resolve the value of the entry
 * @returns the computed value from the entry
 */
const getValueFromArgumentEntry = (
    entry: OperationEntry,
    args: Argument[]
): boolean => {
    // Find the entry in the list of arguments
    // passed so we can get its current value
    const argItem = args.find((e) => e.name === entry.value);
    if (typeof argItem?.value !== 'boolean') {
        throw new CorruptedStateError(entry.id);
    }
    return argItem.value;
};

/**
 * Compute the boolean value from the "children" of the operator entry
 *
 * @param entry the "parent" operator entry from which the "children" values will be computed
 * @param entries the whole data structure that will be traversed
 * @param args the list of arguments that will allow to resolve the value of the entries of type "argument"
 * @returns the computed value from all the "children" of the entry
 */
const getValueFromOperatorEntry = (
    entry: OperationEntry,
    entries: OperationEntry[],
    args: Argument[]
): boolean | null => {
    const { value, id } = entry;
    // Get the nested operator from the list so we can recurse
    // and return the parsed value of its "children"
    const nextOperator = entries.find((e) => e.id === id);
    if ((value !== 'and' && value !== 'or') || !nextOperator) {
        throw new CorruptedStateError(id);
    }
    return computeValue(nextOperator, entries, args);
};

/**
 * Compute the boolean value from the state entries
 *
 * @param entry the "parent" entry from which the "children" values will be computed
 * @param entries the whole data structure that will be traversed
 * @param args the list of arguments that will allow to resolve the value of the entries of type "argument"
 * @returns the computed value from all the "children" of the entry
 */
export const computeValue = (
    entry: OperationEntry,
    entries: OperationEntry[],
    args: Argument[]
): boolean | null => {
    // When only one entry exist: constant
    if (entry.type === 'constant') {
        return getValueFromConstantEntry(entry);
    }

    // When only one entry exist: argument
    if (entry.type === 'argument') {
        return getValueFromArgumentEntry(entry, args);
    }

    // Get all the "children" entries for this operator:
    // The operator id is the id of the "parent" operator
    const children: OperationEntry[] = entries.filter(
        (e) => e.operatorId === entry.id
    );

    // Parse the boolean values of each "children"
    // entries for this operator into an array
    const result: (boolean | null)[] = children.map((item: OperationEntry) => {
        const { id } = item;
        switch (item.type) {
            case 'constant':
                return getValueFromConstantEntry(item);
            case 'argument':
                return getValueFromArgumentEntry(item, args);
            case 'operator':
                return getValueFromOperatorEntry(item, entries, args);
            default:
                throw new CorruptedStateError(id);
        }
    });

    // No value found
    if (isEmpty(result)) {
        return null;
    }

    if (entry.value === 'or') {
        // "some" returns true if some of the elements
        // in the array satisfy the condition passed
        return result.filter((e) => e != null).some((e) => e === true);
    }

    if (entry.value === 'and') {
        // "every" returns true if all the elements
        // in the array satisfy the condition passed
        return result.filter((e) => e != null).every((e) => e === true);
    }

    throw new CorruptedStateError();
};
