import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepPropos {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({
    feedbackType,
    onFeedbackRestartRequested,
    onFeedbackSent }:
    FeedbackContentStepPropos) {

    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        setIsSendingFeedback(true);

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })


        onFeedbackSent();
    }


    return (
        <>
            <header>
                <button
                    type="button"
                    className="tw-top-5 tw-left-5 tw-absolute tw-text-zinc-400 hover:tw-text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="tw-w-4 tw-h-4" />
                </button>
                <span className="tw-text-xl tw-leading-6 tw-flex tw-items-center tw-gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="tw-w-6 tw-h-6" />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>


            <form onSubmit={handleSubmitFeedback} className="tw-my-4 tw-w-full">
                <textarea
                    className="tw-min-w-[304px] tw-w-full tw-min-h-[112px] tw-text-sm tw-placeholder-zinc-400 tw-text-zinc-100 tw-border-zinc-600 tw-bg-transparent tw-rounded-md focus:tw-border-brand-500 focus:tw-ring-brand-500 focus:tw-ring-1 focus:tw-resize-none  tw-scrollbar-thumb-zinc-700 tw-scrollbar-track-transparent tw-scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)} />
                <footer className="tw-flex tw-gap-2 tw-mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot} />
                    <button
                        type="submit"
                        disabled={comment.length === 0 || isSendingFeedback}
                        className="tw-p-2 tw-bg-brand-500 tw-rounded-md tw-border-transparent tw-flex-1 tw-flex tw-justify-center tw-items-center tw-text-sm hover:tw-bg-brand-300 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-offset-zinc-900 focus:tw-ring-brand-500 tw-transition-colors
                        disabled:opacity-50 disabled:hover:tw-bg-brand-500"
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
                    </button>
                </footer>
            </form>
        </>
    )
}