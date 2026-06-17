export const en = {
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
  dashboard: {
    subtitle: 'Payment request workspace',
    signOut: 'Sign out',
    signedInAs: 'Signed in as',
    role: 'Role',
    country: 'Country',
    preferredCurrency: 'Preferred currency',
  },
}
