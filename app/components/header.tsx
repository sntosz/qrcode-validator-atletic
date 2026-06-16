import logoUnigran from '../../public/logoUnigran.png'
import logoAaaes from '../../public/logoAaaes.png'
import Image from 'next/image'
export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <Image src={logoUnigran} alt="Logo Unigran" width={50} height={50}/>
        <h1 className='text-xl text-center'>Associação Atletica Acadêmica <br /> Engenharia de Software Unigran Capital</h1>
        <Image src={logoAaaes} alt="Logo Aaaes" width={50} height={50}/>
    </header>
  );
}