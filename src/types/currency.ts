import {ChangeEvent, Dispatch} from "react"

export type selectType = {
    index: number,
    setIndex: Dispatch<number>
    currencyHandler: (e: ChangeEvent<HTMLSelectElement>, setIndex: Dispatch<any>) => void
}