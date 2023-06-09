<!-- markdownlint-disable -->
<div align="center">
    <br />
    <h3>kizzy-rpc-ts</h3>
    <br />
</div>
<!-- markdownlint-enable -->

## About

`kizzy-rpc-ts` is a fork of [discordjs/RPC](https://github.com/discordjs/RPC) with WebSocket support solely made to work for [coc-discord-rpc](https://github.com/leonardssh/coc-discord-rpc) on android devices

## Example

```ts
import { Client } from "@dead8309/kizzy-rpc";

const client = new Client();

client.on("ready", () => {
    client.user?.setActivity({
        name: "Hey"
    });
});

client.login(TOKEN);
```
## Credits

-   [discordjs](https://github.com/discordjs): Making [discordjs/RPC](https://github.com/discordjs/RPC)
-   [xhayper](https://github.com/xhayper) Making
    [@xhayper/discord-rpc](https://github.com/xhayper/discord-rpc)
