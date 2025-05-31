import { createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config.js";
import { register,login,logout } from "./AuthSlice";
import cinePlusApi from "../../../api/cinePlusApi.js";

export const registerUser = (email, password) => {
    return async (dispatch) => {
        try {
            const { data } = await cinePlusApi.post('usuarios/crearUsuario', { email, password });
            const response = await createUserWithEmailAndPassword(auth, email, password);
            if (response && data) {
                console.log(response);
                dispatch(register({ email: response.user.email }));
                return Promise.resolve(response);
            } else {
                throw new Error('Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error durante el registro:', error);
            return Promise.reject(error);
        }
    }
}



export const loginUser = (email, password) => {
    return async (dispatch) => {

    try {
        const response = await signInWithEmailAndPassword(auth,email, password);
        if(response){
            console.log(response)
            dispatch(login({email: response.user.email}))
            return Promise.resolve(response)
        }else{
            throw new Error('Error al iniciar sesion')
        }
    } catch (error) {
        return Promise.reject(error) 
    }    

    }
}

export const loginGoogle = () => {
    return async (dispatch) => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuario autenticado con Google:", user);

            try {
                // Verifica si el usuario ya existe en la base de datos
                const { data: existingUser } = await cinePlusApi.get(`usuarios/verificarUsuario/${user.email}`);

                if (existingUser) {
                    // Si el usuario ya existe, inicia sesión directamente
                    console.log("Usuario ya registrado en la base de datos:", existingUser);
                    dispatch(login({ email: user.email }));
                } else {
                    // Si el usuario no existe, regístralo
                    const { data: newUser } = await cinePlusApi.post('usuarios/crearUsuario', {
                        email: user.email,
                        password: "loaslaosa" // O un valor más adecuado
                    });
                    console.log("Usuario registrado en la base de datos:", newUser);
                    dispatch(login({ email: user.email }));
                }

                return Promise.resolve(result);
            } catch (error) {
                console.error("Error al verificar/registrar usuario en la base de datos:", error.message);
                await signOut(auth);
                return Promise.reject(error);
            }
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error.message);
            return Promise.reject(error);
        }
    };
};



export const cerrarSesion = () => {
    return async (dispatch) => {
        const response = await signOut(auth);
        console.log(response)
    }
}








