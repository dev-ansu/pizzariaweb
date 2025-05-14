import { HTMLMotionProps } from "motion/react";
import * as motion from "motion/react-client";
import { HTMLAttributes, ReactNode } from "react"



interface AnimatedDivProps extends HTMLMotionProps<"div">{
    children: ReactNode;
};

export const AnimatedDiv = ({children, ...props}: AnimatedDivProps)=>{
    return(
        <motion.div 
            style={{
                width:"100%"
            }}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 0.5}}
            {...props}
        >
            {children}
        </motion.div>

    )
}