import React, { ReactNode, SetStateAction, useState } from 'react';

interface AlertProviderProps {
    children: ReactNode;
}

interface SearchContextType {
    search: string;
    setSearch: React.Dispatch<SetStateAction<string>>;
}

const SearchContext = React.createContext<SearchContextType | undefined>(undefined)

const useSearch = () => {
    const context = React.useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}

const SearchProvider = ({ children }: AlertProviderProps) => {
    const [search, setSearch] = useState("");

    return (<SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>)
}

export { SearchProvider, useSearch }