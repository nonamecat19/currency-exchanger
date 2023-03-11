import {ExchangeData, ExchangeDataElement} from "../types/exchangeData"
import {useEffect, useState} from "react"
const useExchangeData = () => {
    const [data, setData] = useState<ExchangeData | undefined>(undefined)

    useEffect(() => {
        fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then((response: Response) => {
                return response.json()
            })
            .then((response: ExchangeData) => {
                const uah: ExchangeDataElement = {
                    r030: 0,
                    txt: "Українська гривня",
                    rate: 1,
                    cc: "UAH",
                    exchangedate: '-'
                }
                const validCurrencies = ['USD', 'EUR', 'GBP', 'EGP']
                setData([uah, ...response.filter(({cc}) => validCurrencies.includes(cc))])
            })
            .catch((error: Error) => {
                alert(`Помилка! ${error}`)
            })
    }, [])

    return data
}
export default useExchangeData