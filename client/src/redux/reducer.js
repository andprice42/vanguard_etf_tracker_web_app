function reducer(state=1,action){
    switch (action.type) {
        case "add":
            return state = 2
        case "remove":
            return state = 1
        default:
            return state = 1
    }
}
export default reducer