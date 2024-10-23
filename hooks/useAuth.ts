import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/app/firebaseConfig";


const auth = getAuth(app);

const useAuth = () => {
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false)
        });

        return () => unsubscribe();
    }, []);

    // if (user) {
    //     console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',user);
    // } else {
    //     console.log('no user');
    // }
    return { user, loading };

    
};

export default useAuth;