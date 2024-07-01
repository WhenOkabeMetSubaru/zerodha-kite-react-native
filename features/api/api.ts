import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import auth from '../helpers/auth';
import { RootState } from '../store';

const serverLinkLocal = "http://192.168.29.241:4100";
const serverLinkProduction = 'https://stock-market-backend-personal.vercel.app';

const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ["User", "User_Updated", "Cart", "Order", "Shop", "Product", "Products", "Orders"],
    baseQuery: fetchBaseQuery({
        baseUrl: serverLinkLocal, async prepareHeaders(headers, { getState, extra }) {
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
