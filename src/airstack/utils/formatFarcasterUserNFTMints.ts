import { FarcasterUserNftMintsQuery } from "../types";

export function formatFarcasterUserNFTMints(data: FarcasterUserNftMintsQuery) {
  const { ethereum, polygon, base, zora } = data ?? {};
  return [
    ...(ethereum?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        tokenId,
        tokenType,
        blockTimestamp,
        blockNumber,
        tokenNft,
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNft ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          tokenId,
          tokenType,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
          image,
          metaData,
        };
      }
    ) ?? []),
    ...(polygon?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        tokenId,
        tokenType,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        blockTimestamp,
        blockNumber,
        tokenNft,
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNft ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          tokenId,
          tokenType,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
          image,
          metaData,
        };
      }
    ) ?? []),
    ...(base?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        tokenId,
        tokenType,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        blockTimestamp,
        blockNumber,
        tokenNft,
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNft ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          tokenId,
          tokenType,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
          image,
          metaData,
        };
      }
    ) ?? []),
    ...(zora?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        tokenId,
        tokenType,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        blockTimestamp,
        blockNumber,
        tokenNft,
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNft ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          tokenId,
          tokenType,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
          image,
          metaData,
        };
      }
    ) ?? []),
  ];
}
