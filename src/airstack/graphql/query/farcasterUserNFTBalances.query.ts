import { TokenBlockchain } from "../types";

export const farcasterUserNFTBalances = (
  chains: TokenBlockchain[] | null | undefined = [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Polygon,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
  ]
) =>
  /* GraphQL */ `
  query FarcasterNFTBalances(
    $identity: Identity = ""
    $tokenType: [TokenType!] = [ERC721, ERC1155]
    $limit: Int = 200
  ) {
    ` +
  chains
    ?.map(
      (chain) => `
    ${chain}: TokenBalances(
      input: {
        filter: { owner: { _eq: $identity }, tokenType: { _in: $tokenType } }
        blockchain: ${chain}
        limit: $limit
      }
    ) {
      TokenBalance {
        tokenType
        blockchain
        tokenAddress
        tokenId
        formattedAmount
        amount
        token {
          name
          symbol
        }
        tokenNfts {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
              original
            }
          }
          metaData {
            name
            description
            image
            imageData
            externalUrl
            animationUrl
            youtubeUrl
            backgroundColor
            attributes {
              displayType
              maxValue
              trait_type
              value
            }
          }
        }
      }
    }`
    )
    .join("") +
  `
  }
`;
