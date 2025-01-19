export class LangflowClient {
  constructor(
    private baseURL: string,
    private applicationToken: string
  ) {}

  private async post(endpoint: string, body: any, headers: Record<string, string> = {}) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
        mode: 'cors'
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
      }
      return responseMessage;
    } catch (error) {
      console.error('Request Error:', error);
      throw error;
    }
  }

  private async initiateSession(
    flowId: string,
    langflowId: string,
    inputValue: any,
    inputType = 'chat',
    outputType = 'chat',
    stream = false,
    tweaks = {}
  ) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    const formattedInput = {
      name: inputValue.name,
      birth_date: inputValue.dateOfBirth,
      birth_time: inputValue.timeOfBirth,
      birth_place: `${inputValue.city}, ${inputValue.state}`,
      gender: inputValue.gender
    };

    return this.post(endpoint, {
      input_value: formattedInput,
      input_type: inputType,
      output_type: outputType,
      tweaks: tweaks
    });
  }

  async getBirthChart(userInput: {
    name: string;
    dateOfBirth: string;
    timeOfBirth: string;
    gender: string;
    state: string;
    city: string;
  }) {
    const flowIdOrName = '55e5a266-e0d9-4647-8dd6-37cf8c221dff';
    const langflowId = 'adbd4c75-524d-49a8-ac25-d3348278d702';
    const tweaks = {
      "ChatInput-Rnj65": {},
      "AstraDB-0DQaO": {},
      "ParseData-UP2jw": {},
      "Agent-SNXMR": {},
      "GoogleGenerativeAIModel-piIoL": {},
      "ChatOutput-IcE00": {},
      "File-t1FY0": {},
      "File-L6j4R": {},
      "SplitText-yF4Jt": {},
      "AstraDB-vqgc8": {},
      "Google Generative AI Embeddings-Xd4fY": {},
      "CalculatorTool-ITOMj": {},
      "Google Generative AI Embeddings-cJa2F": {}
    };

    try {
      const response = await this.initiateSession(
        flowIdOrName,
        langflowId,
        userInput,
        'chat',
        'chat',
        false,
        tweaks
      );

      if (response?.outputs?.[0]?.outputs?.[0]?.outputs?.message) {
        return response.outputs[0].outputs[0].outputs.message;
      }
      throw new Error('Invalid response format from birth chart API');
    } catch (error) {
      console.error('Error getting birth chart:', error);
      throw error;
    }
  }

  async getSpiritualGuidance(userInput: {
    name: string;
    dateOfBirth: string;
    timeOfBirth: string;
    gender: string;
    state: string;
    city: string;
  }) {
    const flowIdOrName = '17851a95-a01c-43fb-8935-ce836c47f99e';
    const langflowId = 'adbd4c75-524d-49a8-ac25-d3348278d702';
    const tweaks = {
      "ChatInput-rsUYw": {},
      "AstraDB-8363d": {},
      "ParseData-U0xSC": {},
      "Agent-63KDl": {},
      "GoogleGenerativeAIModel-7EaKe": {},
      "ChatOutput-g6nK0": {},
      "File-FjaR3": {},
      "File-LQnmj": {},
      "SplitText-fJYrS": {},
      "AstraDB-sbjXE": {},
      "Google Generative AI Embeddings-HIA1n": {},
      "CalculatorTool-30X0t": {},
      "Google Generative AI Embeddings-STPh6": {}
    };

    try {
      const response = await this.initiateSession(
        flowIdOrName,
        langflowId,
        userInput,
        'chat',
        'chat',
        false,
        tweaks
      );

      if (response?.outputs?.[0]?.outputs?.[0]?.outputs?.message) {
        return response.outputs[0].outputs[0].outputs.message;
      }
      throw new Error('Invalid response format from spiritual guidance API');
    } catch (error) {
      console.error('Error getting spiritual guidance:', error);
      throw error;
    }
  }
}

const langflowClient = new LangflowClient(
  'https://api.langflow.astra.datastax.com',
  'AstraCS:RXquSggESaYJzUlWFtYnacfG:467f0921ff7dedf4b0591d59daecf2424ad89f6568ace88b1e8c5153dfec9087'
);

export default langflowClient;