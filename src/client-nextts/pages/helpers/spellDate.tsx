import moment from 'moment'
const spellDate = (fecha:any) => {
    const date = moment(fecha);
    return date.format('hh:mm a | MMMM Do')
}

export default spellDate