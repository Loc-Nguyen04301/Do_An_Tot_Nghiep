import React, { ReactNode, SetStateAction, useState } from 'react';

interface SearchContextProviderProps {
    children: ReactNode;
}

interface SearchContextType {
    search: string;
    setSearch: React.Dispatch<SetStateAction<string>>;
}

const SearchContext = React.createContext<SearchContextType | undefined>(undefined)

const useSearchContext = () => {
    const context = React.useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchContextProvider');
    }
    return context;
}

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
    const [search, setSearch] = useState("");

    return (<SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>)
}

export { SearchContextProvider, useSearchContext }