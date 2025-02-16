import { ctxCallOutOfScope } from '@milkdown/exception';
import { clone } from 'lodash-es';
export type Context<T = unknown> = {
    id: symbol;
    set: (value: T) => void;
    get: () => T;
    update: (updater: (prev: T) => T) => void;
};

export type Container = Map<symbol, Context>;

export type Meta<T> = {
    id: symbol;
    _typeInfo: () => T;
    (container: Container, resetValue?: T): Context<T>;
};

export const createCtx = <T>(value: T): Meta<T> => {
    const id = Symbol('Context');

    const factory = (container: Container, resetValue = clone(value)) => {
        let inner = resetValue;

        const context: Context<T> = {
            id,
            set: (next) => {
                inner = next;
            },
            get: () => inner,
            update: (updater) => {
                inner = updater(inner);
            },
        };
        container.set(id, context as Context);
        return context;
    };
    factory.id = id;
    factory._typeInfo = (): T => {
        throw ctxCallOutOfScope();
    };

    return factory;
};
