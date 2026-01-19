
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function useAdminAuth() {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check session storage
        const isAuth = sessionStorage.getItem('admin_auth') === 'true';
        if (isAuth) {
            setAuthorized(true);
        }
        setLoading(false);
    }, []);

    const login = (pin) => {
        if (pin === "HARRY@123") {
            sessionStorage.setItem('admin_auth', 'true');
            setAuthorized(true);
            return true;
        }
        return false;
    };

    return { authorized, loading, login };
}
