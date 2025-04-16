import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Slice/Sliceuni'
const Storeuni = configureStore({
    reducer: {
        user: userReducer,
    },
})
export default Storeuni