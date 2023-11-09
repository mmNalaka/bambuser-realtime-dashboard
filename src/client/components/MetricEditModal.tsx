import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { Metric } from '../../server/data/store'
import { Button } from './Button'
import { TextInput } from './TextInput'
import React from 'react'

type Props = {
    isOpen: boolean
    closeModal: () => void
    selectedMetric: Metric
}

const MetricEditModal = ({ isOpen, closeModal, selectedMetric }: Props) => {
    const [loading, setLoading] = useState(false)
    const [metric, setMetric] = useState<Metric>(selectedMetric)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()

        if (!selectedMetric) return

        const formData = new FormData(e.currentTarget)
        const payload = Object.fromEntries(formData.entries())

        try {
            const res = await fetch(`/api/metrics/${selectedMetric.id}`, {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json()
            if (!data.success) {
                alert('Something went wrong')
            }
        }
        catch (err) {
            alert('Something went wrong')
        }
        closeModal()
        setLoading(false)
    }


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-medium leading-6 text-gray-900"
                                >
                                    Edit metric
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Edit this metric, all the users logged in will be able to see the update in realtime.
                                    </p>
                                </div>

                                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-900">
                                            Name<span className="text-red-500">*</span>
                                        </label>
                                        <TextInput id="name" name="name" type="text" placeholder="Name" defaultValue={selectedMetric?.name} required aria-required />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-900">
                                            Value<span className="text-red-500">*</span>
                                        </label>
                                        <TextInput id="value" name="value" type="number" placeholder="Value" defaultValue={selectedMetric?.value} required aria-required />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-900">
                                            Unit Symbol
                                        </label>
                                        <TextInput id="unitSymbol" name="unitSymbol" type="text" placeholder="Unit Symbol" defaultValue={selectedMetric?.unitSymbol} />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-900">
                                            Color
                                        </label>
                                        <TextInput id="color" name="color" type="text" placeholder="Color" defaultValue={selectedMetric?.color} />
                                    </div>

                                    <hr />

                                    <Button className="mt-4" type='submit' disabled={loading}>Update Metric</Button>
                                </form>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default MetricEditModal
