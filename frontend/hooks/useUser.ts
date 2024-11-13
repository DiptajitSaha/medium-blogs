import { useEffect, useState } from 'react';
import axios from 'axios';

export const useUser = () => {
    const [user, setUser] = useState<{
        username: string,
        avater: string,
    }>();

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            setUser(res.data);
        });
        
    }, []);

    return user;
}