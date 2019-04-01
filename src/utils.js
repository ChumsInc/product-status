
export const now = () => {
    return new Date().valueOf()
};

export const noop = () => {};

export const getClassName = (className, val) => {
    switch (typeof className) {
    case 'function':
        const _className = className(val);
        if (typeof _className === 'object') {
            return {
                ..._className,
            };
        }
        return {[_className]: true};
    case 'object':
        return {...className};
    default:
        return {[className]: true};
    }
};