import { RiLeafLine } from 'react-icons/ri';

export default function CO2Badge({ co2Consumption }) {
    return (
        <div className="flex items-center px-4 py-2 space-x-2 font-bold bg-grass">
            <RiLeafLine size={22} />
            <span>
                {co2Consumption} g of CO<sub>2</sub>
            </span>
        </div>
    );
}
