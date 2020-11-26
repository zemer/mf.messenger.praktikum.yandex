export type PlainObject<T = unknown> = {
    [k in string]: T;
};

export type StringIndexed = Record<string, unknown>;
