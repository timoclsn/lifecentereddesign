'use client';

import { Button, InfoBox } from 'design-system';
import { track } from 'lib/tracking';
import { AlertTriangle, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { useRef } from 'react';
import {
  errorStyles,
  inputStyles,
} from '../../../components/ForrestSection/ForrestSection';
import { useAction } from '../../../lib/serverActions/client';
import { submit } from './actions';

export const SuggestionForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const { error, validationErrors, isRunning, isSuccess, runAction } =
    useAction(submit, {
      onSuccess: () => {
        formRef.current?.reset();
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        track('Resource Suggestion');
      },
      onError: () => {
        if (!linkInputRef.current) return;
        linkInputRef.current.focus();
        linkInputRef.current.type = 'text';
        linkInputRef.current.setSelectionRange(
          0,
          linkInputRef.current.value.length,
        );
        linkInputRef.current.type = 'url';
      },
    });

  return (
    <form
      id="suggestion-form"
      ref={formRef}
      className="mx-auto flex w-full max-w-prose flex-col items-start gap-10"
      action={(formData) => {
        runAction({
          link: String(formData.get('link')),
          name: String(formData.get('name')),
          message: String(formData.get('name')),
        });
      }}
    >
      {/* Link input */}
      <div className="relative w-full">
        <label htmlFor="link" className="sr-only">
          Resource link
        </label>
        <input
          id="link"
          ref={linkInputRef}
          name="link"
          type="url"
          required
          aria-describedby="link-error"
          placeholder="Link to resource"
          className={inputStyles({ error: !!validationErrors?.link })}
        />
        {validationErrors?.link && (
          <div id="link-error" aria-live="polite">
            <p className={errorStyles}>{validationErrors.link[0]}</p>
          </div>
        )}
      </div>

      {/* Name input */}
      <div className="relative w-full">
        <label htmlFor="link" className="sr-only">
          Optional Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          aria-describedby="name-error"
          placeholder="Your name for attribution (optional)"
          className={inputStyles({ error: !!validationErrors?.name })}
        />
        {validationErrors?.name && (
          <div id="name-error" aria-live="polite">
            <p className={errorStyles}>{validationErrors.name[0]}</p>
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="relative w-full">
        <label htmlFor="link" className="sr-only">
          Optional message
        </label>
        <textarea
          id="message"
          name="message"
          aria-describedby="message-error"
          placeholder="Message about the resource (optional)"
          rows={6}
          className={inputStyles({ error: !!validationErrors?.message })}
        />
        {validationErrors?.message && (
          <div id="message-error" aria-live="polite">
            <p className={errorStyles}>{validationErrors.message[0]}</p>
          </div>
        )}
      </div>

      {/* Submit button */}
      <Button type="submit" size="large" disabled={isRunning}>
        {isRunning ? <Loader2 className="animate-spin" /> : <Mail />}
        Submit
      </Button>

      {/* Server messages */}
      {isSuccess && (
        <div aria-live="polite" role="status">
          <InfoBox
            variant="success"
            icon={<CheckCircle2 />}
            className="animate-in zoom-in-0 fade-in duration-150 ease-in-out"
          >
            Thanks for your contribution! We&apos;ll get the resource on the
            site as soon as possible.
          </InfoBox>
        </div>
      )}
      {error && !validationErrors && (
        <div aria-live="polite" role="status">
          <InfoBox
            variant="error"
            icon={<AlertTriangle />}
            className="animate-in zoom-in-50 fade-in duration-150 ease-in-out"
          >
            {error}
          </InfoBox>
        </div>
      )}
    </form>
  );
};
