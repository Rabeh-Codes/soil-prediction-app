import { Outlet } from 'react-router-dom';
import { memo, type ReactNode } from 'react';

interface DataViewerLayoutProps {
  children?: ReactNode;
}

const DataViewerLayout = ({children}: DataViewerLayoutProps) => {
 

   return (
    <div className="">
  
        <div >
          <Outlet /> 
          {children}
        </div>
     
    </div>
  );
}
export default memo(DataViewerLayout);