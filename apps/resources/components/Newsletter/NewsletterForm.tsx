'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { Button, InfoBox } from 'design-system';
import { track } from 'lib/tracking';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Loader2,
  Mail,
} from 'lucide-react';
import { useAction } from '../../lib/serverActions/client';
import {
  checkboxStyles,
  errorStyles,
  inputStyles,
} from '../ForrestSection/ForrestSection';
import { subscribe } from './actions';
import { useRef } from 'react';

export const NewsletterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { isRunning, isSuccess, error, validationErrors, runAction } =
    useAction(subscribe, {
      onSuccess: () => {
        formRef.current?.reset();
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        track('Newsletter Signup');
      },
      onError: () => {
        if (!emailInputRef.current) return;
        emailInputRef.current.focus();
        emailInputRef.current.type = 'text';
        emailInputRef.current.setSelectionRange(
          0,
          emailInputRef.current.value.length,
        );
        emailInputRef.current.type = 'email';
      },
    });

  return (
    <form
      id="newsletter-form"
      ref={formRef}
      action={(formData) => {
        runAction({
          consens: formData.get('consens') === 'on',
          email: String(formData.get('email')),
        });
      }}
      className="mx-auto flex w-full max-w-prose flex-col items-start gap-10"
    >
      {/* Email input */}
      <div className="relative w-full">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          ref={emailInputRef}
          name="email"
          type="email"
          aria-describedby="email-error"
          required
          placeholder="Email address"
          className={inputStyles({ error: !!validationErrors?.email })}
        />
        {validationErrors?.email && (
          <div id="email-error" aria-live="polite">
            <p className={errorStyles}>{validationErrors.email[0]}</p>
          </div>
        )}
      </div>

      {/* Consens checkbox */}
      <div className="relative flex items-center gap-3">
        <Checkbox.Root
          id="consens"
          name="consens"
          aria-describedby="consens-error"
          required
          className={checkboxStyles({ error: !!validationErrors?.consens })}
        >
          <span className="sr-only">Consens checkbox toggle button</span>
          <Checkbox.Indicator className="animate-in zoom-in-150 fade-in-50 duration-100">
            <Check />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="Label" htmlFor="consens">
          Yes, I want to receive the newsletter
        </label>
        {validationErrors?.consens && (
          <div id="consens-error" aria-live="polite">
            <p className={errorStyles}>{validationErrors.consens[0]}</p>
          </div>
        )}
      </div>

      {/* Submit button */}
      <Button type="submit" size="large" disabled={isRunning}>
        {isRunning ? <Loader2 className="animate-spin" /> : <Mail />}
        Subscribe
      </Button>

      {/* Server messages */}
      {isSuccess && (
        <div aria-live="polite" role="status">
          <InfoBox
            variant="success"
            icon={<CheckCircle2 />}
            className="animate-in zoom-in-0 fade-in duration-150 ease-in-out"
          >
            Almost finished... We need to confirm your email address. To
            complete the subscription process, please click the link in the
            email we just sent you.
          </InfoBox>
        </div>
      )}
      {error && (
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
