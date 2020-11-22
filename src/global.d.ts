import * as HandlebarsModule from "handlebars";

declare global {
    interface ProxyConstructor {
        new <TSource extends object, TTarget extends object>(target: TSource, handler: ProxyHandler<TSource>): TTarget;
    }
}

declare const Handlebars: typeof HandlebarsModule;
