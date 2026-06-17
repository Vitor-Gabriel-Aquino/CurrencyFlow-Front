export const ptBR = {
  home: {
    brandSubtitle: 'Pagamentos multi-moeda',
    signIn: 'Entrar',
    createAccount: 'Criar conta',
    eyebrow: 'Gestao de solicitacoes de pagamento',
    title: 'Gerencie pagamentos da empresa em varias moedas com confianca.',
    description:
      'Colaboradores podem enviar solicitacoes de pagamento em moedas locais enquanto o time financeiro revisa cada pedido com cotacoes imutaveis e historico claro de aprovacao.',
    metrics: {
      currencies: {
        label: 'Moedas',
        value: '160+',
      },
      reviewWindow: {
        label: 'Janela de revisao',
        value: '48h',
      },
      rateSource: {
        label: 'Fonte da taxa',
        value: 'Ao vivo',
      },
    },
    capabilities: {
      oauth: {
        title: 'OAuth PKCE',
        description: 'Acesso seguro para colaboradores e revisores financeiros.',
      },
      paymentRequests: {
        title: 'Solicitacoes de pagamento',
        description: 'Envie, acompanhe e revise solicitacoes multi-moeda.',
      },
      financeReview: {
        title: 'Revisao financeira',
        description: 'Aprove ou rejeite solicitacoes pendentes com contexto claro.',
      },
      expiration: {
        title: 'Expiracao automatica',
        description:
          'Solicitacoes pendentes expiram automaticamente quando a janela de revisao financeira termina.',
      },
    },
  },
  auth: {
    loadingWorkspace: 'Carregando seu workspace...',
    login: {
      title: 'Entre no CurrencyFlow',
      description:
        'Continue com o fluxo OAuth PKCE seguro para acessar seu workspace de solicitacoes de pagamento.',
      submit: 'Continuar com OAuth',
      pending: 'Redirecionando...',
      error: 'Nao foi possivel iniciar o login. Tente novamente.',
      back: 'Voltar para a visao geral',
    },
    register: {
      eyebrow: 'Cadastro de colaborador',
      title: 'Crie sua conta CurrencyFlow.',
      description:
        'Cadastre-se como colaborador para enviar solicitacoes de pagamento usando seu pais e moeda preferida.',
      formTitle: 'Dados da conta',
      formDescription:
        'Use o pais e a moeda que voce espera usar na maioria das solicitacoes de pagamento.',
      referenceDataError: 'Nao foi possivel carregar paises e moedas. Tente novamente.',
      error: 'Nao foi possivel concluir o cadastro. Tente novamente.',
      pending: 'Criando conta...',
      submit: 'Criar conta',
      alreadyHaveAccount: 'Ja tem uma conta?',
      goToLogin: 'Continuar para login',
      successEyebrow: 'Conta criada',
      successTitle: 'Sua conta esta pronta.',
      successDescription:
        'Agora voce pode entrar pelo fluxo OAuth PKCE seguro e acessar seu workspace.',
      fields: {
        name: 'Nome completo',
        email: 'Email',
        password: 'Senha',
        passwordConfirmation: 'Confirmar senha',
        country: 'Pais',
        preferredCurrency: 'Moeda preferida',
      },
      placeholders: {
        country: 'Selecione um pais',
        preferredCurrency: 'Selecione uma moeda',
      },
      validation: {
        required: 'Este campo e obrigatorio.',
        email: 'Informe um email valido.',
        passwordMin: 'Use pelo menos 8 caracteres.',
        passwordConfirmation: 'A confirmacao da senha nao confere.',
      },
      actions: {
        togglePassword: 'Mostrar ou ocultar senha',
        togglePasswordConfirmation: 'Mostrar ou ocultar confirmacao da senha',
      },
    },
    callback: {
      processingTitle: 'Finalizando login',
      processingDescription: 'Estamos validando a autorizacao e preparando sua sessao.',
      failedTitle: 'Nao foi possivel concluir o login',
      failedDescription:
        'A resposta de autorizacao e invalida ou expirou. Inicie o login novamente.',
      returnToLogin: 'Voltar para login',
    },
  },
  dashboard: {
    subtitle: 'Workspace de solicitacoes de pagamento',
    signOut: 'Sair',
    signedInAs: 'Logado como',
    role: 'Funcao',
    country: 'Pais',
    preferredCurrency: 'Moeda preferida',
  },
}
