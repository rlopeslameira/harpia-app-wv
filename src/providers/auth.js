import React, { createContext, useContext, useState } from 'react'
import api from "../services/api";
import { useNavigate } from 'react-router';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState(() => {
        const usuario_ = localStorage.getItem('vimet.usuario');

        if (usuario_)
            return { usuario: JSON.parse(usuario_) }

        return {};
    })

    const signIn = async ({Email, Senha}) => {
        setLoading(true);
        setData({usuario: {Id: 1, Nome: 'Rodrigo Lopes'}});
        localStorage.setItem('vimet.usuario', JSON.stringify({Id: 1, Nome: 'Rodrigo Lopes'}));    
        setLoading(false);            
        return {Id: 1, Nome: 'Rodrigo Lopes'};
    }

    const signUp = async (data) => {
        const usuario_ = await api.post('signup', data);
        if (usuario_.data){
            setData({usuario: usuario_.data});
            localStorage.setItem('vimet.usuario', JSON.stringify({...usuario_.data}));
        }
        
        return usuario_.data;
    }

    const signOut = (UsuarioId) => {        
        setData({usuario: undefined});
        localStorage.removeItem('vimet.usuario'); 
    }

    return (
        <AuthContext.Provider value={{isLoged: !!data.usuario, loading, usuario: data.usuario, signIn, signUp, signOut}}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };