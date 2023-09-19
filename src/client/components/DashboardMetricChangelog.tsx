/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"

import { MetricChangeLog } from "../../server/data/store"
import { Button } from "./Button"


export const DashboardMetricChangelog = () => {
    const [data, setData] = useState<MetricChangeLog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = async () => {
        try {
            const res = await fetch("/api/metrics/changelog")
            const data = await res.json()
            console.log(data)
            if (data.success && data.data) {
                setData(data.data)
            }
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="p-4 my-8 bg-white rounded-lg">
                <div className="flex flex-row justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-semibold">Changelog</h3>
                        <p className="text-sm text-gray-500">You can refetch to see the latest changes.</p>
                    </div>
                    <div className="">
                        <Button className="mt-4" onClick={fetchData}>Update changelog</Button>
                    </div>
                </div>

                {loading && (
                    <div className="flex flex-col">
                        <div className="flex flex-col h-6 mb-2 rounded-md shadow-sm animate-pulse bg-slate-400" />
                        <div className="flex flex-col h-6 mb-2 rounded-md shadow-sm animate-pulse bg-slate-400" />
                    </div>
                )}

                {loading && error && (
                    <div className="flex flex-col items-center justify-center mt-6">
                        <span className="mt-2 text-xl font-semibold text-red-500">Change logs are not available at the moment...</span>
                    </div>
                )}

                {!loading && data && (
                    <div className="flex flex-col">
                        <table className="w-full table-auto">
                            <thead className="text-sm border-b-2 divide-gray-200 text-slate-700">
                                <tr className="text-left">
                                    <th className="pb-2">Timestamp</th>
                                    <th>Metric</th>
                                    <th>Value</th>
                                    <th>Previous Val</th>
                                    <th>UserId</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {data.map((log: MetricChangeLog) => (
                                    <tr key={log.id} className="py-2 text-sm">
                                        <td className="py-2">{new Date(log.timestamp).toISOString()}</td>
                                        <td>{log.metricName}</td>
                                        <td>{log.value}</td>
                                        <td>{log.previousValue}</td>
                                        <td>{log.userId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}
