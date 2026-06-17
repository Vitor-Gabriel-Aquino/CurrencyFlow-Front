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
  dashboard: {
    subtitle: 'Payment request workspace',
    signOut: 'Sign out',
    signedInAs: 'Signed in as',
    role: 'Role',
    country: 'Country',
    preferredCurrency: 'Preferred currency',
  },
}
