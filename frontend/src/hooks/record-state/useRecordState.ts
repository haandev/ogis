import React, { useCallback } from "react";

const useRecordState = <T extends any>(initial: Record<string, T>) => {
  const [records, setRecords] = React.useState(initial);
  const set = useCallback((key: string, value: T) => {
    setRecords((prev) => ({ ...prev, [key]: value }));
  }, []);
  const remove = useCallback((key: string) => {
    setRecords((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }, []);
  const reset = useCallback(() => {
    setRecords(initial);
  }, []);

  return [
    records,
    {
      set,
      remove,
      reset,
    },
  ];
};

export default useRecordState;
