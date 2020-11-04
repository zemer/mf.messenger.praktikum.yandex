import Block from '../components/Block/Block.js';
import Chat from '../pages/chat/Chat.js';
import ChatList from '../pages/chat_list/ChatList.js';
import Error404 from '../pages/errors/404/Error404.js';
import Error500 from "../pages/errors/500/Error500.js";
import Login from '../pages/login/Login.js';
import Registration from '../pages/registration/Registration.js';
import UserProfile from '../pages/user_profile/UserProfile.js';
import Route from './route.js';

export default class Router {
    static __instance: Router;

    private _routes: Route[] = [];
    private _history: History = {} as History;
    private _currentRoute: Route | null = null;
    private _rootQuery: string = '';

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
        }).bind(this);

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
        route.render();

        Block.hydrate();
    }

    go(pathname: string) {
        this._history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this._history.back();
    }

    forward() {
        this._history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this._routes.find(route => route.match(pathname));
    }
}