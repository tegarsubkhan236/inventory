import React, {Dispatch, SetStateAction} from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface SelectableCellProps {
    setLoading: Dispatcher<boolean>,
    selectedRowKeys: React.Key[]
    setSelectedRowKeys: Dispatcher<React.Key[]>,
}

export const selectableCell = ({setLoading, selectedRowKeys, setSelectedRowKeys}: SelectableCellProps) => {
    const resetSelect = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 500);
    };
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


    return {resetSelect, rowSelection, hasSelected}
}