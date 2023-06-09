import EventEmitter from "events";
import {User} from "../constants/Payload";
import { type TypedEmitter } from "./Util"

export type TransportEvents = {
    /**
     * @event
     */
    open: (user: User) => void;
    /**
     * @event
     */
    close: (reason?: string | { code: number; message: string }) => void;
};

export abstract class Transport extends (EventEmitter as new () => TypedEmitter<TransportEvents>) {
    
    get isConnected(): boolean {
        return false;
    }

    constructor() {
        super();
    }

    abstract connect(token: string): Promise<void>;
    abstract send(data?: any): void;
    abstract close(): Promise<void>;
}
