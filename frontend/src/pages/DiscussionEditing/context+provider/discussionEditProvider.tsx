import { DiscussionEditContext, DiscussionEditContextType } from "./discussionEditContext";

interface ProviderProps {
    value: DiscussionEditContextType,
    children: React.ReactNode,
}

export const DiscussionEditProvider = ({value, children}: ProviderProps) => {
    return (
        <DiscussionEditContext.Provider value={value}>
            {children}
        </DiscussionEditContext.Provider>
    )
}