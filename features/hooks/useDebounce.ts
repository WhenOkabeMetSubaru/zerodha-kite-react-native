import { useEffect } from "react";
import useTimeoutFn from "./useTimeout";


export default function useDebounce(fn:Function, ms = 0, deps:any) {

    const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

    useEffect(reset, deps);

    return [isReady, cancel];

}