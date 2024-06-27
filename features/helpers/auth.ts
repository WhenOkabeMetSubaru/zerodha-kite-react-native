import * as SecureStore from 'expo-secure-store';

const auth = {
    async isAuthenticated ()
    {

        let token = await SecureStore.getItemAsync('jwt')
        if (token)
        {
            return JSON.parse(token)
        } else return false
    },
    async authenticate (jwt: string | undefined, cb: Function)
    {
       
        await SecureStore.setItemAsync('jwt', JSON.stringify(jwt))
        cb()
    },
    async clearJWT (cb: Function)
    {

        await SecureStore.deleteItemAsync('jwt');
        cb()

    }
}

export default auth