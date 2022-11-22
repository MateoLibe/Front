import { useState } from "react"


export const useFetch = () => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        error: null,
    })

    const getFetch = async () => {
        
    }
}