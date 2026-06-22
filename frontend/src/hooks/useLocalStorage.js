import React, { useEffect, useState } from 'react'

const useLocalStorage = (key,defaultValue) => {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);

        if (saved) {
            return JSON.parse(saved);
        }

        return defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    }, [key,value]);

    return [value,setValue];
}

export default useLocalStorage
