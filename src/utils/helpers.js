export const heartFilling = (liked, darkTheme) => {
    return liked ? 'red' : (darkTheme ? 'white' : 'black')
}

export const iconFilling = (darkTheme) => {
    return darkTheme ? 'white' : 'black'
}