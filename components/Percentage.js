import { useEffect, useState } from "react"

export default function Percentage(props) {
    const [percentageIsPositive, setIsPositive] = useState(false);
    const [percentage, setPercentage] = useState();

    let cryptoPercentage = props.cryptoPercentage;

    useEffect(() => {
        if (cryptoPercentage < 0) {
            cryptoPercentage = cryptoPercentage.toString();
            cryptoPercentage = [...cryptoPercentage];
            cryptoPercentage.shift();

            setIsPositive(false);
            setPercentage(cryptoPercentage)
        } else {
            setIsPositive(true)
            setPercentage(cryptoPercentage)
        }
    }, [cryptoPercentage])

    return (
        <div>
            <p className={`sm:mx-2 py-1 rounded-lg 
                ${percentageIsPositive 
                ? 'text-green-500' 
                : 'text-red-500'}`
                }>
                {percentageIsPositive 
                ? <i className="fas fa-caret-up mr-2"></i> 
                : <i className="fas fa-caret-down mr-2"></i>
                }{percentage}
                %
            </p>
        </div> 
    )
}
