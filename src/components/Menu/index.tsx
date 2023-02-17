import React, { useContext } from 'react'
import { Menu as UikitMenu, MenuEntry } from '@hulkfinance/hulk-uikit'
// import config from './config'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import useAuth from '../../hooks/useAuth'
import { usePriceHULKBusd } from '../../state/farms/hooks'
import useTheme from '../../hooks/useTheme'
import { LanguageContext } from '../../contexts/Localisation/languageContext'
import { languages, languageList } from '../../config/localisation/languages'
import useI18n from '../../hooks/useI18n'

const Menu = (props: any) => {
  const { account } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const hulkPriceUsd = usePriceHULKBusd()
  const TranslateString = useI18n()
  // console.log(languageList)

  const config: MenuEntry[] = [
    {
      label: TranslateString('Home', 'Home'),
      icon: 'HomeIcon',
      href: '/',
    },
    {
      label: TranslateString('Trade', 'Trade'),
      icon: 'TradeIcon',
      items: [
        {
          label: TranslateString('Exchange', 'Exchange'),
          href: 'https://pancakeswap.finance/swap',
        },
        {
          label: TranslateString('Liquidity', 'Liquidity'),
          href: 'https://pancakeswap.finance/liquidity',
        },
      ],
    },
    // {
    //   label: "Pre-Sale",
    //   icon: "PreSaleIcon",
    //   href: "/pre-sale",
    // },
    {
      label: TranslateString('Farms', 'Farms'),
      icon: 'FarmIcon',
      href: '/farms',
    },
    {
      label: TranslateString('Pools', 'Pools'),
      icon: 'PoolIcon',
      href: '/pools',
    },
    {
      label: TranslateString('Referrals', 'Referrals'),
      icon: 'ReferralIcon',
      href: '/referral',
    },
    // {
    //   label: "Audits",
    //   icon: "AuditIcon",
    //   href: "/audits",
    // },
    {
      label: TranslateString('Listings', 'Listings'),
      icon: 'ListingIcon',
      items: [
        {
          label: 'BscScan',
          href: '/',
        },
        {
          label: 'DappRadar',
          href: '/',
        },
        {
          label: 'CoinGecko',
          href: '/',
        },
        {
          label: 'CoinMarketCap',
          href: '/',
        },
        {
          label: 'LiveCoinWatch',
          href: '/',
        },
        {
          label: 'Vfat',
          href: '/',
        },
      ],
    },
    {
      label: TranslateString('More', 'More'),
      icon: 'MoreIcon',
      items: [
        // {
        //   label: "Voting",
        //   href: "https://voting.hulkfiinance.com",
        // },
        {
          label: 'Github',
          href: 'https://github.com/financehulk',
        },
        {
          label: 'Docs',
          href: 'https://financehulk.gitbook.io/hulkfinance/',
        },
        {
          label: 'Blog',
          href: 'https://medium.com/@hulk-finance',
        },
      ],
    },
  ]

  return (
    <>
      <UikitMenu
        account={account}
        login={login}
        logout={logout}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={selectedLanguage && selectedLanguage.code}
        langs={languageList}
        setLang={setSelectedLanguage}
        cakePriceUsd={hulkPriceUsd.toNumber()}
        links={config}
        priceLink="https://bscscan.com/token/0x787732f27d18495494cea3792ed7946bbcff8db2"
        {...props}
      />
    </>
  )
}

export default Menu
