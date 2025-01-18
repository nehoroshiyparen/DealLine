import React from 'react'

interface EmptyLayoutProps {
    children: React.ReactNode;
}

export default function EmptyLayout({ children }: EmptyLayoutProps) {
    return <div className="empty-layout">{children}</div>
}