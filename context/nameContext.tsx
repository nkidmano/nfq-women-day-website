"use client";
import React, { useState, useEffect, createContext, useContext } from "react";

interface NameContextProps {
    name: string;
    setName: (name: string) => void;
    isSet: boolean;
}

const nameContext = createContext<NameContextProps | undefined>(undefined);

export const useName = () => {
    const context = useContext(nameContext);
    if (!context) {
        throw new Error("useName must be used within a NameProvider");
    }
    return context;
};

interface NameProviderProps {
    children: React.ReactNode;
}

export const NameProvider = ({ children }: NameProviderProps) => {
    const [name, setName] = useState<string>("");
    const [isSet, setIsSet] = useState<boolean>(false);

    useEffect(() => {
        if (name) {
            setIsSet(true);
        } else {
            setIsSet(false);
        }
    }, [name]);

    return (
        <nameContext.Provider value={{ name, setName, isSet }}>
            {children}
        </nameContext.Provider>
    );
};
