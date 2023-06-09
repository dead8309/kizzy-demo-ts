import {Constants, OpCodes} from "../constants/Constants";

import {Identify, User} from "../constants/Payload";
import {Transport} from "../structures/Transport";

export class WebSocketTransport extends Transport {
  private ws?: WebSocket;

  get isConnected() {
    return this.ws != undefined && this.ws.readyState === 1;
  }

  connect(token: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const ws = new WebSocket(Constants.GATEWAY)
      if (ws) {
        this.ws = ws
        resolve();
      }
      if (!this.ws)
        reject(new Error("Failed to connect to websocket"));

      let seq = 0;
      let session_id = ""
      let resume_gateway_url = ""
      
      this.ws!.addEventListener("open", async () => {
        console.log("Socket Opened")
      });

      this.ws!.addEventListener("message", async (event: MessageEvent) => {
        const parsedData = JSON.parse(event.data);
        const {t, op, d} = parsedData;
        
        switch (op) {
          case OpCodes.Hello:
            console.log('Got op 10 HELLO');
            const {heartbeat_interval} = d;
            this.heartbeat(heartbeat_interval, seq);
            this.send(Identify(token))
            break;

          case OpCodes.Heartbeat:
            console.log("Got Op 1 Sending Heartbeat")
            this.send({
              op: OpCodes.Heartbeat,
              d: seq == 0 ? "null" : seq
            })
            break;

          case OpCodes.Dispatch:
            if (!t) return;
            switch (t) {
              case 'READY':
                console.log('Received READY event')
                let user: User = d.user
                this.emit('open', user)
                session_id = d.session_id
                resume_gateway_url = d.resume_gateway_url
                break;
            }
            break;

          case OpCodes.Reconnect:
            console.log("Got op 7 Closing and Reconnecting Session")
            this.ws!.close(4000)
            break;

          case OpCodes.InvalidSession:
            console.log("Got Op 9 Reconnect Failed")
            this.send(Identify(token))
            break;
        }
      });

      this.ws!.addEventListener('close',(event: CloseEvent) =>{
        if (event.code == 4000)
          this.reconnect(token)
      })
    })
  }

  async reconnect(token: string): Promise<void>{
    setTimeout(() =>{
      this.connect(token)
    },350)
  }

  send(data?: any): void {
    this.ws?.send(JSON.stringify(data))
  }

  close(): Promise<void> {
    if (!this.ws) return new Promise((resolve) => void resolve());

    return new Promise((resolve) => {
      this.ws!.addEventListener("close", () => {
        this.emit("close", "Closed by client");
        this.ws = undefined;
        resolve();
      }, true);
      this.ws!.close();
      this.ws?.removeEventListener('close', () => {}, true)
    });
  }

  private heartbeat = (ms: number, seq: number) => {
    return setInterval(() => {
      this.send({op: OpCodes.Heartbeat, d: seq});
    }, ms);
  };

}
