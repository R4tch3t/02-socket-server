import {animateScroll} from 'react-scroll';

export const scrollToBottom = (id:any) => {

    animateScroll.scrollToBottom({containerId: id, duration: 0})

}

export const scrollToBottomAnimated = (id:any) => {

    animateScroll.scrollToBottom({containerId: id, duration: 500})

}

export default ()=>null
