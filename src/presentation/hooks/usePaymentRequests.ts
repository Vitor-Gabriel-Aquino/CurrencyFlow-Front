import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  CreatePaymentRequestPayload,
  ListPaymentRequestsParams,
  PaymentRequestStatus,
  ReviewPaymentRequestPayload,
} from '@/domain'
import { currencyFlowApi } from '@/infrastructure'

export const paymentRequestQueryKeys = {
  all: ['paymentRequests'] as const,
  exchangeRatePreview: (currencyCode: string) =>
    [...paymentRequestQueryKeys.all, 'exchangeRatePreview', currencyCode] as const,
  list: (params: ListPaymentRequestsParams) => [...paymentRequestQueryKeys.all, 'list', params],
  detail: (paymentRequestId: string) =>
    [...paymentRequestQueryKeys.all, 'detail', paymentRequestId] as const,
}

export function usePaymentRequests(params: ListPaymentRequestsParams) {
  return useQuery({
    queryKey: paymentRequestQueryKeys.list(params),
    queryFn: () => currencyFlowApi.listPaymentRequests(params),
  })
}

export function usePaymentRequest(paymentRequestId: string) {
  return useQuery({
    queryKey: paymentRequestQueryKeys.detail(paymentRequestId),
    queryFn: () => currencyFlowApi.getPaymentRequest(paymentRequestId),
  })
}

export function useExchangeRatePreview(currencyCode: string) {
  return useQuery({
    queryKey: paymentRequestQueryKeys.exchangeRatePreview(currencyCode),
    queryFn: () => currencyFlowApi.getExchangeRatePreview(currencyCode),
    enabled: currencyCode.length === 3,
    retry: false,
  })
}

export function useCreatePaymentRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePaymentRequestPayload) =>
      currencyFlowApi.createPaymentRequest(payload),
    onSuccess(paymentRequest) {
      queryClient.setQueryData(paymentRequestQueryKeys.detail(paymentRequest.id), paymentRequest)
      void queryClient.invalidateQueries({ queryKey: paymentRequestQueryKeys.all })
    },
  })
}

export function useApprovePaymentRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      paymentRequestId,
      payload,
    }: {
      paymentRequestId: string
      payload?: ReviewPaymentRequestPayload
    }) => currencyFlowApi.approvePaymentRequest(paymentRequestId, payload),
    onSuccess(paymentRequest) {
      queryClient.setQueryData(paymentRequestQueryKeys.detail(paymentRequest.id), paymentRequest)
      void queryClient.invalidateQueries({ queryKey: paymentRequestQueryKeys.all })
    },
  })
}

export function useRejectPaymentRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      paymentRequestId,
      payload,
    }: {
      paymentRequestId: string
      payload?: ReviewPaymentRequestPayload
    }) => currencyFlowApi.rejectPaymentRequest(paymentRequestId, payload),
    onSuccess(paymentRequest) {
      queryClient.setQueryData(paymentRequestQueryKeys.detail(paymentRequest.id), paymentRequest)
      void queryClient.invalidateQueries({ queryKey: paymentRequestQueryKeys.all })
    },
  })
}

export function isPaymentRequestStatus(value: string | null): value is PaymentRequestStatus {
  return value === 'pending' || value === 'approved' || value === 'rejected' || value === 'expired'
}
