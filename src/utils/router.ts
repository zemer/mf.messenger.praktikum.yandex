import Block from "Components/Block";
import Route from "Utils/route";

export default class Router {
    static instance: Router;

    private routes: Route[] = [];

    private history: History = {} as History;

    private currentRoute: Route | null = null;

    private rootQuery = "";

    constructor(rootQuery: string) {
        if (Router.instance) {
            return Router.instance;
        }

        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;

        Router.instance = this;
    }

    use(pathname: string, block: unknown): Router {
        const route = new Route(pathname, block, { rootQuery: this.rootQuery });
        this.routes.push(route);

        return this;
    }

    start(): void {
        window.onpopstate = ((event: PopStateEvent) => {
            this.onRoute((event?.currentTarget as Window)?.location?.pathname);
        });

        this.onRoute(window.location.pathname);
    }

    onRoute(pathname: string | null): void {
        if (!pathname) {
            return;
        }

        const route = this.getRoute(pathname) ?? this.getRoute("/404");
        if (!route) {
            return;
        }

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;
        route.render(pathname);

        Block.hydrate();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find((route) => route.match(pathname));
    }

    static go(pathname: string): void {
        this.instance.history.pushState({}, "", pathname);
        this.instance.onRoute(pathname);
    }

    static back(): void {
        this.instance.history.back();
    }

    static forward(): void {
        this.instance.history.forward();
    }
}
