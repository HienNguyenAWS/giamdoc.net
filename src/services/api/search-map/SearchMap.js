import axios from "axios"


export const searchMapByKey = (key) => {
    var url = `https://discover.search.hereapi.com/v1/geocode?q=${key}&apiKey=QjXp59qN61GP24Yfs3BvmqUHtlftzGepeWPxnzC2k-s`;
    return axios.get(url).then(res => {
        return res;
    })
}

export const searchMapByLatLng = (data) => {
    var url = `https://discover.search.hereapi.com/v1/geocode?at==${data.lat},${data.lng}&apiKey=QjXp59qN61GP24Yfs3BvmqUHtlftzGepeWPxnzC2k-s`;
    return axios.get(url).then(res => {
        return res;
    })
}