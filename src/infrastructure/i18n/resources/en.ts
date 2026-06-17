export const en = {
  common: {
    noResults: 'No results found',
  },
  home: {
    brandSubtitle: 'Multi-currency payments',
    signIn: 'Sign in',
    createAccount: 'Create account',
    eyebrow: 'Payment request management',
    title: 'Manage company payments across currencies with confidence.',
    description:
      'Employees can submit payment requests in local currencies while finance teams review every request with immutable exchange-rate snapshots and clear approval history.',
    metrics: {
      currencies: {
        label: 'Currencies',
        value: '160+',
      },
      reviewWindow: {
        label: 'Review window',
        value: '48h',
      },
      rateSource: {
        label: 'Rate source',
        value: 'Live',
      },
    },
    capabilities: {
      oauth: {
        title: 'OAuth PKCE',
        description: 'Secure access for employees and finance reviewers.',
      },
      paymentRequests: {
        title: 'Payment requests',
        description: 'Submit, follow, and review multi-currency requests.',
      },
      financeReview: {
        title: 'Finance review',
        description: 'Approve or reject pending requests with clear context.',
      },
      expiration: {
        title: 'Automatic expiration',
        description:
          'Pending requests age out automatically when the finance review window closes.',
      },
    },
  },
  auth: {
    loadingWorkspace: 'Loading your workspace...',
    login: {
      title: 'Sign in to CurrencyFlow',
      description:
        'Continue with the secure OAuth PKCE flow to access your payment request workspace.',
      submit: 'Continue with OAuth',
      pending: 'Redirecting...',
      error: 'We could not start the sign in flow. Please try again.',
      back: 'Back to overview',
    },
    register: {
      eyebrow: 'Employee onboarding',
      title: 'Create your CurrencyFlow account.',
      description:
        'Register as an employee to submit payment requests in your local country and preferred currency.',
      formTitle: 'Account details',
      formDescription:
        'Use the same country and currency you expect to use for most payment requests.',
      referenceDataError: 'Countries and currencies could not be loaded. Please try again.',
      error: 'Registration could not be completed. Please try again.',
      pending: 'Creating account...',
      submit: 'Create account',
      alreadyHaveAccount: 'Already have an account?',
      goToLogin: 'Continue to sign in',
      successEyebrow: 'Account created',
      successTitle: 'Your account is ready.',
      successDescription:
        'You can now sign in through the secure OAuth PKCE flow and access your workspace.',
      fields: {
        name: 'Full name',
        email: 'Email',
        password: 'Password',
        passwordConfirmation: 'Confirm password',
        country: 'Country',
        preferredCurrency: 'Preferred currency',
      },
      placeholders: {
        country: 'Select a country',
        preferredCurrency: 'Select a currency',
      },
      validation: {
        required: 'This field is required.',
        email: 'Enter a valid email address.',
        passwordMin: 'Use at least 8 characters.',
        passwordConfirmation: 'The password confirmation does not match.',
      },
      actions: {
        togglePassword: 'Show or hide password',
        togglePasswordConfirmation: 'Show or hide password confirmation',
      },
    },
    callback: {
      processingTitle: 'Finishing sign in',
      processingDescription:
        'We are validating the authorization response and preparing your session.',
      failedTitle: 'Sign in could not be completed',
      failedDescription:
        'The authorization response is invalid or expired. Start the sign in flow again.',
      returnToLogin: 'Return to sign in',
    },
  },
  appShell: {
    brandSubtitle: 'Payment operations',
    signedInAs: 'Signed in as',
    signOut: 'Sign out',
    navigation: {
      label: 'Workspace navigation',
      dashboard: 'Dashboard',
      paymentRequests: 'Payment Requests',
      newPaymentRequest: 'New Payment Request',
      financeReview: 'Finance Review',
    },
    roles: {
      employee: 'Employee',
      finance: 'Finance',
    },
  },
  dashboard: {
    eyebrow: 'Workspace overview',
    title: 'Payment request workspace',
    description:
      'Track your account context and start the workflows used to create, monitor, and review multi-currency payment requests.',
    role: 'Role',
    country: 'Country',
    preferredCurrency: 'Preferred currency',
    reviewWindow: {
      title: 'Finance review window',
      description:
        'Pending payment requests remain reviewable for 48 hours before they expire automatically.',
      metric: 'review window',
    },
  },
  paymentRequests: {
    eyebrow: 'Payment requests',
    title: 'Requests overview',
    description:
      'Review submitted requests, follow their status, and inspect the exchange-rate snapshot used at creation time.',
    actions: {
      new: 'New request',
      view: 'View details',
    },
    filters: {
      status: 'Status',
    },
    status: {
      all: 'All',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      expired: 'Expired',
    },
    events: {
      created: 'Created',
      approved: 'Approved',
      rejected: 'Rejected',
      expired: 'Expired',
    },
    table: {
      title: 'Payment request list',
      description: 'Filter and inspect requests submitted through CurrencyFlow.',
      noDescription: 'No description provided',
      columns: {
        request: 'Request',
        amount: 'Amount',
        status: 'Status',
        expires: 'Expires',
        actions: 'Actions',
      },
    },
    pagination: {
      summary: 'Page {{page}} of {{total}} · {{count}} requests',
      previous: 'Previous',
      next: 'Next',
    },
    loadingTitle: 'Loading payment requests',
    loadingDescription: 'CurrencyFlow is loading the latest request data.',
    errorTitle: 'Payment requests could not be loaded',
    errorDescription: 'Refresh the page or try again in a moment.',
    emptyTitle: 'No requests loaded yet',
    emptyDescription:
      'Submitted requests will appear here with their current status, original currency, and exchange-rate context.',
    form: {
      fields: {
        title: 'Title',
        description: 'Description',
        amount: 'Amount',
        currency: 'Currency',
      },
      placeholders: {
        currency: 'Select a currency',
      },
      validation: {
        required: 'This field is required.',
        amount: 'Enter a valid amount with up to 2 decimal places.',
      },
      errors: {
        currencies: 'Currencies could not be loaded. Please try again.',
        generic: 'Payment request could not be created. Please try again.',
        exchangeProviderUnavailable:
          'Exchange rates are temporarily unavailable. Please try again shortly.',
      },
      actions: {
        cancel: 'Cancel',
        create: 'Create request',
        creating: 'Creating request...',
      },
    },
    detail: {
      eyebrow: 'Payment request detail',
      back: 'Back to requests',
      loadingTitle: 'Loading payment request',
      loadingDescription: 'CurrencyFlow is loading this request snapshot.',
      errorTitle: 'Payment request could not be loaded',
      errorDescription: 'The request may not exist or may no longer be accessible.',
      notFoundTitle: 'Payment request not found',
      notFoundDescription: 'Open the request again from the payment request list.',
      originalAmount: 'Original amount',
      convertedAmount: 'Converted amount',
      expiresAt: 'Expires at',
      exchangeSnapshot: 'Exchange-rate snapshot',
      review: 'Review',
      exchangeFields: {
        baseCurrency: 'Base currency',
        localCurrency: 'Local currency',
        rate: 'EUR exchange rate',
        source: 'Source',
        fetchedAt: 'Fetched at',
      },
      reviewFields: {
        reviewedBy: 'Reviewed by',
        reviewedAt: 'Reviewed at',
        note: 'Review note',
        events: 'Events',
      },
    },
  },
  newPaymentRequest: {
    eyebrow: 'New request',
    title: 'Create a payment request',
    description:
      'Prepare a payment request in the original currency while CurrencyFlow records the exchange-rate snapshot.',
    placeholderTitle: 'Prepare request details',
    placeholderDescription:
      'Payment requests are created from a title, description, original amount, and currency selection.',
  },
  financeReview: {
    eyebrow: 'Finance review',
    title: 'Review pending requests',
    description:
      'Finance users can approve or reject pending, unexpired payment requests from this workspace.',
    emptyTitle: 'No pending review queue loaded yet',
    emptyDescription:
      'Pending requests ready for finance review will appear here with the context needed for approval decisions.',
  },
}
