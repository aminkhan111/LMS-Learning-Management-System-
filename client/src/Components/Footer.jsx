import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const currentDate = new Date();
const year = currentDate.getFullYear();

function Footer(){
return(
    
    <footer className='relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-white bg-gray-800'>

<section className='text-lg text-red'>
    Copyright {year} | All Right Reserved 
    
</section>

<section className='flex items-center justify-center gap-5 text-2xl text-white'>
        <a href="https://www.facebook.com/babul.aminkhan/" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
          <BsFacebook />
        </a>
        <a href="https://www.instagram.com/abdul_amin_khan111/" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
          <BsInstagram />
        </a>
        <a href="https://www.linkedin.com/in/abdul-amin-khan-111hit" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
          <BsLinkedin />
        </a>
        <a href="https://twitter.com/DevAminKhan?t=ujgKtyeKiffm4yWc_NtBvw&s=08" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
          <BsTwitter />
        </a>
      </section>
    </footer>
    
)

}

export default Footer;