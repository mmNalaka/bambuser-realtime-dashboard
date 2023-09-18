import React from 'react'
import Header from './Header'
import { useAuth } from '../contexts/AuthContext'

type Props = {
    children: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
    const { loading, user } = useAuth()

    if (loading) {
        return <p>loading...</p>
    }


    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
        </div>
    )
}
