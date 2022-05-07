import { CircleNotch } from "phosphor-react";

export function Loading() {
    return (
        <div className="tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center tw-overflow-hidden" >
            <CircleNotch weight="bold" className="tw-w-4 tw-h-4 tw-animate-spin" />
        </div>
    )
}