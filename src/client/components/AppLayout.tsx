import React, { useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom"

import Header from './Header'
import { useAuth } from '../contexts/AuthContext'

type Props = {
    children: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
    const { loading, user } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, user])

    return (
        <div className='h-screen bg-slate-50'>
            <Header />
            <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    )
}
