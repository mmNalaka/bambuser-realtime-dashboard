import { cn } from "../lib/utils";

interface props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    as?: React.ElementType;
}

export const Button = ({ className, ...props }: props) => {
    const { as: Component = "button" } = props;
    return (<Component className={cn("flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800", className)} {...props} />
    )
}