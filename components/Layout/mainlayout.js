import {Outlet} from 'react-router-dom'
import Header from '../header'
import Footer from '../footer'
export default function MainLayout(){
    return (
        <>
            <Header/>
            <div> 
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}
