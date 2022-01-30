export default function Reducer (state = 'dark', action) {

    if(action && action.type === 'TOGGLE_THEME') {
        return state === 'dark' ? 'light' : 'dark';
    }

    return state;
}