import clsx from "clsx"
import Link from "next/link"
import { AiFillGithub } from "react-icons/ai"

interface footerProps {
    className?: string
}

const Footer = ({ className }: footerProps) => {
    return (
        <footer className={clsx(className, 'w-full h-20 bg-[#f6f3ee] py-2 justify-center flex items-center flex-col gap-2 border-t')}>
            <div className="flex items-center md:gap-3 gap-2 flex-wrap justify-center sm:flex-row flex-col">
                <p>Copyrights &copy; {new Date().getFullYear()} by Gavin Dev</p>
                <div className="sm:block hidden">|</div>
                <Link href="https://github.com/vovantruong/comics-with-nextjs13" className="flex items-center hover:underline" target="_blank">
                    <AiFillGithub /> <span className="ml-2">NguyenQuocViet</span>
                </Link>
            </div>
        </footer>
    )
}
export default Footer