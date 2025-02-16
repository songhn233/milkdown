import { createTimer } from '../timing';
import { Configure, MilkdownPlugin } from '../utility';

export const Config = createTimer('Config');

export const config =
    (configure: Configure): MilkdownPlugin =>
    (pre) => {
        pre.record(Config);

        return async (ctx) => {
            await configure(ctx);
            ctx.done(Config);
        };
    };
