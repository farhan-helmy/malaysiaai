import { ChatCompletionResponse } from './reponse';
export class MalaysiaAi {
  private token: string;
  private model: 'mallam-small' | 'mallam-tiny';

  /**
   * Constructs a new instance of the MalaysiaAi class.
   *
   * @param {string} token - The token used for authentication with the Malaysia AI Nous API.
   * @param {'mallam-small' | 'mallam-tiny'} model - The model to use for chat completions available is `mallam-small` and `mallam-tiny`. Defaults to 'mallam-small' if not provided.
   */
  constructor({
    token,
    model,
  }: {
    token: string;
    model: 'mallam-small' | 'mallam-tiny';
  }) {
    this.token = token;
    this.model = model ?? 'mallam-small';
  }

  /**
   * This function sends a POST request to the chat completions API endpoint for Mallam.
   * It uses the provided parameters to generate chat completions.
   *
   * @param {Object} params - The parameters for the chat completions.
   * @param {string} params.prompt - The initial string to generate a completion for.
   * @param {number} params.maxTokens - The maximum length of the generated completion.
   * @param {number} params.temperature - Controls randomness in Boltzmann distribution. Lower temperature results in less random completions.
   * @param {number} params.top_p - The cumulative probability of parameter tokens to keep when generating a completion.
   * @param {number} params.top_k - The number of highest probability tokens to keep when generating a completion.
   * @param {boolean} params.stream - If true, the completions will be streamed back as they become available.
   *
   * @returns {Promise<ChatCompletionResponse>} The JSON response from the API.
   * @throws {Error} If the request fails, an error is thrown.
   */

  async chatCompletions({
    prompt,
    maxTokens,
    temperature,
    top_p,
    top_k,
    stream,
  }: {
    prompt: string;
    maxTokens?: number;
    temperature?: number;
    top_p?: number;
    top_k?: number;
    stream?: boolean;
  }): Promise<ChatCompletionResponse> {
    const response: Response = await fetch(
      'https://llm-router.nous.mesolitica.com/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          model: this.model,
          temperature: temperature ?? 0.9,
          top_p: top_p ?? 0.95,
          top_k: top_k ?? 50,
          max_tokens: maxTokens ?? 256,
          stop: ['[/INST]', '[INST]', '<s>'],
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          tools: null,
          stream: stream ?? false,
        }),
      }
    );

    const data: ChatCompletionResponse = await response.json();
    return data;
  }
}
