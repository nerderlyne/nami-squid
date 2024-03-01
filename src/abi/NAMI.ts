import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './NAMI.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Registered: new LogEvent<([node: string, ownership: ([owner: string, subnode: boolean] & {owner: string, subnode: boolean})] & {node: string, ownership: ([owner: string, subnode: boolean] & {owner: string, subnode: boolean})})>(
        abi, '0xb7ea647b1115c6e525d648f34e7d3981a89872f28b4d15076a2cb2fd282b52d1'
    ),
}

export const functions = {
    isOwner: new Func<[_owner: string, _node: string], {_owner: string, _node: string}, boolean>(
        abi, '0xe96b462a'
    ),
    owner: new Func<[_node: string], {_node: string}, string>(
        abi, '0x02571be3'
    ),
    predictDeterministicAddresses: new Func<[_node: string], {_node: string}, ([l1Token: string, l2Token: string] & {l1Token: string, l2Token: string})>(
        abi, '0x57b23c98'
    ),
    register: new Func<[_owner: string, _node: string], {_owner: string, _node: string}, []>(
        abi, '0x1e7a505f'
    ),
    registerSub: new Func<[_owner: string, _subname: string], {_owner: string, _subname: string}, []>(
        abi, '0xf5c83178'
    ),
    whatIsTheAddressOf: new Func<[name: string], {name: string}, ([_owner: string, _receiver: string, _node: string] & {_owner: string, _receiver: string, _node: string})>(
        abi, '0xc47d04e2'
    ),
}

export class Contract extends ContractBase {

    isOwner(_owner: string, _node: string): Promise<boolean> {
        return this.eth_call(functions.isOwner, [_owner, _node])
    }

    owner(_node: string): Promise<string> {
        return this.eth_call(functions.owner, [_node])
    }

    predictDeterministicAddresses(_node: string): Promise<([l1Token: string, l2Token: string] & {l1Token: string, l2Token: string})> {
        return this.eth_call(functions.predictDeterministicAddresses, [_node])
    }

    whatIsTheAddressOf(name: string): Promise<([_owner: string, _receiver: string, _node: string] & {_owner: string, _receiver: string, _node: string})> {
        return this.eth_call(functions.whatIsTheAddressOf, [name])
    }
}
