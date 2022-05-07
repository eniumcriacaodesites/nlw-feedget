import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";
export function CloseButton() {
    return (
        <Popover.Button className="tw-top-5 tw-right-5 tw-absolute tw-text-zinc-400 hover:tw-text-zinc-100" title="Fechar formulário de feedback">
            <X weight="bold" className="tw-w-4 tw-h-4" />
        </Popover.Button>
    );
}