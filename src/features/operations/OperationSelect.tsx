import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { SelectType } from 'features/operations/SelectType';
import { SelectValue } from 'features/operations/SelectValue';
import { OperationValuesForm } from 'features/operations/OperationValuesForm';
import { Argument, getArguments } from 'features/arguments/argumentsSlice';
import { operatorTypes, constantValues, valueTypes } from 'config';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
    ValueTypeOption,
    OperatorValueOption,
    OperationTypeOption,
    operationsActions as operations,
} from 'features/operations/operationsSlice';

type Props = {
    operatorId?: string;
};

export const OperationSelect = ({ operatorId }: Props): JSX.Element => {
    const dispatch = useAppDispatch();

    const args: Argument[] = useAppSelector(getArguments);

    const [newItem, setNewItem] = useState<{
        id: string;
        type: OperationTypeOption;
        value: string;
    } | null>(null);

    const optionMapping: { [key in OperationTypeOption]: string[] } = {
        operator: operatorTypes,
        constant: constantValues,
        argument: args.map((e) => e.name),
    };

    const onValueUpdated = (value: string): void => {
        if (!newItem?.id) return;
        dispatch(operations.updateValue({ id: newItem.id, value }));
    };

    const onValueTypeSelected = (type: ValueTypeOption): void => {
        const id = uuid();
        const value = optionMapping[type][0];
        dispatch(operations.addValue({ id, type, value, operatorId }));
        setNewItem({ id, type, value });
    };

    const onOperatorTypeSelected = (value: OperatorValueOption): void => {
        const id = uuid();
        const type = 'operator';
        dispatch(operations.addOperator({ id, type, value, operatorId }));
        setNewItem({ id, type, value });
    };

    const onRemove = (id: string): void => {
        dispatch(operations.remove(id));
        setNewItem(null);
    };

    const options = newItem?.type ? optionMapping[newItem.type] : [];

    if (newItem?.type === 'constant' || newItem?.type === 'argument') {
        return (
            <SelectValue
                id={newItem.id}
                label={newItem.type}
                options={options}
                onSelect={onValueUpdated}
                onCancel={onRemove}
                defaultValue={options[0]}
            />
        );
    }

    if (newItem?.type === 'operator') {
        return (
            <>
                <SelectValue
                    id={newItem.id}
                    label='operator'
                    options={options}
                    onSelect={onValueUpdated}
                    onCancel={onRemove}
                    defaultValue={newItem.value}
                />
                <OperationValuesForm operatorId={newItem.id} />
            </>
        );
    }

    return (
        <SelectType
            label='Type'
            selected={newItem?.type}
            onSelect={(type: string) =>
                valueTypes.includes(type)
                    ? onValueTypeSelected(type as ValueTypeOption)
                    : onOperatorTypeSelected(type as OperatorValueOption)
            }
        />
    );
};
