import { Emoji, Message } from './error.styles';
import { FormattedMessage, defineMessages, useIntl } from 'i18n';

const messages = defineMessages({
  personGesturingNo: { defaultMessage: 'person gesturing no' },
});

export default function Forbidden() {
  const intl = useIntl();
  const emojiAriaLabel = intl.formatMessage(messages.personGesturingNo);

  return (
    <Message>
      <Emoji role="img" aria-label={emojiAriaLabel}>
        🙅
      </Emoji>
      <h1>
        <span className="notranslate">403:</span> <FormattedMessage defaultMessage="forbidden" />
      </h1>
      <div>
        <FormattedMessage defaultMessage="i'm sorry, dave. i'm afraid i can't do that." />
        <br />
        <FormattedMessage defaultMessage="try logging in." />
      </div>
    </Message>
  );
}
