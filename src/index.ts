import {useState, useEffect, useMemo} from 'react';

type Serializer<T> = (object: T | undefined) => string;
type Parser<T> = (val: string) => T | undefined;
type Logger = (val: any) => void;
type Setter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

type Options<T> = Partial<{
    serializer: Serializer<T>;
    parser: Parser<T>;
    logger: Logger;
}>;

const checkSSR = ():boolean => {
    // This handles SSR, since localStorage comes from the browser window object.
    return typeof window === "undefined"
}

const useLocalStorage = <T>(key: string, defaultValue: T, opts?: Options<T>):[T, Setter<T>] => {

    const options = useMemo(() => {
        return {
            serializer: JSON.stringify,
            parser: JSON.parse,
            logger: console.log,
            ...opts
        }
    }, [opts])

    const { logger, parser, serializer } = options;

    if (key === undefined) {
        logger('Warning (useLocalStorage): Key parameter is undefined.');
    }

    const [value, setValue] = useState(() => {
        if (checkSSR()) return defaultValue;

        let currentValue;

        try {
            if (localStorage.getItem(key)) {
                currentValue = parser( localStorage.getItem(key) || '' );
            } else {
                currentValue = defaultValue
            }
        } catch (err) {
            logger(err);
            currentValue = defaultValue;
        }

        return currentValue;
    });

    useEffect(() => {
        // This handles SSR, since localStorage comes from the browser window object.
        if (checkSSR()) return

        localStorage.setItem(key, serializer(value));
    }, [value, key]);

    return [value, setValue];
}

export default useLocalStorage