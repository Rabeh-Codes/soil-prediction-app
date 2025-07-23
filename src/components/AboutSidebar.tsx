import styles from '@/styles/AboutSidebar.module.scss'
const AboutSidebar = () => {
    return(
        <div className={styles['about-wrapper']}>
        <aside className={styles['aboutSidebar']}>
            <h2 className={styles['about-title']}>About</h2>
            <p className={styles['about-description']}>The NASA Prediction Of Worldwide Energy Resources (POWER) project's PaRameter Uncertainty ViEwer
                 (PRUVE) application provides data validation capabilities utilizing statistical 
                 analysis and visualizations for solar radiation and meteorological data parameters.

Specifically, the PRUVE application uses surface observed site data for comparison with POWER's data. 
Meteorological data is from National Oceanic and Atmospheric Administration (NOAA) station reporting 
systems: NOAA Integrated Surface Database (ISD) at hourly temporal resolution and the NOAA Global Surface
 Summary of the Day (GSOD) at daily temporal resolution. Solar radiation data is from the World Climate 
 Research Programme's (WCRP) Baseline Surface Radiation Network (BSRN) and is available at hourly and 
 daily temporal resolutions. Each data source has different site selection and data quality requirements.


For basic statistical characterization of a single location, navigate to the Descriptive Statistics tab
 at the top of the page. To compare POWER data to surface observations select the Comparative Analysis 
 tab. Other plotting and statistical capabilities are found under the Advanced Plotting tab.

Note that all validation data are pre-processed and displayed within the application with available 
data site locations indicated by color coded points on the map. Please follow the prompts for each 
of the tools. When you select a location, the application determines the surface site closest to your
 area of interest. All times in the application are represented in standard Coordinated Universal Time 
 (UTC) unless otherwise stated.</p>
       </aside> 
       </div>
    )
}
export default AboutSidebar;