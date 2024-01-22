import {AppProps} from "next/app";
import {wrapper} from "@/store";
import { ThemeProvider, createTheme } from '@mui/material/styles';



const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
            <Component {...pageProps} />

    );
};





export default wrapper.withRedux(MyApp);