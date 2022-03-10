import { urlLogo } from "../variables/images"
import Image from 'next/image'

const Logo = ({width,height}:any) => {
    return (
        <div className="logoUAG">
              <Image
                width={width}
                height={height}
                src={urlLogo}
                alt="UAGro."
              />
        </div>
    )
}

export default Logo