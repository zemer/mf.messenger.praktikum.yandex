import Block from "../components/Block/Block";
import Chat from "../pages/chat/Chat";
import ChatList from "../pages/chat_list/ChatList";
import Error404 from "../pages/errors/404/Error404";
import Error500 from "../pages/errors/500/Error500";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import UserProfile from "../pages/user_profile/UserProfile";
import Route from "./route";

export default class Router {
    static __instance: Router;

    private _routes: Route[] = [];

    private _history: History = {} as History;

    private _currentRoute: Route | null = null;

    private _rootQuery = "";

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: typeof ChatList | typeof Chat | typeof Login | typeof Registration | typeof UserProfile | typeof Error404 | typeof Error500) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this._routes.push(route);

        return this;
    }

    start() {
        // На смену роута вызываем перерисовку
        window.onpopstate = ((event: PopStateEvent) => {
            this._onRoute((event?.currentTarget as Window)?.location?.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string | null) {
        if (!pathname) {
            return;
        }

        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(pathname);

        Block.hydrate();
    }

    getRoute(pathname: string): Route | undefined {
        return this._routes.find((route) => route.match(pathname));
    }

    static go(pathname: string) {
        this.__instance._history.pushState({}, "", pathname);
        this.__instance._onRoute(pathname);
    }

    static back() {
        this.__instance._history.back();
    }

    static forward() {
        this.__instance._history.forward();
    }
}
