import { F, defineMessages, useIntl } from 'i18n';

import {Message, Emoji} from './error.styles';

const messages = defineMessages({
  upsideDownFace: { defaultMessage: 'upside down face' },
});

export default function NotFound() {
  const intl = useIntl();
  const emojiAriaLabel = intl.formatMessage(messages.upsideDownFace);

  return (
    <Message>
      <Emoji role="img" aria-label={emojiAriaLabel}>
        🙃
      </Emoji>
      <h1>
        404: <F defaultMessage="not found" />
      </h1>
      <div>
        <F defaultMessage="i'm sorry, dave. i'm afraid i can't do that." />
        <br />
        <F defaultMessage="try going back to the <a>beginning</a>." values={{ a: (msg) => <a href="/">{msg}</a> }} />
      </div>
    </Message>
  );
}
