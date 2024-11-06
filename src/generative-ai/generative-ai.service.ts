import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurement } from 'src/measurement/measurement.entity';
import { Repository } from 'typeorm';
import { CreatePromptDto } from './dto/prompt.dto';
import fetch, { Headers } from 'cross-fetch';

global.fetch = fetch;
global.Headers = Headers;

@Injectable()
export class GenerativeAiService {
  constructor(
    @InjectRepository(Measurement)
    private measurementRepository: Repository<Measurement>,
  ) {}

  async generateResponse(
    createPromptDto: CreatePromptDto,
    userId: number,
  ): Promise<string> {
    const userMeasurements = await this.getUserMeasurements(userId);

    const measurementsText = userMeasurements
      .map((measurement) => {
        return `Comodo: ${measurement.room}, Sinal 2.4GHz: ${measurement.signalStrength2_4GHz} dBm, Sinal 5GHz: ${measurement.signalStrength5GHz} dBm, Velocidade 2.4GHz: ${measurement.speed2_4GHz} Mbps, Velocidade 5GHz: ${measurement.speed5GHz} Mbps, Interferência: ${measurement.interference} dBm`;
      })
      .join('\n');

    const fullPrompt = `
    Sou um assistente virtual especializado em ajudar usuários a resolver problemas e melhorar o desempenho da rede Wi-Fi em casa. Tenho acesso às medições de Wi-Fi do usuário, que incluem dados de intensidade do sinal e velocidade nas frequências de 2,4 GHz e 5 GHz (em dBm), além dos níveis de interferência (também em dBm) e o nome do cômodo onde cada medição foi realizada. Recebo perguntas específicas dos usuários sobre seus problemas de internet.

    Com base nos dados fornecidos para cada medição e na pergunta do usuário, analise as condições do Wi-Fi em cada cômodo, usando os seguintes critérios:

    Análise da Intensidade do Sinal: Identifique áreas com baixa intensidade de sinal (abaixo de -70 dBm) e forneça orientações para melhorar a cobertura nesses locais.

    Otimização de Frequência: Recomende se o usuário deve priorizar a frequência de 2,4 GHz ou 5 GHz com base nos dados de intensidade do sinal e nas características de cada frequência.

    Gerenciamento de Interferência: Se o nível de interferência for alto (acima de -50 dBm), sugira formas de reduzir essa interferência, como mudança de canal, reposicionamento do roteador ou minimização de obstáculos entre o roteador e os dispositivos.

    Otimização de Velocidade: Se a velocidade estiver abaixo do esperado em alguns cômodos, ofereça dicas para melhorar, como usar um extensor de Wi-Fi, atualizar equipamentos ou reposicionar o roteador.

    Com essas informações e a pergunta específica do usuário, gere uma resposta que oriente o usuário com passos específicos para melhorar o desempenho da internet em sua casa, considerando detalhes mencionados por ele sobre suas necessidades ou problemas. Foque em fornecer conselhos práticos e detalhados para ajudar o usuário a alcançar uma conexão confiável e rápida em todos os cômodos.
    
    Aqui estão as medições de Wi-Fi do usuário:
    ${measurementsText}
    
    O usuário pediu: ${createPromptDto.prompt}
    Baseado nessas informações, por favor, forneça uma resposta com sugestões para melhorar a rede Wi-Fi e de forma urgente priorize dar respostas curtas e só de maiores se o usuário pedir.
    `;

    const genAI = new GoogleGenerativeAI(
      'AIzaSyBQt8578qcnyWmqxcOwzyWbC6RSAC2Bqxs',
    );
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(fullPrompt);
    const content = result.response.text();

    return content;
  }

  private getUserMeasurements(userId: number) {
    return this.measurementRepository.find({ where: { user: { id: userId } } });
  }
}
