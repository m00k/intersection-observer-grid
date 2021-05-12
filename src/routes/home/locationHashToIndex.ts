const locationHashToIndex = (): number => {
    const categoryName = window.location.hash || ''
    const idIndex = categoryName.indexOf('_')
    return idIndex > -1 ? +categoryName.substring(idIndex + 1) : 0
}

export default locationHashToIndex