import { OperationEntry } from 'features/operations/operationsSlice';

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
