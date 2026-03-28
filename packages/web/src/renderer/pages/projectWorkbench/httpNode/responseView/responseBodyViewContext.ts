import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type ResponseBodyViewMode = 'text' | 'json'
export type ResponseBodyViewContext = {
  responseBodyViewMode: Ref<ResponseBodyViewMode>;
  activeResponseBodyViewMode: ComputedRef<ResponseBodyViewMode>;
  canSwitchResponseBodyViewMode: ComputedRef<boolean>;
  switchResponseBodyViewMode: (mode: ResponseBodyViewMode) => void;
}

export const responseBodyViewContextKey: InjectionKey<ResponseBodyViewContext> = Symbol('responseBodyViewContext')
