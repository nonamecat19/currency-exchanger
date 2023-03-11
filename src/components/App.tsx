import {FC} from 'react'
import Header from "./Header"
import Currency from "./Currency"
import useExchangeData from "../hooks/useExchangeData"
const App: FC = () => {
    const data = useExchangeData()

    return (
        <>
            <Header data={data}/>
            <Currency data={data}/>
        </>
    )
}

export default App
