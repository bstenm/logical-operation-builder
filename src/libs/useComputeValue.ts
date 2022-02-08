import { useEffect, useState } from 'react';

import { computeValue } from 'libs/computeValue';
import { useAppSelector } from 'app/hooks';
import { Argument, getArguments } from 'features/arguments/argumentsSlice';
import {
    getOperations,
    OperationEntry,
} from 'features/operations/operationsSlice';

export const useComputeValue = () => {
    const [error, setError] = useState<boolean | null>(null);

    const [value, setValue] = useState<boolean | null>(null);

    const args: Argument[] = useAppSelector(getArguments);

    const operations: OperationEntry[] = useAppSelector(getOperations);

    useEffect(() => {
        try {
            setError(false);
            // The 1st el in the state tree is the one without operatorId key
            const topLevel: OperationEntry | undefined = operations.find(
                (e) => !e.operatorId
            );
            setValue(
                topLevel ? computeValue(topLevel, operations, args) : null
            );
        } catch (e) {
            setError(true);
        }
    }, [args, operations]);

    return [value, error];
};
