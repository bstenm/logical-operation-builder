import { useState } from 'react';
import { SelectValue } from 'features/operations/SelectValue';
import { SelectType } from 'features/operations/SelectType';
import { OperationValuesForm } from 'features/operations/OperationValuesForm';
import { Argument, getArguments } from 'features/arguments/argumentsSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
    operationsActions,
    OperationType,
} from 'features/operations/operationsSlice';

export const OperationSelect = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const args: Argument[] = useAppSelector(getArguments);

    const [typeSelected, setTypeSelected] = useState<OperationType | ''>('');

    const optionMapping: { [key: string]: string[] } = {
        or: ['and', 'or'],
        and: ['and', 'or'],
        constant: ['false', 'true'],
        argument: args.map((e) => e.name),
    };

    const onValueSelected = (value: string) => {
        console.log(typeSelected, ':', value);
        if (typeSelected === '') return;
        dispatch(operationsActions.add({ type: typeSelected, value }));
    };

    const onTypeSelected = (value: OperationType) => {
        setTypeSelected(value as OperationType);
        // dispatch(operationsActions.add({ type: 'operator', value }));
    };

    const options = optionMapping[typeSelected];

    if (typeSelected === 'constant' || typeSelected === 'argument') {
        return (
            <SelectValue
                label={typeSelected}
                options={optionMapping[typeSelected]}
                onSelect={onValueSelected}
                onCancel={() => setTypeSelected('')}
                defaultValue={options[0]}
            />
        );
    }

    if (typeSelected === 'and' || typeSelected === 'or') {
        return (
            <>
                <SelectValue
                    label='operator'
                    options={optionMapping[typeSelected]}
                    onSelect={onValueSelected}
                    onCancel={() => setTypeSelected('')}
                    defaultValue={typeSelected}
                />
                <OperationValuesForm />
            </>
        );
    }

    return (
        <SelectType
            label='Type'
            selected={typeSelected}
            onSelect={(value: string) => onTypeSelected(value as OperationType)}
        />
    );
};
