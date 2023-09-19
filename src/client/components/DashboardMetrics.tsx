/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, lazy, useEffect } from "react"

import { Metric } from "../../server/data/store"
import { Button } from "./Button"

const AddNewMetric = lazy(() => import("./MetricAddModal"))
const EditMetric = lazy(() => import("./MetricEditModal"))

export const DashboardMetrics = () => {
    const [data, setData] = useState<Metric[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [selectedMetric, setSelectedMetric] = useState<Metric>()
    const [isAddNewOpen, setIsAddNewOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:3000/api/metrics")
        eventSource.onmessage = e => {
            const parsedData = JSON.parse(e.data)
            updateMetrics(parsedData)
            setLoading(false)
        }
        eventSource.onerror = () => {
            eventSource.close()
            setLoading(false)
            setError(true)
        }
    }, [])

    const updateMetrics = (product: any) => {
        setData([...product])
    }

    const initMetricEdit = (metric: Metric) => {
        if (!metric) return
        setSelectedMetric(metric)
        setIsEditOpen(true)
    }

    return (
        <>
            <div className="p-4 my-8 bg-white rounded-lg">
                <div className="flex flex-row justify-between">
                    <div>
                        <h3 className="text-2xl font-semibold">Metrics</h3>
                        <p className="text-sm text-gray-500">Metrics are updated in real-time</p>
                    </div>
                    <div className="">
                        <Button className="mt-4" onClick={() => { setIsAddNewOpen(true) }}>Add Metric</Button>
                    </div>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="flex flex-col h-16 p-4 rounded-md shadow-sm animate-pulse bg-slate-400" />
                        <div className="flex flex-col h-16 p-4 rounded-md shadow-sm animate-pulse bg-slate-400" />
                    </div>
                )}

                {loading && error && (
                    <div className="flex flex-col items-center justify-center mt-6">
                        <span className="mt-2 text-xl font-semibold text-red-500">Metrics are not available at the moment...</span>
                    </div>
                )}

                {!loading && data && (
                    <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {data.map((m: Metric) => (
                            <div key={m.id} className="flex flex-col p-4 rounded-md shadow-sm" style={{ backgroundColor: m.color }}>
                                <div className="flex flex-row items-center justify-between pb-1 space-y-0">
                                    <div className="text-base font-semibold">
                                        {m.name}
                                    </div>
                                    {/* Edit button */}
                                    <button onClick={() => initMetricEdit(m)} className="flex items-center justify-center w-6 h-6 p-0.5 rounded-md focus:outline-none focus:ring-2 hover:bg-slate-900/20 focus:ring-offset-2 focus:ring-slate-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>

                                    </button>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-between">
                                        <div className="text-3xl font-bold">{m.value} <span className="text-xl">{m.unitSymbol}</span></div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold"><span className="inline-block w-10">MAX</span>: {m.max}</span>
                                            <span className="text-sm font-bold"><span className="inline-block w-10">MIN</span>: {m.min}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AddNewMetric isOpen={isAddNewOpen} closeModal={() => setIsAddNewOpen(false)} />
            <EditMetric isOpen={isEditOpen} closeModal={() => setIsEditOpen(false)} selectedMetric={selectedMetric!} />
        </>
    )
}
