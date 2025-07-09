import { LITELLM_MODEL } from '../const/chat.const';

export type LiteLLMModel = (typeof LITELLM_MODEL)[keyof typeof LITELLM_MODEL];

export enum LiteLLMMode {
  DEFAULT = 'default',
  NOPROMPT = 'no_prompt',
}
