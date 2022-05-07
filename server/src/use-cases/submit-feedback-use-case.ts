import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { MailService } from "../services/mail-service";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}
export class SubmitFeedbackUseCase {
    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailService: MailService
    ) { }
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required.');
        }

        if (!comment) {
            throw new Error('Type is required.');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.');
        }

        //Salvar no banco de dados
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        })
        //Enviar Email
        await this.mailService.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family: sans-serif; font-size:16px; color: #111;">`,
                `<p>Tipo: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img style="width:500px" src="${screenshot}" />` : ``,
                `</div>`,
            ].join('\n')
        });
    }
}