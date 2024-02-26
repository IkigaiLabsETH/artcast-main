import classNames from 'classnames';
import { memo, useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetPoapsOfOwner } from '../../hooks/useGetPoapsOfOwner';
import { useGetTokensOfOwner } from '../../hooks/useGetTokensOfOwner';
import { UserInputs } from '../../hooks/useSearchInput';
import { emit } from '../../utils/eventEmitter/eventEmitter';
import { Token } from './Token';
import { TokenCombination } from './TokenCombination';
import { TokenWithERC6551 } from './TokenWithERC6551';
import { PoapType, TokenType } from './types';
import { isMobileDevice } from '../../utils/isMobileDevice';

const loaderData = Array(6).fill({ token: {}, tokenNfts: {} });

export function TokensLoader() {
  return (
    <>
      {loaderData.map((_, index) => (
        <div className="skeleton-loader" key={index}>
          <Token key={index} token={null} hideHoldersButton />
        </div>
      ))}
    </>
  );
}

type TokenProps = Pick<
  UserInputs,
  | 'address'
  | 'tokenType'
  | 'blockchainType'
  | 'sortOrder'
  | 'spamFilter'
  | 'mintFilter'
  | 'activeSnapshotInfo'
> & {
  poapDisabled?: boolean;
  tokenDisabled?: boolean;
  includeERC20?: boolean;
};

function TokensComponent(props: TokenProps) {
  const {
    address: owners,
    tokenType: tokenType = '',
    blockchainType,
    sortOrder,
    spamFilter,
    mintFilter,
    activeSnapshotInfo,
    includeERC20,
    poapDisabled,
    tokenDisabled
  } = props;
  const [tokens, setTokens] = useState<(TokenType | PoapType)[] | null>(null);

  const handleTokens = useCallback((tokens: (TokenType | PoapType)[]) => {
    setTokens(prevTokens => [...(prevTokens || []), ...tokens]);
  }, []);

  const isMobile = isMobileDevice();

  const inputs = {
    address: owners,
    tokenType,
    blockchainType,
    sortOrder,
    spamFilter,
    mintFilter,
    activeSnapshotInfo,
    includeERC20
  };

  const hasAllChainFilter = blockchainType?.length === 0;

  // !Gnosis: Fetch poaps when gnosis blockchain filter is selected
  const hasGnosisChainFilter =
    blockchainType?.length === 1 && blockchainType[0] === 'gnosis';

  const hasAllTokenFilter = !tokenType;
  const hasPoapTokenFilter = tokenType === 'POAP';

  // canFetchTokens and canFetchPoaps dictates whether tokens or poaps should be fetched or not
  // Same values are passed into hooks to enable/disable them separately
  const canFetchTokens =
    !tokenDisabled && !hasGnosisChainFilter && !hasPoapTokenFilter;

  const canFetchPoaps =
    !poapDisabled &&
    (hasAllChainFilter || hasGnosisChainFilter) &&
    (hasAllTokenFilter || hasPoapTokenFilter);

  const {
    loading: loadingPoaps,
    getNext: getNextPoaps,
    processedPoapsCount,
    hasNextPage: hasNextPagePoaps
  } = useGetPoapsOfOwner(inputs, handleTokens, !canFetchPoaps);

  const {
    loading: loadingTokens,
    getNext: getNextTokens,
    processedTokensCount,
    hasNextPage: hasNextPageTokens
  } = useGetTokensOfOwner(inputs, handleTokens, !canFetchTokens);

  const handleNext = useCallback(() => {
    if (canFetchTokens && !loadingTokens && hasNextPageTokens) {
      getNextTokens();
    }
    if (canFetchPoaps && !loadingPoaps && hasNextPagePoaps) {
      getNextPoaps();
    }
  }, [
    canFetchPoaps,
    canFetchTokens,
    getNextPoaps,
    getNextTokens,
    hasNextPagePoaps,
    hasNextPageTokens,
    loadingPoaps,
    loadingTokens
  ]);

  const loading = loadingTokens || loadingPoaps;

  const tokensLength = tokens?.length ?? 0;

  // If can't fetch both tokens or poaps due to filter conditions -> show no data found
  const forceNoDataFound = !canFetchPoaps && !canFetchTokens;

  useEffect(() => {
    const totalProcessedTokens = processedTokensCount + processedPoapsCount;
    emit('token-balances:tokens', {
      matched: tokensLength,
      total: totalProcessedTokens,
      loading
    });
  }, [processedPoapsCount, processedTokensCount, tokensLength, loading]);

  // Using tokens?.length here because first time tokens will null initially
  // Don't want to show 'No data found!' when data is restored from cache
  if ((tokens?.length === 0 && !loading) || forceNoDataFound) {
    return (
      <div className="flex flex-1 justify-center mt-10">No data found!</div>
    );
  }

  const hasCombination = owners.length > 1;
  const hasNextPage = hasNextPageTokens || hasNextPagePoaps;

  if (tokensLength === 0 && loading) {
    return (
      <div>
        <div className="flex flex-wrap gap-x-[55px] gap-y-[55px] justify-center md:justify-start">
          <TokensLoader />
        </div>
      </div>
    );
  }

  return (
    <>
      <InfiniteScroll
        next={handleNext}
        dataLength={tokensLength}
        hasMore={hasNextPage}
        loader={null}
        className={classNames(
          'flex flex-wrap justify-center md:justify-start mb-10',
          {
            'gap-x-[20px] gap-y-[20px]': hasCombination,
            'gap-x-[55px] gap-y-[55px]': !hasCombination
          }
        )}
      >
        {tokens?.map((token, index) => {
          const id =
            (token as PoapType)?.tokenId ||
            (token as TokenType)?.tokenNfts?.tokenId;

          if (hasCombination) {
            return (
              <TokenCombination
                key={`${index}-${id}`}
                token={token}
                isMobile={isMobile}
              />
            );
          }

          const hasERC6551 =
            (token as TokenType)?.tokenNfts?.erc6551Accounts?.length > 0;

          if (hasERC6551) {
            return (
              <TokenWithERC6551
                key={`${index}-${id}`}
                token={token}
                isMobile={isMobile}
              />
            );
          }

          return (
            <Token
              key={`${index}-${id}`}
              token={token}
              hideHoldersButton={loading}
              isMobile={isMobile}
            />
          );
        })}
        {loading && <TokensLoader />}
      </InfiniteScroll>
    </>
  );
}

export const Tokens = memo(TokensComponent);
