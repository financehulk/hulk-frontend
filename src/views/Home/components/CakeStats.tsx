import React from 'react'
import { Card, CardBody, Heading, Text } from '@hulkfinance/hulk-uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import CardValue from './CardValue'
import { usePriceHULKBusd } from '../../../state/farms/hooks'
import useI18n from '../../../hooks/useI18n'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useBurnedBalance, useTotalSupply } from '../../../hooks/useTokenBalance'
import { getHULKTokenAddress } from '../../../utils/addressHelpers'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`

const CardHeading = styled(Heading)`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 24px;
  @media (min-width: 768px) {
    font-size: 40px;
  }
`

const TextItem = styled(Text)`
  font-size: 20px;
  line-height: 1.2;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getHULKTokenAddress())
  const eggPrice = usePriceHULKBusd()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const hulkSupply = getBalanceNumber(circSupply)
  const marketCap = eggPrice.times(circSupply)

  return (
    <StyledCakeStats>
      <CardBody p={40}>
        <CardHeading bold>{TranslateString('HULK Stats', 'HULK Stats')}</CardHeading>
        <Row>
          <TextItem>{TranslateString('Market cap', 'Market Cap')}</TextItem>
          <CardValue fontSize="20px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <TextItem>{TranslateString('Total supply', 'Total Supply')}</TextItem>
          {hulkSupply && <CardValue fontSize="20px" value={hulkSupply} decimals={0} />}
        </Row>
        <Row>
          <TextItem>{TranslateString('Total burned', 'Total Burned')}</TextItem>
          <CardValue fontSize="20px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <TextItem>{TranslateString('Total locked', 'Total Locked')}</TextItem>
          <CardValue fontSize="20px" value={100} decimals={0} />
        </Row>
        <Row>
          <TextItem>{TranslateString('Circulating Supply', 'Circulating Supply')}</TextItem>
          <CardValue fontSize="20px" value={100} decimals={0} />
        </Row>
        <Row>
          <TextItem>{TranslateString('Un-mined', 'Un-mined')}</TextItem>
          <CardValue fontSize="20px" value={100} decimals={0} />
        </Row>
        <Row>
          <TextItem>{TranslateString('Mining /24h', 'Mining /24h')}</TextItem>
          <CardValue fontSize="20px" value={100} decimals={0} />
        </Row>
        <Row>
          <TextItem>
            {TranslateString('Max', 'Max')} Tx {TranslateString('Amount', 'Amount')}
          </TextItem>
          <TextItem>100</TextItem>
          {/* <TextItem >{mashPerBlock}</TextItem> */}
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
