import { Helmet } from 'react-helmet-async';
const ToolsOverview = () => {
    return(
        <>
        <Helmet>
        <title>Tools Overview</title>
        </Helmet>
        <main className='px-6 py-8 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
        Tools Overview
        </h1>
        <p className='text-gray-600 leading-relaxed'>
        this section provides us access to various analytical and visualization tools to help you 
        interact with and understand geospatial datasets more effectively.
        </p>
        </main>
        </>
    )
}
export default ToolsOverview;