
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function useAdminAuth() {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check session storage first
        const isAuth = sessionStorage.getItem('admin_auth') === 'true';

        if (isAuth) {
            setAuthorized(true);
            setLoading(false);
        } else {
            // If not authenticated, prompt
            // We use a small timeout to avoid hydration mismatch or immediate prompt overlap
            setTimeout(() => {
                const pin = prompt("Enter Admin PIN:");
                if (pin === "HARRY@123") {
                    sessionStorage.setItem('admin_auth', 'true');
                    setAuthorized(true);
                } else {
                    alert("Access Denied");
                    window.location.href = "/";
                }
                setLoading(false);
            }, 100);
        }
    }, [router]);

    return { authorized, loading };
}
