import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"
import { RegisterInterface } from '@/types';
import AuthService from '@/services/AuthService';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { RoutePath } from '@/routes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux-toolkit/hook';
import { login } from '@/redux-toolkit/authSlice';
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export interface GoogleRegister {
    email: string
    name: string
    picture: string
    email_verified: boolean
}

const OAuthLogin = () => {
    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()
    const navigate = useNavigate()

    const onError = () => {
        console.log('Login Failed');
    }

    const onSuccess = async (credentialResponse: any) => {
        dispatchAlert({ loading: true })
        try {
            const data = jwtDecode<GoogleRegister>(credentialResponse.credential)
            const registerData = { email: data?.email, name: data?.name, picture: data?.picture, email_verified: data?.email_verified }
            const res = await AuthService.registerGoogle(registerData)
            console.log(res)
            const { user, access_token, refresh_token } = res.data.data
            if (access_token) {
                dispatch(login({ user, access_token, refresh_token }))
                dispatchAlert({ loading: false })
                navigate(RoutePath.Home)
            }
            else {
                dispatchAlert({ success: res.data.message })
            }
        } catch (error: any) {
            dispatchAlert({ errors: error.message })
        }
    }

    return (
        <div className='mt-5 flex justify-center'>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onError}
                />
            </GoogleOAuthProvider>
        </div>
    )
}

export default OAuthLogin