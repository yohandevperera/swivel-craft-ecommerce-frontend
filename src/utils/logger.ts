import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import _ from "lodash";

/**
 *
 * Description & Usage  - This file will act as the main config file
 * to initialize sentry
 *
 */


/**
 *
 * Description & Usage  - This function will be used as the sentry 
 * initialization function
 *
 */
export const initSentryLogger = () => {
  if (
    !_.isUndefined(process.env.REACT_APP_ENVIRONMENT) &&
    process.env.REACT_APP_ENVIRONMENT == "production"
  ) {
    Sentry.init({
      dsn: _.isUndefined(process.env.REACT_APP_SENTRY_DSN)
        ? "https://4beb698006c841c28e4511153618baff@o4504753472471040.ingest.sentry.io/4504753501306880 "
        : process.env.REACT_APP_SENTRY_DSN,
      integrations: [new BrowserTracing()],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  }
};
