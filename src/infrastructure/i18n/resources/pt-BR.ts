export const ptBR = {
  common: {
    language: 'Idioma',
    languages: {
      en: 'Inglês',
      ptBR: 'Português',
    },
    noResults: 'Nenhum resultado encontrado',
  },
  home: {
    brandSubtitle: 'Pagamentos multimoeda',
    signIn: 'Entrar',
    createAccount: 'Criar conta',
    eyebrow: 'Gestão de solicitações de pagamento',
    title: 'Gerencie pagamentos da empresa em várias moedas com confiança.',
    description:
      'Colaboradores podem enviar solicitações de pagamento em moedas locais enquanto o time financeiro revisa cada pedido com cotações imutáveis e histórico claro de aprovação.',
    metrics: {
      currencies: {
        label: 'Moedas',
        value: '160+',
      },
      reviewWindow: {
        label: 'Janela de revisão',
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
        title: 'Solicitações de pagamento',
        description: 'Envie, acompanhe e revise solicitações multimoeda.',
      },
      financeReview: {
        title: 'Revisão financeira',
        description: 'Aprove ou rejeite solicitações pendentes com contexto claro.',
      },
      expiration: {
        title: 'Expiração automática',
        description:
          'Solicitações pendentes expiram automaticamente quando a janela de revisão financeira termina.',
      },
    },
  },
  auth: {
    loadingWorkspace: 'Carregando seu workspace...',
    login: {
      title: 'Entre no CurrencyFlow',
      description:
        'Continue com o fluxo OAuth PKCE seguro para acessar seu workspace de solicitações de pagamento.',
      submit: 'Continuar com OAuth',
      pending: 'Redirecionando...',
      error: 'Não foi possível iniciar o login. Tente novamente.',
      back: 'Voltar para a visão geral',
    },
    register: {
      eyebrow: 'Cadastro de colaborador',
      title: 'Crie sua conta CurrencyFlow.',
      description:
        'Cadastre-se como colaborador para enviar solicitações de pagamento usando seu país e moeda preferida.',
      formTitle: 'Dados da conta',
      formDescription:
        'Use o país e a moeda que você espera usar na maioria das solicitações de pagamento.',
      referenceDataError: 'Não foi possível carregar países e moedas. Tente novamente.',
      error: 'Não foi possível concluir o cadastro. Tente novamente.',
      pending: 'Criando conta...',
      submit: 'Criar conta',
      alreadyHaveAccount: 'Já tem uma conta?',
      goToLogin: 'Continuar para login',
      successEyebrow: 'Conta criada',
      successTitle: 'Sua conta está pronta.',
      successDescription:
        'Agora você pode entrar pelo fluxo OAuth PKCE seguro e acessar seu workspace.',
      fields: {
        name: 'Nome completo',
        email: 'Email',
        password: 'Senha',
        passwordConfirmation: 'Confirmar senha',
        country: 'País',
        preferredCurrency: 'Moeda preferida',
      },
      placeholders: {
        country: 'Selecione um país',
        preferredCurrency: 'Selecione uma moeda',
      },
      validation: {
        required: 'Este campo é obrigatório.',
        email: 'Informe um email válido.',
        passwordMin: 'Use pelo menos 8 caracteres.',
        passwordConfirmation: 'A confirmação da senha não confere.',
      },
      actions: {
        togglePassword: 'Mostrar ou ocultar senha',
        togglePasswordConfirmation: 'Mostrar ou ocultar confirmação da senha',
      },
    },
    callback: {
      processingTitle: 'Finalizando login',
      processingDescription: 'Estamos validando a autorização e preparando sua sessão.',
      failedTitle: 'Não foi possível concluir o login',
      failedDescription:
        'A resposta de autorização é inválida ou expirou. Inicie o login novamente.',
      returnToLogin: 'Voltar para login',
    },
  },
  appShell: {
    brandSubtitle: 'Operações de pagamento',
    signedInAs: 'Logado como',
    signOut: 'Sair',
    navigation: {
      label: 'Navegação do workspace',
      dashboard: 'Dashboard',
      paymentRequests: 'Solicitações',
      newPaymentRequest: 'Nova solicitação',
      financeReview: 'Revisão financeira',
    },
    roles: {
      employee: 'Colaborador',
      finance: 'Financeiro',
    },
  },
  dashboard: {
    eyebrow: 'Visão geral',
    title: 'Workspace de solicitações de pagamento',
    description:
      'Acompanhe o contexto da sua conta e inicie os fluxos para criar, monitorar e revisar solicitações de pagamento multimoeda.',
    role: 'Função',
    country: 'País',
    preferredCurrency: 'Moeda preferida',
    reviewWindow: {
      title: 'Janela de revisão financeira',
      description:
        'Solicitações pendentes ficam disponíveis para revisão por 48 horas antes de expirarem automaticamente.',
      metric: 'janela de revisão',
    },
  },
  paymentRequests: {
    eyebrow: 'Solicitações de pagamento',
    title: 'Visão geral das solicitações',
    description:
      'Revise solicitações enviadas, acompanhe seus status e inspecione a cotação registrada no momento da criação.',
    actions: {
      new: 'Nova solicitação',
      view: 'Ver detalhes',
    },
    filters: {
      status: 'Status',
    },
    status: {
      all: 'Todos',
      pending: 'Pendente',
      approved: 'Aprovada',
      rejected: 'Rejeitada',
      expired: 'Expirada',
    },
    events: {
      created: 'Criada',
      approved: 'Aprovada',
      rejected: 'Rejeitada',
      expired: 'Expirada',
    },
    table: {
      title: 'Lista de solicitações',
      description: 'Filtre e inspecione solicitações enviadas pelo CurrencyFlow.',
      noDescription: 'Nenhuma descrição informada',
      columns: {
        request: 'Solicitação',
        amount: 'Valor',
        status: 'Status',
        expires: 'Expira',
        actions: 'Ações',
      },
    },
    pagination: {
      summary: 'Página {{page}} de {{total}} · {{count}} solicitações',
      previous: 'Anterior',
      next: 'Próxima',
    },
    loadingTitle: 'Carregando solicitações',
    loadingDescription: 'O CurrencyFlow está carregando os dados mais recentes.',
    errorTitle: 'Não foi possível carregar as solicitações',
    errorDescription: 'Atualize a página ou tente novamente em instantes.',
    emptyTitle: 'Nenhuma solicitação carregada ainda',
    emptyDescription:
      'Solicitações enviadas aparecerão aqui com status atual, moeda original e contexto da cotação.',
    form: {
      fields: {
        title: 'Título',
        description: 'Descrição',
        amount: 'Valor',
        currency: 'Moeda',
      },
      placeholders: {
        currency: 'Selecione uma moeda',
      },
      validation: {
        required: 'Este campo é obrigatório.',
        amount: 'Informe um valor válido com até 2 casas decimais.',
      },
      errors: {
        currencies: 'Não foi possível carregar moedas. Tente novamente.',
        generic: 'Não foi possível criar a solicitação. Tente novamente.',
        exchangeProviderUnavailable:
          'As cotações estão temporariamente indisponíveis. Tente novamente em instantes.',
      },
      actions: {
        cancel: 'Cancelar',
        create: 'Criar solicitação',
        creating: 'Criando solicitação...',
      },
      exchangePreview: {
        title: 'Prévia da cotação atual do EUR',
        loading: 'Carregando a cotação atual...',
        error: 'Não foi possível carregar a cotação atual.',
        rate: 'Cotação prévia',
        source: 'Fonte',
        fetchedAt: 'Buscada em',
        disclaimer:
          'Esta é uma prévia ao vivo. O snapshot de auditoria é capturado novamente quando a solicitação é criada.',
      },
    },
    detail: {
      eyebrow: 'Detalhe da solicitação',
      back: 'Voltar para solicitações',
      loadingTitle: 'Carregando solicitação',
      loadingDescription: 'O CurrencyFlow está carregando o snapshot desta solicitação.',
      errorTitle: 'Não foi possível carregar a solicitação',
      errorDescription: 'A solicitação pode não existir ou não estar mais acessível.',
      notFoundTitle: 'Solicitação não encontrada',
      notFoundDescription: 'Abra a solicitação novamente pela lista.',
      originalAmount: 'Valor original',
      convertedAmount: 'Valor convertido',
      expiresAt: 'Expira em',
      exchangeSnapshot: 'Snapshot da cotação',
      review: 'Revisão',
      exchangeFields: {
        baseCurrency: 'Moeda base',
        localCurrency: 'Moeda local',
        rate: 'Cotação para EUR',
        source: 'Fonte',
        fetchedAt: 'Buscada em',
      },
      reviewFields: {
        reviewedBy: 'Revisada por',
        reviewedAt: 'Revisada em',
        note: 'Nota de revisão',
        events: 'Eventos',
      },
    },
  },
  newPaymentRequest: {
    eyebrow: 'Nova solicitação',
    title: 'Criar solicitação de pagamento',
    description:
      'Prepare uma solicitação na moeda original enquanto o CurrencyFlow registra a cotação do momento.',
    placeholderTitle: 'Prepare os detalhes da solicitação',
    placeholderDescription:
      'Solicitações de pagamento são criadas com título, descrição, valor original e seleção de moeda.',
  },
  financeReview: {
    eyebrow: 'Revisão financeira',
    title: 'Revisar solicitações pendentes',
    description:
      'Usuários financeiros podem aprovar ou rejeitar solicitações pendentes e não expiradas neste workspace.',
    loadingTitle: 'Carregando fila de revisão',
    loadingDescription:
      'CurrencyFlow está carregando solicitações pendentes para revisão financeira.',
    errorTitle: 'Não foi possível carregar a fila de revisão',
    errorDescription: 'Atualize a página ou tente novamente em instantes.',
    emptyTitle: 'Nenhuma fila de revisão carregada ainda',
    emptyDescription:
      'Solicitações pendentes prontas para revisão financeira aparecerão aqui com o contexto necessário para decisões de aprovação.',
    fields: {
      originalAmount: 'Valor original',
      convertedAmount: 'Valor convertido',
      exchangeRate: 'Cotação EUR',
      expiresAt: 'Expira em',
      reviewNote: 'Nota de revisão',
    },
    placeholders: {
      reviewNote: 'Adicione uma nota opcional para o histórico de auditoria',
    },
    actions: {
      approve: 'Aprovar',
      approving: 'Aprovando...',
      approved: 'Solicitação de pagamento aprovada.',
      reject: 'Rejeitar',
      rejecting: 'Rejeitando...',
      rejected: 'Solicitação de pagamento rejeitada.',
    },
    errors: {
      conflict: 'Esta solicitação não está mais pendente ou revisável.',
      forbidden: 'Você não tem permissão para revisar esta solicitação.',
      generic: 'Não foi possível concluir a ação de revisão. Tente novamente.',
    },
  },
}
