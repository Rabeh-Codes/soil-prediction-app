import type { ReactNode } from 'react';
interface Props {
    children: ReactNode
}
const ToolsLayout = ({children}: Props) => {
    return(
        <div>
            {children}
        </div>
    )
}
export default ToolsLayout;