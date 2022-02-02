import { Emoji, Message } from 'components/error/error.styles';
import { FormattedMessage, defineMessages, useIntl } from 'i18n';

const messages = defineMessages({
  monkeys: { defaultMessage: 'see no evil, hear no evil, speak no evil monkeys' },
});

export default function NotFound() {
  const intl = useIntl();
  const emojiAriaLabel = intl.formatMessage(messages.monkeys);

  return (
    <Message>
      <Emoji role="img" aria-label={emojiAriaLabel}>
        🙈 🙉 🙊
      </Emoji>
      <h1>
        <span className="notranslate">500:</span> <FormattedMessage defaultMessage="internal server error" />
      </h1>
      <div>
        <FormattedMessage defaultMessage="it's not you, it's us. our server is monkeying around." />
        <br />
        <FormattedMessage defaultMessage="we've logged this error and we'll fix it soon." />
      </div>
    </Message>
  );
}
