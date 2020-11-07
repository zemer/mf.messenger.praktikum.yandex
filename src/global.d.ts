export { };

declare global {
    interface ProxyConstructor {
        new <TSource extends object, TTarget extends object>(target: TSource, handler: ProxyHandler<TSource>): TTarget;
    }
}

import * as HandlebarsModule from 'handlebars';

declare const Handlebars: typeof HandlebarsModule;