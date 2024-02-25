import { FarcasterUserTokenReceivedByQuery, TokenType } from "../types";

export function formatFarcasterUserTokenReceivedBy(
  data: FarcasterUserTokenReceivedByQuery
) {
  const { ethereum, polygon, base, zora } = data ?? {};
  return [
    ...(ethereum?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        amount,
        amountInWei,
        token,
        blockTimestamp,
        blockNumber,
        txHash,
        sender,
        tokenNft,
        tokenType,
        tokenId,
      }) => {
        let nftData = {};
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNft ?? {};
        const { image } = contentValue ?? {};
        if (tokenType !== TokenType.ERC20)
          nftData = { ...nftData, metaData, image, tokenId };
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
          txHash,
          tokenType,
          sender,
          ...nftData,
        };
      }
    ) ?? []),
    ...(polygon?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        amount,
        amountInWei,
        token,
        blockTimestamp,
        blockNumber,
        txHash,
        sender,
        tokenNft,
        tokenType,
        tokenId,
      }) => {
        let nftData = {};
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNft ?? {};
        const { image } = contentValue ?? {};
        if (tokenType !== TokenType.ERC20)
          nftData = { ...nftData, metaData, image, tokenId };
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
          tokenType,
          txHash,
          sender,
          ...nftData,
        };
      }
    ) ?? []),
    ...(base?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        amount,
        amountInWei,
        token,
        blockTimestamp,
        blockNumber,
        txHash,
        sender,
        tokenNft,
        tokenType,
        tokenId,
      }) => {
        let nftData = {};
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNft ?? {};
        const { image } = contentValue ?? {};
        if (tokenType !== TokenType.ERC20)
          nftData = { ...nftData, metaData, image, tokenId };
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
          tokenType,
          txHash,
          sender,
          ...nftData,
        };
      }
    ) ?? []),
    ...(zora?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        amount,
        amountInWei,
        token,
        blockTimestamp,
        blockNumber,
        txHash,
        sender,
        tokenNft,
        tokenType,
        tokenId,
      }) => {
        let nftData = {};
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNft ?? {};
        const { image } = contentValue ?? {};
        if (tokenType !== TokenType.ERC20)
          nftData = { ...nftData, metaData, image, tokenId };
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
          tokenType,
          txHash,
          sender,
          ...nftData,
        };
      }
    ) ?? []),
  ];
}
