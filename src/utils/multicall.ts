import { Interface } from '@ethersproject/abi'
import { CallOverrides } from '@ethersproject/contracts'
import { getMulticallContract, getMulticallV2Contract } from './contractHelpers'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

export interface MulticallOptions extends CallOverrides {
  requireSuccess?: boolean
}

const multicall = async <T = any>(abi: any[], calls: Call[]): Promise<T> => {
  const multi = getMulticallContract()
  const itf = new Interface(abi)

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }))
  const { returnData } = await multi.aggregate(calldata)

  const res = returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call))

  return res as any
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
export const multicallv2 = async <T = any>(abi: any[], calls: Call[], options?: MulticallOptions): Promise<T> => {
  const { requireSuccess = true, ...overrides } = options || {}
  const multi = getMulticallV2Contract()
  const itf = new Interface(abi)
  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }))
  // console.log('calls: ', calls)
  const returnData = await multi.tryAggregate(requireSuccess, calldata, overrides)
  const res = returnData.map((call: any, i: number) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })
  // console.log('res: ', res)
  return res as any
}

export default multicall
