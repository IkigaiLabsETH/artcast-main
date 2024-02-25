import { FarcasterErc20BalancesQuery } from "../types";

export function formatFarcasterUserERC20Balances(
  data: FarcasterErc20BalancesQuery
) {
  const { ethereum, polygon, base, zora } = data ?? {};
  return [
    ...(ethereum?.TokenBalance?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
      }) => {
        const { name, symbol } = token ?? {};
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
        };
      }
    ) ?? []),
    ...(polygon?.TokenBalance?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
      }) => {
        const { name, symbol } = token ?? {};
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
        };
      }
    ) ?? []),
    ...(base?.TokenBalance?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
      }) => {
        const { name, symbol } = token ?? {};
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
        };
      }
    ) ?? []),
    ...(zora?.TokenBalance?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
      }) => {
        const { name, symbol } = token ?? {};
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
        };
      }
    ) ?? []),
  ];
}
