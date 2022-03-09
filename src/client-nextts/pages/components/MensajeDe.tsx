import spellDate from "../helpers/spellDate"

export const MensajeDe = ({name,txt,time}:any) => {
  const date = spellDate(time);
    return (
      <div className='w-full chatDivDe' >
        <div className="flex msjDe">
          <div>
            <h5 className="text-lg font-bold whiteTxt">{name}</h5>
            <div className="wrapText">
              {txt}
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            {/*<svg
              className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
              preserveAspectRatio="none"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >*/}
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg"
                alt=""
              />
              {/*<path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />*/}
            {/*</svg>*/}
          </div>
        </div>
        <span className="text-sm text-gray-500" >{date}</span>
      </div>
      )
}

export default ()=>null