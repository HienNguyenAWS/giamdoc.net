/* eslint-disable no-mixed-spaces-and-tabs */
import PAGES from '../routes/constants'
import { message } from 'antd'
import jwt_decode from 'jwt-decode'

export * from './Icons'
export * from './Images'

export function slugify (str) {
    if (!str || str === '') {
        return 'unknown'
    }
    str = str
        .toLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        .replace(/đ/g, 'd')
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '')
    if (!str || str === '') {
        return 'u'
    }
    return str
}

export function validateEmail (string) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(string)
}

export function validatePhone (string) {
    let re = /^\d+$/
    return re.test(string)
}

export function validateDomain (string) {
    const re = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/g
    return re.test(string)
}

export function getMenuSetting (pageActive) {
    const menu = [
        { id: 'about', label: 'Về chúng tôi', url: PAGES.about, isActive: false },
        {
            id: 'terms',
            label: 'Điều khoản và Dịch vụ',
            url: PAGES.terms,
            isActive: false
        },
        { id: 'privacy', label: 'Bảo mật', url: PAGES.about, isActive: false },
        { id: 'support', label: 'Hỗ trợ', url: PAGES.about, isActive: false },
        {
            id: 'setting',
            label: 'Cài đặt thông báo',
            url: PAGES.setting,
            isActive: false
        },
        { id: 'languages', label: 'Ngôn ngữ', url: PAGES.about, isActive: false },
        { label: 'Đăng xuất', btnLogout: true }
    ]
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].id === pageActive) {
            menu[i].isActive = true
        }
    }
    return menu
}

export const getUrlImage = (width, height, imgId, fit = 'inside') => {
    return (
        'https://filemanager.crmdemo.net/file/image?width=' +
        width +
        '&height=' +
        height +
        '&format=png&image_id=' +
        imgId +
        '&fit=' +
        fit
    )
}

export const getUrlFile = fileId => {
    return 'https://filemanager.crmdemo.net/uploads/' + fileId
}

export const formatMinutes = dateString => {
    var date = new Date(dateString)
    var nowDate = new Date()
    var deltaTime = parseInt((nowDate.getTime() - date.getTime()) / 1000)
    var minutes = parseInt(deltaTime / 60)
    if (minutes < 60) {
        return minutes + ' phút trước'
    } else {
        var hours = parseInt(minutes / 60)
        if (hours < 24) {
            return hours + ' giờ trước'
        } else {
            var days = parseInt(hours / 24)
            if (days < 30) {
                return days + ' ngày trước'
            } else {
                var months = parseInt(days / 30)
                if (months < 12) {
                    return months + ' tháng trước'
                } else {
                    return parseInt(months / 12) + ' năm trước'
                }
            }
        }
    }
}

export function copyToClipboard (value) {
    const el = document.createElement('textarea') // Create a <textarea> element
    el.value = value // Set its value to the string that you want copied
    el.setAttribute('readonly', '') // Make it readonly to be tamper-proof
    el.style.position = 'absolute'
    el.style.left = '-9999px' // Move outside the screen to make it invisible
    document.body.appendChild(el) // Append the <textarea> element to the HTML document
    const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
            ? document.getSelection().getRangeAt(0) // Store selection if found
            : false // Mark as false to know no selection existed before
    el.select() // Select the <textarea> content
    document.execCommand('copy') // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el) // Remove the <textarea> element
    if (selected) {
        // If a selection existed before copying
        document.getSelection().removeAllRanges() // Unselect everything on the HTML document
        document.getSelection().addRange(selected) // Restore the original selection
    }
}

export function swapEleToFirst (elementPos, array) {
    let temp = array[elementPos]
    array.splice(elementPos, 1)
    array.unshift(temp)
}

export function getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

export function beforeUpload (file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size < 1024 * 1024 * 5
    if (!isLt2M) {
        message.error('Image must smaller than 5MB!')
    }
    return isJpgOrPng && isLt2M
}

export function beforeUploadDoc (file) {
    console.log('UPLOAD_FILE', file)
    const isDocType =
        file.type.includes('document') ||
        file.type.includes('msword') ||
        file.type.includes('pdf') ||
        file.type.includes('sheet') ||
        file.type.includes('vnd.ms-excel') ||
        file.type.includes('image') ||
        file.type.includes('video')
    if (!isDocType) {
        message.error('You can only upload document, image, video and must smaller than 100MB!')
    }
    const isLt2M = file.size < 1024 * 1024 * 5
    if (!isLt2M) {
        message.error('File must smaller than 5MB!')
    }
    return isDocType && isLt2M
}

export function decodeToken (token) {
    return jwt_decode(token)
}
