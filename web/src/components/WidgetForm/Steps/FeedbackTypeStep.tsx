import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
    onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeStepProps) {

    return (
        <>
            <header>
                <span className="tw-text-xl tw-leading-6">
                    Deixe seu feedback
                </span>
                <CloseButton />
            </header>

            <div className="tw-flex tw-py-8 tw-gap-2 tw-w-full">
                {Object.entries(feedbackTypes).map(([key, value]) => {
                    return (
                        <button
                            key={key}
                            className="dark:tw-bg-zinc-100 tw-bg-zinc-800 tw-rounded-lg tw-py-5 tw-w-24 tw-flex-1 tw-flex tw-flex-col tw-items-center tw-gap-2 tw-border-2 tw-border-transparent hover:tw-border-brand-500 focus:tw-border-brand-500 focus:tw-outline-none hover:tw-max-w-xs tw-transition-all tw-duration-400 tw-ease-linear"
                            onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
                            type="button"
                        >
                            <img src={import.meta.env.VITE_URL_PROJECT + value.image.source} alt={value.image.alt} />
                            <span>{value.title}</span>
                        </button>
                    )
                })}
            </div>
        </>
    )
}