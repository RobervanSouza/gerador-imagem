import { useEffect, useState } from "react";



export function useDebouce(value: string, delay: number) {
    const [useDebouce, setUseDebouce] = useState(value);


    useEffect(() => {
       const handler = setTimeout(() => {
        setUseDebouce(value);
       } , delay);
       return () => {
        clearTimeout(handler);
       }
    }, [value, delay]);

    return useDebouce
}