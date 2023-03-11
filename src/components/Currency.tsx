import {ChangeEvent, Dispatch, FC, SetStateAction, useState} from "react"
import {ExchangeData} from "../types/exchangeData"
import {selectType} from "../types/currency"
interface Props {
    data: ExchangeData | undefined
}
const Currency: FC<Props> = ({data}) => {

    const [firstCurrencyIndex, setFirstCurrencyIndex] = useState<number>(0)
    const [secondCurrencyIndex, setSecondCurrencyIndex] = useState<number>(3)

    const [firstAmount, setFirstAmount] = useState<string>('0')
    const [secondAmount, setSecondAmount] = useState<string>('0')

    const CurrencySelect: FC<selectType> = ({index, setIndex, currencyHandler}) => {
        return (
            <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) => currencyHandler(e, setIndex)}
                defaultValue={index}
                className='border-4 border-red-500 p-2 rounded-xl focus:outline-none text-secondary bg-main'
            >
                {
                    data?.map(({txt, cc}, optionIndex) => {
                        return (
                            <option
                                key={optionIndex}
                                defaultValue={index}
                                value={optionIndex}
                                className='text-secondary bg-main'
                            >
                                {cc} - {txt}
                            </option>
                        )
                    })
                }
            </select>
        )
    }


    const currencyinput = {
        type:"number",
        className:'border-b-4 border-red-500 p-2 focus:outline-none',
        min:0
    }

    const wrapper = "flex flex-col w-72 space-y-4"

    const firstCurrencyHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = parseInt(e.currentTarget.value)
        changeCurrency(setFirstAmount, secondAmount, setFirstCurrencyIndex, value, secondCurrencyIndex)
    }

    const secondCurrencyHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = parseInt(e.currentTarget.value)
        changeCurrency(setSecondAmount, firstAmount, setSecondCurrencyIndex, value, firstCurrencyIndex)
    }

    let changeCurrency = (setAmount: Dispatch<string>, amount: string, setIndex: Dispatch<SetStateAction<number>>, index1: number, index2: number) => {
        if (!data) return
        setIndex(index1)
        let total = parseFloat(amount) * data[index2].rate / data[index1].rate
        setAmount(total.toFixed(2).toString())
    }

    const firstInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeValue(e, setFirstAmount, setSecondAmount, firstCurrencyIndex, secondCurrencyIndex)
    }

    const secondInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeValue(e, setSecondAmount, setFirstAmount, secondCurrencyIndex, firstCurrencyIndex)
    }

    const changeValue = (e: ChangeEvent<HTMLInputElement>, dis1: Dispatch<string>, dis2: Dispatch<string>, index1: number, index2: number) => {
        if (!data) return
        let value = e.target.value
        dis1(value)
        let amount = parseFloat(value)
        let total = amount * data[index1].rate / data[index2].rate
        dis2(total.toFixed(2).toString())
    }

    return (
        <main className='flex justify-around mt-5'>
            <div className={wrapper}>
                <input value={firstAmount} onChange={firstInputHandler} {...currencyinput}/>
                <CurrencySelect index={firstCurrencyIndex} setIndex={setFirstCurrencyIndex} currencyHandler={firstCurrencyHandler}/>
            </div>

            <div className={wrapper}>
                <input value={secondAmount} onChange={secondInputHandler} {...currencyinput}/>
                <CurrencySelect index={secondCurrencyIndex} setIndex={setSecondCurrencyIndex} currencyHandler={secondCurrencyHandler}/>
            </div>
        </main>
    )
}
export default Currency