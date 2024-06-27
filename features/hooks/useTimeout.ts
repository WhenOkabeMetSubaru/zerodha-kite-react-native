import { useCallback, useEffect, useRef } from "react";

export default function useTimeoutFn(fn:Function, ms = 0) {

    const ready = useRef<any>(false);
    const timeout = useRef<any>();
    const callback = useRef(fn);

    const isReady = useCallback(() => ready.current, []);

    const set = useCallback(() => {
        ready.current = false;
        timeout.current && clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            ready.current = true;
            callback.current();

        }, ms)
    }, [ms])

    const clear = useCallback(() => {
        ready.current = null;
        timeout.current && clearTimeout(timeout.current);
    }, [])

    useEffect(() => {
        callback.current = fn;
    }, [fn])

    useEffect(() => {
        set();

        return clear;

    }, [ms])

    return [isReady, clear, set]
}