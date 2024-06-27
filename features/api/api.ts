import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import auth from '../helpers/auth';
import { RootState } from '../store';



const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ["User", "User_Updated", "Cart", "Order", "Shop", "Product", "Products", "Orders"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.29.241:4100', async prepareHeaders(headers, { getState, extra }) {
            let token = await auth.isAuthenticated();
            let backupToken:any = getState() as RootState;
            headers.set('Authorization', `Bearer ${token ? token : backupToken.user.token}`);
            headers.set('Content-Type', 'application/json')

            return headers;
        }
    }),
    endpoints: builder => ({})


})

export default apiSlice;
