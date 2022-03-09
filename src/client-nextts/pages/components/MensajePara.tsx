import spellDate from "../helpers/spellDate";

export const MensajePara = ({name,txt,time}:any) =>{
    const date = spellDate(time);
    return (
        <div className='chatDivPara' >
            <div className="sm:flex msjPara">
                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                    {/*<svg
                    className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
                    preserveAspectRatio="none"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 200 200"
                    aria-hidden="true"
                    >
                    <path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />
                    </svg>*/}
                    <img
                        className="inline-block h-9 w-9 rounded-full"
                        src="https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg"
                        alt=""
                    />
                </div>
                <div >
                    <h4 className="text-lg font-bold titlePara">{name}</h4>
                    <div className="wrapText" >
                        {txt}
                    </div>
                </div>
            </div>
            <span className="text-sm text-gray-500" >{date}</span>
        </div>
      )
}

export default ()=>null