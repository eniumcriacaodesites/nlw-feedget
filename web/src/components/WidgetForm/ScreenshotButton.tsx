import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({
    screenshot,
    onScreenshotTook }:
    ScreenshotButtonProps) {

    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true);
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64Image = canvas.toDataURL('image/png');
        onScreenshotTook(base64Image);
        setIsTakingScreenshot(false);
    }

    if (screenshot) {
        return (
            <button
                type="button"
                className="tw-p-1 tw-w-10 tw-h-10 tw-rounded-md tw-border-transparent tw-flex tw-justify-end tw-items-end tw-text-zinc-400 hover:text-zinc-100 tw-transition-colors dark:tw-bg-brand-300"
                onClick={() => onScreenshotTook(null)}
                style={{
                    backgroundImage: `url(${screenshot})`,
                }}>
                <Trash weight="fill" />
            </button>
        )
    }
    return (
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="tw-p-2 tw-bg-zinc-800 tw-rounded-md tw-border-transparent hover:tw-bg-zinc-700 tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-offset-zinc-900 focus:tw-ring-brand-500 dark:tw-bg-zinc-500 dark:tw-text-gray-50"
        >
            {isTakingScreenshot ? <Loading /> : <Camera className="tw-w-6 tw-h-6" />}
        </button>
    )
}