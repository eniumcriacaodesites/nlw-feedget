import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { Lightbulb, Lightning } from "phosphor-react";
import { LightBulbIcon, MoonIcon } from '@heroicons/react/solid'

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de um balão de pensamento'
        }
    },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [mode, setMode] = useState<string | null>(null);

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    const storedMode = localStorage.getItem("mode");

    if (storedMode == null) {
        localStorage.setItem("mode", "tw-light");
    }

    var storage = localStorage;

    const handleClick = () => {
        storage.removeItem("mode");
        if (storedMode == "tw-light" || storedMode === null) {
            storage.setItem("mode", "tw-dark");
            setMode("tw-dark");
            document.getElementsByTagName("HTML")[0].setAttribute("class", 'tw-dark');
        } else {
            storage.setItem("mode", "tw-light");
            setMode("tw-light");
            document.getElementsByTagName("HTML")[0].setAttribute("class", 'tw-light');
        }

    };

    return (
        <div className="tw-bg-zinc-900 dark:tw-bg-white dark:tw-text-zinc-500 tw-p-4 tw-relative tw-rounded-2xl tw-mb-4 tw-flex tw-flex-col tw-items-center tw-shadow-lg tw-w-[calc(100vw-2rem)] md:tw-w-auto">
            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )
                    }
                </>
            )
            }
            <footer className="tw-w-full tw-flex tw-flex-row tw-text-xs tw-text-neutral-400 tw-justify-between">
                <button type="button" className="tw-flex tw-items-center hover:tw-text-brand-300" title="Botão para alternar o padrão de cores entre claro e escuro" onClick={() => handleClick()}>
                    {
                        mode == 'tw-light' ?
                            (<MoonIcon className="tw-h-4 tw-w-4 tw-inline-flex tw-mr-1" />)
                            :
                            (<LightBulbIcon className="tw-h-4 tw-w-4 tw-inline-flex tw-mr-1" />)
                    }

                    <span>{mode == 'tw-light' ? 'Escuro' : 'Claro'}</span>
                </button>
                <div>Feito com ♥ pela <a className="tw-underline tw-underline-offset-2 hover:tw-text-brand-300" href="https://enium.com.br" target={"_blank"}>Enium</a></div>
            </footer>
        </div >
    );
}