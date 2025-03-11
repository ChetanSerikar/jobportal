import React from 'react'
import { cn } from "@/lib/utils";


const Wrapper = ({ children, className }) => {
    return (
        <div className={cn(
            "h-full mx-auto w-full max-w-screen-xl px-4 md:px-20 z-10",
            className
        )}>
            {children}
        </div>
    )
};

export default Wrapper
