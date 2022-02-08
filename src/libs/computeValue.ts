import isEmpty from 'lodash/isEmpty';
import { Argument } from 'features/arguments/argumentsSlice';
import { OperationEntry } from 'features/operations/operationsSlice';
import { CorruptedStateError } from './customErrors';

export const computeValue = (
    entry: OperationEntry,
    entries: OperationEntry[],
    args: Argument[]
): boolean | null => {
    // When only one entry exist: constant
    if (entry.type === 'constant') {
        const { value, id } = entry;
        if (value !== 'true' && value !== 'false') {
            throw new CorruptedStateError(id);
        }
        return value === 'true';
    }

    // When only one entry exist: argument
    if (entry.type === 'argument') {
        // Find the entry in the list of arguments passed so
        // we can get its current value
        const argItem = args.find((e) => e.name === entry.value);
        if (typeof argItem?.value !== 'boolean') {
            throw new CorruptedStateError(entry.id);
        }
        return argItem.value;
    }

    // Get all the "children" entries for this operator:
    // The operatorId is the id of the "parent" operator
    const children: OperationEntry[] = entries.filter(
        (e) => e.operatorId === entry.id
    );
    // Parse the boolean values of each "children"
    // entries for this operator into an array
    const result: (boolean | null)[] = children.map(
        ({ id, type, value }: OperationEntry) => {
            switch (type) {
                case 'constant':
                    if (value !== 'true' && value !== 'false') {
                        throw new CorruptedStateError(id);
                    }
                    return value === 'true';
                case 'argument':
                    // Find the entry in the list of arguments passed so
                    // we can get its current value
                    const argItem = args.find((e) => e.name === value);
                    if (typeof argItem?.value !== 'boolean') {
                        throw new CorruptedStateError(id);
                    }
                    return argItem.value;
                case 'operator':
                    // Get the nested operator from the list so we can recurse
                    // and return the parsed value of its "children"
                    const nextOperator = entries.find((e) => e.id === id);
                    if ((value !== 'and' && value !== 'or') || !nextOperator) {
                        throw new CorruptedStateError(id);
                    }
                    return computeValue(nextOperator, entries, args);
                default:
                    throw new CorruptedStateError(id);
            }
        }
    );

    // No value found
    if (isEmpty(result)) return null;

    if (entry.value === 'or') {
        // "some" returns true if some of the elements
        // in the array satisfy the condition passed
        return result.some((e) => e === true);
    }

    if (entry.value === 'and') {
        // "every" returns true if all the elements
        // in the array satisfy the condition passed
        return result.every((e) => e === true);
    }

    throw new CorruptedStateError();
};
