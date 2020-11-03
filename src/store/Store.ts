import { cloneDeep } from "../utils/cloneDeep.js";
import EventBus from "../utils/event-bus.js";

export interface IChatItemState {
    id: number;
    title: string;
    avatar?: string;
}

export interface IChatListState {
    items: Array<IChatItemState>;
}

export interface IChatState {
    chats: IChatListState;
}

export class Store {

    static EVENTS = {
        CHATS_ITEMS_CHANGED: "CHATS_ITEMS_CHANGED",
    };

    private state: IChatState;
    //private reducers: { [key: string]: Function };
    eventBus: () => EventBus;

    constructor(initialState: IChatState) {
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;
        this.state = initialState;
    }

    get value() {
        return this.state;
    }

    // dispatch(action) {
    //     this.state = {
    //         chats: {
    //             data: [...this.state.chats, action.payload],
    //         },
    //     };
    // }

    subscribe(event: string, callback: Function) {
        this.eventBus().on(event, callback);
    }

    getState(): IChatState {
        return this.state;
    }

    dispatch(event: string, payload: any): any {
        const clone = cloneDeep(this.state) as IChatState;

        switch (event) {
            case Store.EVENTS.CHATS_ITEMS_CHANGED: {
                clone.chats.items = payload.items;
            }
        }

        this.state = clone;

        this.eventBus().emit(event);
    }
}

export const initialState: IChatState = {
    chats: {
        items: []
    }
};

// export function chatsReducer(
//     state = initialState,
//     action: { type: string, payload: any }
// ) {
//     switch (action.type) {
//         case 'PUT_CHATS': {
//             const chats = action.payload;
//             const data = [...state.chats, chats];
//             return {
//                 ...state,
//                 data,
//             };
//         }
//     }

//     return state;
// }

// const reducers = {
//     chats: chatsReducer,
//   };

export const store = new Store(initialState);

// import EventBus from "../utils/event-bus.js";

// export default class Store {
//     static __instance: Store;

//     eventBus: () => EventBus;

//     constructor() {
//         if (Store.__instance) {
//             return Store.__instance;
//         }

//         const eventBus = new EventBus();
//         this.eventBus = () => eventBus;
//         this._registerEvents(eventBus);

//         Store.__instance = this;
//     }

//     static getStore() {
//         return Store.__instance;
//     }

//     _registerEvents(eventBus: EventBus) {
//         eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
//         eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//         eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//         eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//     }
// }