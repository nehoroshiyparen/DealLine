import React from 'react'
import Side_Menu from '../side-menu/side-menu';
import Top_Menu from '../top-menu/top-menu';
import '../../pages/discussions/discussions.scss'

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="main-layout">
            <div className="container" style={{overflow: 'hidden'}}>
                <Side_Menu />
                <Top_Menu />
                {children}
            </div>
        </div>
    )
}