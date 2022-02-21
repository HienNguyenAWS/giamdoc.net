function convertFullNameToImage(name) {
    if (name) {
        let arrayText = name.split(' ')
        if (arrayText.length >= 2)
            return arrayText[0][0] + arrayText[arrayText.length - 1][0]
        return arrayText[0][0]
    }

    return ''
}
const downloadURL = async (url, fileName) => {
    let imageURL
    try {
        const image = await fetch(url)
        const imageBlog = await image.blob()
        imageURL = URL.createObjectURL(imageBlog)
    } catch {
        imageURL = url
    }

    const link = document.createElement('a')
    link.href = imageURL
    link.download = fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
export const Helpers = {
    convertFullNameToImage,
    downloadURL
}
