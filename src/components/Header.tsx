import {FC} from "react"
import {ExchangeData} from "../types/exchangeData"
interface Props {
    data: ExchangeData | undefined
}
const Header: FC<Props> = ({data}) => {
    const getCurrency = (key: string) => {
        console.log(data)
        let currency = data?.find((element: any) => element.cc === key)
        return currency?.rate ?? ''
    }
    return (
        <header className='bg-red-500 text-white text-xl font-bold flex justify-around p-2 Header'>
            {
                data ?
                    <>
                        <p>USD {getCurrency('USD')}</p>
                        <p>EUR {getCurrency('EUR')}</p>
                    </>
                    :
                    <>
                        <p>Завантаження...</p>
                    </>
            }
        </header>
    )
}
export default Header