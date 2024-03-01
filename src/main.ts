import {TypeormDatabase} from '@subsquid/typeorm-store'
import {Registered} from './model'
import {NAMI_CONTRACT, processor} from './processor'
import { events } from './abi/NAMI'

const NAMI_NAMEHASH = '0x86092f8e40c68bba24b75e17e55e3e4a3974b41ff426d7b14c356960be986419'.toLowerCase();

export const convertTimestampMilliToSeconds = (timestamp: number) => {
    return BigInt(Math.floor(timestamp / 1000));
}

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const registered: Map<string, Registered> = new Map()

    for (let c of ctx.blocks) {
        for (let log of c.logs) {
            if (!(log.address === NAMI_CONTRACT && log.topics[0] === events.Registered.topic)) continue
            const { node, ownership } = events.Registered.decode(log)
            let id = ownership.subnode ? `${NAMI_NAMEHASH}-${node}-${ownership.owner}` : `${node}-${ownership.owner}`

            registered.set(id, new Registered({
                id: id,
                owner: ownership.owner,
                node: ownership.subnode ? NAMI_NAMEHASH : node,
                subnode: ownership.subnode ? node : null,
                txHash: log.transactionHash,
                blockTimestamp: convertTimestampMilliToSeconds(c.header.timestamp)
            }))
        }
    }

    // upsert batches of entities with batch-optimized ctx.store.save
    await ctx.store.upsert([...registered.values()])
})
