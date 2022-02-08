import { OperationEntry } from 'features/operations/operationsSlice';

/**
 * Get the list if ids of the "children" of the operator entry corresponding to the id passed
 *
 * @param id the id of the operator "parent" entry
 * @param items the whole data structure
 * @param entryids the array that will keep track of the "children"  in recursion
 * @returns the list of the "children" ids
 */
export const getOperatorChildrenEntryIds = (
    id: string,
    items: OperationEntry[],
    entryids: string[]
): string[] => {
    items.forEach((e) => {
        const isChild = e.operatorId === id;
        const isCurrentItem = e.id === id;
        const isChildOperator = isChild && e.type === 'operator';
        if (!isCurrentItem && isChildOperator) {
            return getOperatorChildrenEntryIds(e.id, items, entryids);
        }
        if (isCurrentItem || isChild) {
            entryids.push(e.id);
        }
    });
    return entryids;
};
