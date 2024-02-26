import { Asset } from '../../../Components/Asset';
import { Icon } from '../../../Components/Icon';
import LazyImage from '../../../Components/LazyImage';
import { formatDate } from '../../../utils';
import { checkBlockchainSupportForToken } from '../../../utils/activeTokenInfoString';
import { Social } from './types';

export function CardLoader({ isLensDapp }: { isLensDapp: boolean }) {
  return (
    <div className="skeleton-loader w-full flex max-sm:flex-col items-center">
      <div
        data-loader-type="block"
        className="w-[180px] h-[180px] shrink-0 rounded-2xl"
      />
      <div className="p-6 w-full flex flex-col max-sm:items-center">
        <div data-loader-type="block" className="h-6 w-[200px]" />
        <div
          data-loader-type="block"
          className="h-5 w-[246px] max-sm:w-full mt-4"
        />
        <div
          data-loader-type="block"
          className="h-5 w-[246px] max-sm:w-full mt-3"
        />
        <div
          data-loader-type="block"
          className="h-5 w-[246px] max-sm:w-full mt-3"
        />
        {!isLensDapp && (
          <div
            data-loader-type="block"
            className="h-5 w-[246px] max-sm:w-full mt-3"
          />
        )}
      </div>
    </div>
  );
}

export function Card({
  item,
  isLensDapp
}: {
  item: Social;
  isLensDapp: boolean;
}) {
  // for lens pick profile image url from profileImageContentValue
  const profileImageUrl = isLensDapp
    ? item.profileImageContentValue?.image?.small
    : item.profileImage;

  const useAssetComponent =
    !profileImageUrl && checkBlockchainSupportForToken(item.blockchain);

  return (
    <div className="flex-1 flex max-sm:flex-col items-center">
      {useAssetComponent ? (
        <Asset
          preset="medium"
          containerClassName="h-[180px] w-[180px]"
          imgProps={{ className: 'max-h-[180px] max-w-[180px]' }}
          chain={item.blockchain}
          tokenId={item.profileTokenId}
          address={item.profileTokenAddress}
        />
      ) : (
        <LazyImage
          className="object-cover rounded-2xl h-[180px] w-[180px] shrink-0"
          src={profileImageUrl}
          height={180}
          width={180}
        />
      )}
      <div className="p-6 w-full">
        <div className="flex items-center max-sm:justify-center">
          <div className="mr-1 text-base">{item.profileHandle}</div>
          <div className="text-text-secondary text-sm">
            #{item.profileTokenId}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-[auto_1fr] [&>div:nth-child(even)]:text-text-secondary gap-x-4 gap-y-3 text-sm">
          {isLensDapp ? (
            <>
              {item.isDefault ? (
                <>
                  <div className="flex items-center">
                    <Icon
                      name="check-mark-circle"
                      className="mr-1.5"
                      height={14}
                      width={14}
                    />
                    Default profile
                  </div>
                  <div />
                </>
              ) : null}
            </>
          ) : (
            <>
              <div>Display name</div>
              <div>{item.profileDisplayName || '--'}</div>
              <div>Bio</div>
              <div>{item.profileBio || '--'}</div>
            </>
          )}
          <div>Created date</div>
          <div>
            {item.profileCreatedAtBlockTimestamp
              ? formatDate(item.profileCreatedAtBlockTimestamp)
              : '--'}
          </div>
          <div>Created at (block)</div>
          <div>{item.profileCreatedAtBlockNumber || '--'}</div>
        </div>
      </div>
    </div>
  );
}
