import {
  KeyboardEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { capitalizeFirstLetter, pluralize } from '../../utils';
import { isMobileDevice } from '../../utils/isMobileDevice';
import { Icon } from '../Icon';
import ImageWithFallback from '../ImageWithFallback';
import { AddressInput } from './AddressInput';
import {
  ADDRESS_OPTION_ID,
  MENTION_COUNT,
  MENTION_MARKUP,
  MENTION_REGEX,
  POAP_OPTION_ID
} from './constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Mention, MentionsInput } from './react-mentions';
import {
  AdvancedMentionSearchParams,
  MentionType,
  SearchAIMentionsResponse,
  SearchAIMentionsResults
} from './types';
import {
  ID_REGEX,
  MENTION_TYPE_MAP,
  REGEX_LAST_WORD_STARTS_WITH_AT,
  debouncePromise,
  fetchAIMentions,
  generateId,
  getMentionCount,
  getNameFromMarkup,
  highlightMention,
  truncateMentionLabel
} from './utils';

import './styles.css';

type Option = SearchAIMentionsResults & {
  id: string;
  display: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function InputWithMention({
  mentionInputRef,
  value,
  disabled,
  placeholder,
  disableSuggestions,
  onChange,
  onSubmit,
  onAdvancedMentionSearch
}: {
  mentionInputRef?: MutableRefObject<HTMLTextAreaElement | null>;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  disableSuggestions?: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onAdvancedMentionSearch?: (data: AdvancedMentionSearchParams) => void;
}) {
  const [showInputFor, setShowInputFor] = useState<
    'ID_ADDRESS' | 'ID_POAP' | null
  >(null);
  const [inputPosition, setInputPosition] = useState({
    top: 'auto',
    left: 'auto',
    right: 'auto'
  });
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const allowSubmitRef = useRef(true);
  const valueRef = useRef(value);
  const lastPositionOfCaretRef = useRef(0);
  const isSuggestionClickedRef = useRef(false);
  const [loading, setLoading] = useState(false);

  const isMobile = isMobileDevice();

  // store refs so that it can be used in events without triggering useEffect
  valueRef.current = value;

  const getMentions = useCallback(async (query: string) => {
    setLoading(true);
    const res = await fetchAIMentions<SearchAIMentionsResponse>({
      input: { searchTerm: query, limit: MENTION_COUNT }
    });
    setLoading(false);
    return res;
  }, []);

  const handleInputRef = useCallback(
    (el: HTMLTextAreaElement) => {
      inputRef.current = el;
      if (mentionInputRef) {
        mentionInputRef.current = el; // expose mention input to outside
      }
    },
    [mentionInputRef]
  );

  const handlePaste = useCallback((event: ClipboardEvent) => {
    if (event.target !== inputRef.current) {
      return;
    }
    const REGEX_WORD_STARTS_WITH_AT = /\s@[^\s-]*/g;
    const REGEX_FIRST_WORD_STARTS_WITH_AT = /^@\w+/g;

    // find the first word that starts with @
    let match = REGEX_WORD_STARTS_WITH_AT.exec(valueRef.current || '');
    // if no match, try to match the first word of the value if it starts with @
    if (!match) {
      match = REGEX_FIRST_WORD_STARTS_WITH_AT.exec(valueRef.current || '');
    }
    if (match && inputRef.current) {
      const matchingText = match[0];
      const caretPosition = matchingText.length + match.index;
      inputRef.current.setSelectionRange(caretPosition, caretPosition);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  useEffect(() => {
    inputRef.current?.setAttribute('autocomplete', 'off');
    return highlightMention(inputRef.current, disableSuggestions);
  }, [disableSuggestions]);

  const handleUserInput = useCallback(
    (event: { target: { value: string } }) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const handleKeypress: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    event => {
      if (event.key === 'Enter') {
        // prevent submission when user is selecting a suggestion from the dropdown menu with Enter key
        if (!allowSubmitRef.current) {
          allowSubmitRef.current = true;
          return;
        }
        event.preventDefault();
        // blur on enter key press
        inputRef.current?.blur();
        onSubmit(valueRef.current);
      }
    },
    [onSubmit]
  );

  const handleBlur = useCallback(
    (_: React.FocusEvent<HTMLInputElement>, clickedSuggestion: boolean) => {
      if (clickedSuggestion) {
        isSuggestionClickedRef.current = true;
      }
    },
    []
  );

  const triggerAdvancedMentionSearch = useCallback(
    ({
      query,
      querySequenceStart,
      querySequenceEnd
    }: {
      query: string;
      querySequenceStart: number;
      querySequenceEnd: number;
    }) => {
      if (!onAdvancedMentionSearch) {
        return;
      }
      onAdvancedMentionSearch({
        query,
        queryStartIndex: querySequenceStart,
        queryEndIndex: querySequenceEnd
      });
    },
    [onAdvancedMentionSearch]
  );

  const onAddSuggestion = useCallback((id: string) => {
    // allow submission only if suggestion is clicked
    if (isSuggestionClickedRef.current) {
      allowSubmitRef.current = true;
    } else {
      allowSubmitRef.current = false;
    }

    // reset value for next iteration
    isSuggestionClickedRef.current = false;

    if (id === ADDRESS_OPTION_ID || id === POAP_OPTION_ID) {
      const overlay = document.getElementById(
        'suggestions-overlay'
      ) as HTMLElement;

      const top = overlay.style.top
        ? `${parseInt(overlay.style.top, 10)}px`
        : 'auto';
      let left = overlay.style.left
        ? `${parseInt(overlay.style.left, 10)}px`
        : 'auto';
      const right = overlay.style.right
        ? `${parseInt(overlay.style.right, 10)}px`
        : 'auto';

      if (left !== 'auto' && inputRef.current) {
        const maxLeft = 290 + parseInt(left, 10);
        const isGoingPastInputBorder = inputRef.current.offsetWidth < maxLeft;
        left = isGoingPastInputBorder
          ? `${inputRef.current.offsetWidth - 290}px`
          : left;
      }
      setInputPosition({
        top: top,
        left: left,
        right: right
      });
      setShowInputFor(id);
      lastPositionOfCaretRef.current = inputRef.current?.selectionStart || 0;

      return false; // don't add the mention to input
    }
    return true; // add the mention
  }, []);

  const handleCloseAddressInput = useCallback(
    (address: string) => {
      setShowInputFor(null);
      // wait for address input to hide before taking focus back to input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);

      if (!address) return;

      let extraLengthTakenByMention = 0;

      const mentionMarkups = valueRef.current.match(ID_REGEX);
      // find out how many characters the mention markup is longer than the id
      // so we can adjust the caret position accordingly
      // the mention markup is longer than the id because it contains the display name
      mentionMarkups?.forEach(mention => {
        extraLengthTakenByMention +=
          mention.trimEnd().length - getNameFromMarkup(mention).length;
      });

      const actualCaretPosition =
        lastPositionOfCaretRef.current + extraLengthTakenByMention;

      let textBeforeCaret = valueRef.current.slice(0, actualCaretPosition);
      const remainingText = valueRef.current.slice(actualCaretPosition);
      const startsWithAt = textBeforeCaret[0] === '@';
      // add space in front of the mention if it doesn't start with @, otherwise the regex won't match
      textBeforeCaret = startsWithAt ? ' ' + textBeforeCaret : textBeforeCaret;

      const displayLabel = isMobile ? truncateMentionLabel(address) : address;

      textBeforeCaret = textBeforeCaret
        .trimEnd()
        .replace(
          REGEX_LAST_WORD_STARTS_WITH_AT,
          ` #⎱${displayLabel}⎱(${address}    ${showInputFor})`
        );

      if (startsWithAt) {
        // remove the space we added in front of the mention
        textBeforeCaret = textBeforeCaret.substring(1);
      }

      const newValue = textBeforeCaret + remainingText.trimStart();
      handleUserInput({ target: { value: newValue } });
    },
    [handleUserInput, isMobile, showInputFor]
  );

  const displayTransform = useCallback(
    (_: string, display: string) => {
      const truncateLabel = isMobile && getMentionCount(valueRef.current) === 0;
      return truncateLabel ? truncateMentionLabel(display) : display;
    },
    [isMobile]
  );

  const fetchMentions = useCallback(
    async (query: string): Promise<Option[]> => {
      const [data] = await getMentions(query);
      if (data?.SearchAIMentions?.results) {
        return data.SearchAIMentions.results.map(mention => ({
          ...mention,
          id: generateId(mention),
          display: mention.name,
          blockchain: capitalizeFirstLetter(mention.blockchain || '')
        }));
      }
      return [];
    },
    [getMentions]
  );

  const debouncedFetch = useMemo(
    () => debouncePromise(fetchMentions),
    [fetchMentions]
  );

  const getData = useCallback(
    async ({ query }: { query: string }, callback: (data: unknown) => void) => {
      // Prevent debouncedFetch from invoking after selecting suggestion
      // It solves the issue of the dropdown skeleton appearing for 2 seconds again
      if (isSuggestionClickedRef.current) {
        return;
      }
      const data = await debouncedFetch(query);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataWithExtraOptions: any[] = data || [];
      dataWithExtraOptions.push(
        { id: ADDRESS_OPTION_ID },
        { id: POAP_OPTION_ID }
      );
      callback(dataWithExtraOptions);
    },
    [debouncedFetch]
  );

  const renderSuggestion = (suggestion: Option) => {
    if (suggestion.id === ADDRESS_OPTION_ID) {
      return (
        <div className="addressOption">
          <Icon name="input-tokens" /> Enter token contract address
        </div>
      );
    }

    if (suggestion.id === POAP_OPTION_ID) {
      return (
        <div className="addressOption">
          <Icon name="input-poap" /> Enter a POAP event ID
        </div>
      );
    }

    const tokenMints = suggestion?.metadata?.tokenMints;
    const showPOAPHolderCount =
      suggestion.type === MentionType.POAP && Number.isInteger(tokenMints);

    return (
      <div className="suggestion">
        <ImageWithFallback
          height={18}
          width={18}
          src={suggestion?.image?.extraSmall}
          alt={suggestion?.blockchain}
          fallback={
            suggestion?.blockchain
              ? `/images/blockchains/${suggestion.blockchain}.png`
              : ''
          }
        />
        <span className="text">
          <p className="text-left">
            {suggestion.display}
            <span className="type">
              {suggestion.blockchain}
              <span>•</span>
              {MENTION_TYPE_MAP[suggestion.type] || ''}
              {showPOAPHolderCount && (
                <>
                  <span>•</span>
                  {pluralize(tokenMints, 'holder')}
                </>
              )}
            </span>
          </p>
        </span>
      </div>
    );
  };

  return (
    <div className="wrapper w-full sm:w-auto sm:p-auto h-full">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore-next-line */}
      <MentionsInput
        id="mention-input"
        singleLine
        style={{ outline: 'none' }}
        placeholder={placeholder}
        onKeyUp={handleKeypress}
        onBlur={handleBlur}
        className="mentions"
        value={value}
        onChange={handleUserInput}
        spellCheck={false}
        inputRef={handleInputRef}
        disabled={showInputFor || disabled}
        customChildren={
          showInputFor ? (
            <AddressInput
              {...inputPosition}
              placeholder={
                showInputFor === ADDRESS_OPTION_ID
                  ? 'Enter contract address here'
                  : 'Enter POAP event id here'
              }
              onRequestClose={handleCloseAddressInput}
            />
          ) : null
        }
      >
        <Mention
          markup={MENTION_MARKUP}
          regex={MENTION_REGEX}
          displayTransform={displayTransform}
          trigger="@"
          appendSpaceOnAdd
          onAdd={onAddSuggestion}
          className="mention"
          isLoading={loading}
          renderSuggestion={disableSuggestions ? null : renderSuggestion}
          data={
            disableSuggestions
              ? noop
              : onAdvancedMentionSearch
              ? triggerAdvancedMentionSearch
              : getData
          }
        />
      </MentionsInput>
    </div>
  );
}
