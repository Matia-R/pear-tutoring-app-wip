import { type FunctionComponent, Fragment } from "react"
import { Listbox as HeadlessListBox } from "@headlessui/react"
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid"
import { Transition } from "@headlessui/react"

interface ListboxProps {
    name: string,
    onChange: (value: string) => void,
    value: string,
    optionsList: Array<string>

}

export const Listbox: FunctionComponent<ListboxProps> = (props: ListboxProps) => {
    return (
        <HeadlessListBox
            name={props.name}
            onChange={(value: string) => {
                props.onChange(value)
            }}
            value={props.value}>
            <div className="relative mt-1">
                <HeadlessListBox.Button className="relative w-full cursor-default bg-gray-50 border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                    <span className="block truncate">{props.value}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </HeadlessListBox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <HeadlessListBox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {props.optionsList.map((option, optionIdx) => (
                            <HeadlessListBox.Option
                                key={optionIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                                    }`
                                }
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                        >
                                            {option}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </HeadlessListBox.Option>
                        ))}
                    </HeadlessListBox.Options>
                </Transition>
            </div>
        </HeadlessListBox>
    )
}