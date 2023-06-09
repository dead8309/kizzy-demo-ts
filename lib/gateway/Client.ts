import EventEmitter from "events";
import type {TypedEmitter} from "./structures/Util"
import {WebSocketTransport} from "./transport/WebsocketTransport";
import type {Transport} from "./structures/Transport"
import {ClientUser} from "./structures/ClientUser"


export type ClientEvents = {
    /**
     * fired when the client is ready
     */
    ready: (clientUser: ClientUser) => void;
    /**
     * fired when the client is connected to local rpc server
     */
    connected: () => void;
    /**
     * fired when the client is disconnected from the local rpc server
     */
    disconnected: () => void;
};

export class Client extends (EventEmitter as new () => TypedEmitter<ClientEvents>) {
    /**
     * transport instance
     */
    readonly transport: Transport;
    /**
     * current user
     */
    user?: ClientUser;

    isConnected() {
        return this.transport.isConnected;
    }

    constructor() {
        super();
        this.transport = new WebSocketTransport()
        this.transport.on('open', (user) => {
            this.emit('connected')
            this.user = new ClientUser(this,user)
            console.log(`Logged in as ${user.username}#${user.discriminator}`)
            this.emit('ready',this.user)
        })
        this.transport.on('close',((reason) => {
            console.log(reason)
        }))
    }

    async login(token: string): Promise<void> {
        this.transport.connect(token)
    }

    async request(d: any): Promise<void> {
        console.debug(d)
        this.transport.send(d)
    }

    async destroy(): Promise<void>{
        await this.transport.close()
        this.emit('disconnected')
    }
}
