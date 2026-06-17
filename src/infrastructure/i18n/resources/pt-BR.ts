export const ptBR = {
  common: {
    noResults: 'Nenhum resultado encontrado',
  },
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
  appShell: {
    brandSubtitle: 'Operacoes de pagamento',
    signedInAs: 'Logado como',
    signOut: 'Sair',
    navigation: {
      label: 'Navegacao do workspace',
      dashboard: 'Dashboard',
      paymentRequests: 'Solicitacoes',
      newPaymentRequest: 'Nova solicitacao',
      financeReview: 'Revisao financeira',
    },
    roles: {
      employee: 'Colaborador',
      finance: 'Financeiro',
    },
  },
  dashboard: {
    eyebrow: 'Visao geral',
    title: 'Workspace de solicitacoes de pagamento',
    description:
      'Acompanhe o contexto da sua conta e inicie os fluxos para criar, monitorar e revisar solicitacoes de pagamento multi-moeda.',
    role: 'Funcao',
    country: 'Pais',
    preferredCurrency: 'Moeda preferida',
    reviewWindow: {
      title: 'Janela de revisao financeira',
      description:
        'Solicitacoes pendentes ficam disponiveis para revisao por 48 horas antes de expirarem automaticamente.',
      metric: 'janela de revisao',
    },
  },
  paymentRequests: {
    eyebrow: 'Solicitacoes de pagamento',
    title: 'Visao geral das solicitacoes',
    description:
      'Revise solicitacoes enviadas, acompanhe seus status e inspecione a cotacao registrada no momento da criacao.',
    actions: {
      new: 'Nova solicitacao',
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
      title: 'Lista de solicitacoes',
      description: 'Filtre e inspecione solicitacoes enviadas pelo CurrencyFlow.',
      noDescription: 'Nenhuma descricao informada',
      columns: {
        request: 'Solicitacao',
        amount: 'Valor',
        status: 'Status',
        expires: 'Expira',
        actions: 'Acoes',
      },
    },
    pagination: {
      summary: 'Pagina {{page}} de {{total}} · {{count}} solicitacoes',
      previous: 'Anterior',
      next: 'Proxima',
    },
    loadingTitle: 'Carregando solicitacoes',
    loadingDescription: 'O CurrencyFlow esta carregando os dados mais recentes.',
    errorTitle: 'Nao foi possivel carregar as solicitacoes',
    errorDescription: 'Atualize a pagina ou tente novamente em instantes.',
    emptyTitle: 'Nenhuma solicitacao carregada ainda',
    emptyDescription:
      'Solicitacoes enviadas aparecerao aqui com status atual, moeda original e contexto da cotacao.',
    form: {
      fields: {
        title: 'Titulo',
        description: 'Descricao',
        amount: 'Valor',
        currency: 'Moeda',
      },
      placeholders: {
        currency: 'Selecione uma moeda',
      },
      validation: {
        required: 'Este campo e obrigatorio.',
        amount: 'Informe um valor valido com ate 2 casas decimais.',
      },
      errors: {
        currencies: 'Nao foi possivel carregar moedas. Tente novamente.',
        generic: 'Nao foi possivel criar a solicitacao. Tente novamente.',
        exchangeProviderUnavailable:
          'As cotacoes estao temporariamente indisponiveis. Tente novamente em instantes.',
      },
      actions: {
        cancel: 'Cancelar',
        create: 'Criar solicitacao',
        creating: 'Criando solicitacao...',
      },
    },
    detail: {
      eyebrow: 'Detalhe da solicitacao',
      back: 'Voltar para solicitacoes',
      loadingTitle: 'Carregando solicitacao',
      loadingDescription: 'O CurrencyFlow esta carregando o snapshot desta solicitacao.',
      errorTitle: 'Nao foi possivel carregar a solicitacao',
      errorDescription: 'A solicitacao pode nao existir ou nao estar mais acessivel.',
      notFoundTitle: 'Solicitacao nao encontrada',
      notFoundDescription: 'Abra a solicitacao novamente pela lista.',
      originalAmount: 'Valor original',
      convertedAmount: 'Valor convertido',
      expiresAt: 'Expira em',
      exchangeSnapshot: 'Snapshot da cotacao',
      review: 'Revisao',
      exchangeFields: {
        baseCurrency: 'Moeda base',
        localCurrency: 'Moeda local',
        rate: 'Cotacao para EUR',
        source: 'Fonte',
        fetchedAt: 'Buscada em',
      },
      reviewFields: {
        reviewedBy: 'Revisada por',
        reviewedAt: 'Revisada em',
        note: 'Nota de revisao',
        events: 'Eventos',
      },
    },
  },
  newPaymentRequest: {
    eyebrow: 'Nova solicitacao',
    title: 'Criar solicitacao de pagamento',
    description:
      'Prepare uma solicitacao na moeda original enquanto o CurrencyFlow registra a cotacao do momento.',
    placeholderTitle: 'Prepare os detalhes da solicitacao',
    placeholderDescription:
      'Solicitacoes de pagamento sao criadas com titulo, descricao, valor original e selecao de moeda.',
  },
  financeReview: {
    eyebrow: 'Revisao financeira',
    title: 'Revisar solicitacoes pendentes',
    description:
      'Usuarios financeiros podem aprovar ou rejeitar solicitacoes pendentes e nao expiradas neste workspace.',
    loadingTitle: 'Carregando fila de revisao',
    loadingDescription:
      'CurrencyFlow esta carregando solicitacoes pendentes para revisao financeira.',
    errorTitle: 'Nao foi possivel carregar a fila de revisao',
    errorDescription: 'Atualize a pagina ou tente novamente em instantes.',
    emptyTitle: 'Nenhuma fila de revisao carregada ainda',
    emptyDescription:
      'Solicitacoes pendentes prontas para revisao financeira aparecerao aqui com o contexto necessario para decisoes de aprovacao.',
    fields: {
      originalAmount: 'Valor original',
      convertedAmount: 'Valor convertido',
      exchangeRate: 'Cotacao EUR',
      expiresAt: 'Expira em',
      reviewNote: 'Nota de revisao',
    },
    placeholders: {
      reviewNote: 'Adicione uma nota opcional para o historico de auditoria',
    },
    actions: {
      approve: 'Aprovar',
      approving: 'Aprovando...',
      approved: 'Solicitacao de pagamento aprovada.',
      reject: 'Rejeitar',
      rejecting: 'Rejeitando...',
      rejected: 'Solicitacao de pagamento rejeitada.',
    },
    errors: {
      conflict: 'Esta solicitacao nao esta mais pendente ou revisavel.',
      forbidden: 'Voce nao tem permissao para revisar esta solicitacao.',
      generic: 'Nao foi possivel concluir a acao de revisao. Tente novamente.',
    },
  },
}
