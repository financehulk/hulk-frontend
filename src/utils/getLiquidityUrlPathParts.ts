// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
// In the URL, using the quote token 'BNB' is represented by 'ETH'
import { defaultChainId } from '../config'

const getLiquidityUrlPathParts = ({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses }: any) => {
  const firstPart = quoteTokenSymbol === 'BNB' ? 'ETH' : quoteTokenAdresses
  const secondPart = tokenAddresses
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
