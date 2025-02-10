import React from "react";
import { DiscussionContextType, DiscussionContext } from './discussionContext'

interface ProviderProps {
    value: DiscussionContextType,
    children: React.ReactNode,
}

export const DiscussionProvider = ({value, children}: ProviderProps) => {
    return (
        <DiscussionContext.Provider value={value}>
            {children}
        </DiscussionContext.Provider>
    )
}