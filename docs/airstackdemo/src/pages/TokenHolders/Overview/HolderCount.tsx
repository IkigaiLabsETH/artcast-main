import classNames from 'classnames';
import { Icon } from '../../../Components/Icon';
import { useSearchInput } from '../../../hooks/useSearchInput';

export function HolderCount({
  count,
  subText,
  images,
  loading,
  disableAction,
  name,
  tokenName,
  withoutCount,
  sectionName
}: {
  count: string | number;
  subText: string;
  loading: boolean;
  name: string;
  tokenName: string;
  disableAction: boolean;
  images: React.JSX.Element[];
  withoutCount?: boolean;
  sectionName: string;
}) {
  const setInputs = useSearchInput()[1];

  return (
    <div
      className={classNames(
        'px-3 py-5 flex items-center rounded-18 bg-glass border border-solid border-transparent',
        {
          'pointer-events-none': disableAction,
          'hover:border-stroke-color-light cursor-pointer ': !loading
        }
      )}
      data-loader-type="block"
      data-loader-height="auto"
      onClick={() => {
        setInputs(
          {
            activeView: name,
            activeViewToken: tokenName,
            activeViewCount: !count || count === '--' ? '0' : '' + count,
            tokenFilters: [name]
          },
          {
            updateQueryParams: true
          }
        );
      }}
    >
      <div
        className="flex relative min-w-[47px] min-h-[47px]"
        style={{ marginRight: images.length * 5 }}
      >
        {images &&
          images.map((image, index) => (
            <div
              key={index}
              style={{ left: 10 * index, zIndex: length - index }}
              className="absolute rounded-full min-w-[47px] w-[47px] h-[47px] overflow-hidden flex-row-center"
            >
              {image}
            </div>
          ))}
      </div>
      <div className="pl-2.5 flex-1 overflow-hidden">
        <div className="text-xl font-bold">
          {loading ? (
            <div className="h-6 flex items-center">
              <Icon name="count-loader" className="h-2.5 w-auto" />
            </div>
          ) : (
            count
          )}
        </div>
        {!loading && withoutCount && (
          <div className="text-xs font-normal leading-normal pr-1">{`Combined holders with ${sectionName} ->`}</div>
        )}
        {subText && (
          <div className="text-text-secondary text-xs ellipsis">{subText}</div>
        )}
      </div>
    </div>
  );
}
