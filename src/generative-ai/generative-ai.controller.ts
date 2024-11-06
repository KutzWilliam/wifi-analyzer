import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { GenerativeAiService } from './generative-ai.service';
import { CreatePromptDto } from './dto/prompt.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('generative-ai')
@UseGuards(JwtAuthGuard) 
export class GenerativeAiController {
    constructor(
        private readonly generativeAiService: GenerativeAiService
    ) { }
    @Post('generate')
    async generate(@Body() createPromptDto: CreatePromptDto, @Request() req) {
        const userId = req.user.userId;
        let response =  await this.generativeAiService.generateResponse(createPromptDto, userId);
        response = response.replace(/(\n|\*)/g, '');
        console.log(response);
        return { response };
    }
}