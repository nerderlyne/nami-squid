import {assertNotNull} from '@subsquid/util-internal'
import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import { events } from './abi/NAMI'

export const NAMI_CONTRACT = '0x000000006641b4c250aea6b62a1e0067d300697a'.toLowerCase()

export const processor = new EvmBatchProcessor()
    // Lookup archive by the network name in Subsquid registry
    // See https://docs.subsquid.io/evm-indexing/supported-networks/
    .setGateway(lookupArchive('arbitrum'))
    // Chain RPC endpoint is required for
    //  - indexing unfinalized blocks https://docs.subsquid.io/basics/unfinalized-blocks/
    //  - querying the contract state https://docs.subsquid.io/evm-indexing/query-state/
    .setRpcEndpoint(assertNotNull(
        process.env.RPC_ARBITRUM_ONE_HTTP, 
        'Required env variable RPC_ARBITRUM_ONE_HTTP is missing'
    ))
    .setFinalityConfirmation(75)
    .setFields({
        log: {
            transactionHash: true,
        },
    })
    .setBlockRange({
        from: 183086471,
    })
    .addLog({
        address: [ NAMI_CONTRACT ],
        topic0: [
          events.Registered.topic,
        ],
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
