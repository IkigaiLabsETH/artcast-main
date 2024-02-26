import { SnapshotBlockchain, TokenBlockchain } from '../../types';
import { TokenBalance, ContentValue } from '../TokenBalances/types';

export type Token = TokenBalance &
  Pick<Poap, '_poapEvent' | '_eventId'> & {
    _tokenNfts: TokenBalance['tokenNfts'];
    _token: TokenBalance['token'];
    _tokenAddress: string;
    _tokenId: string;
    owner: TokenBalance['owner'] & {
      tokenBalances: Token[];
    };
  };

export type TokensData = {
  [Key in TokenBlockchain | SnapshotBlockchain]: { TokenBalance: Token[] };
};

export type PoapsData = {
  Poaps: {
    Poap: Poap[];
  };
};

export type TokenAddress = {
  address: string;
  blockchain?: string;
};

export type Poap = {
  id: string;
  blockchain: TokenBlockchain;
  tokenId: string;
  tokenType: string;
  tokenAddress: string;
  eventId: string;
  poapEvent: PoapEvent;
  _poapEvent: PoapEvent;
  _eventId: string;
  _blockchain: string;
  owner: Owner & {
    poaps: Poap[];
  };
};

export type PoapEvent = {
  blockchain: string;
  eventName: string;
  contentValue: ContentValue;
  logo: {
    image: {
      small: string;
      medium: string;
    };
  };
};

export interface Owner {
  identity: string;
  addresses: string[];
  socials: Social[];
  primaryDomain: PrimaryDomain;
  domains: Domain[];
  xmtp: Xmtp[];
}

export interface Social {
  blockchain: string;
  dappName: string;
  profileName: string;
  profileHandle: string;
}

export interface PrimaryDomain {
  name: string;
}

export interface Domain {
  dappName: string;
  name: string;
}

export interface Xmtp {
  isXMTPEnabled: boolean;
}

export type TotalTokensSupply = {
  [Key in TokenBlockchain]: Supply;
};

export interface Supply {
  totalSupply: string;
}

export type OverviewData = {
  TokenHolders: TokenHolders;
};

export interface TokenHolders {
  farcasterProfileCount: number;
  primaryEnsUsersCount: number;
  totalHolders: number;
  xmtpUsersCount: number;
  lensProfileCount: number;
  ensUsersCount: number;
}

export interface TotalPoapsSupply {
  PoapEvents: PoapEvents;
}

export interface PoapEvents {
  PoapEvent: [
    {
      tokenMints: number;
    }
  ];
}
