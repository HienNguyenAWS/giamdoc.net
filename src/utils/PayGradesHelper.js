const NLDefault = {
    key: '1',
    ngachLuong: '[Tên ngạch lương]',
    apDung: '[Đối tượng]',
    index: '1',
    bacLuong: '[Mã]',
    heSo: [3, 0.4],
    heSoTB: 3,
    luongViTri: 'LVT',
    lcbPercent: '%LCB',
    lcb: 'LCB',
    kpiPercent: '%KPI',
    lkpi: 'L(KPI)',
    phuCapUnit1: '%',
    phuCapValue1: 'PC',
    tong: 'LVT+PC',
    ghiChu: '',
    children: [
        {
            key: '1.1',
            ngachLuong: 'sol1',
            index: '1.1',
            bacLuong: 'QLDH - B1',
            heSo: 1.8,
            luongViTri: 8_100_000,
            lcbPercent: 70,
            lcb: 10_170_000,
            kpiPercent: 30,
            lkpi: '2.430.000',
            phuCapUnit1: '2',
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.2',
            ngachLuong: 'sol2',
            index: '1.2',
            bacLuong: 'QLDH - B1',
            heSo: 2.2,
            luongViTri: 9_900_000,
            lcbPercent: 70,
            lcb: 10_170_000,
            kpiPercent: 30,
            lkpi: '2.430.000',
            phuCapUnit1: '2',
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.3',
            ngachLuong: 'sol3',
            index: '1.3',
            bacLuong: 'QLDH - B1',
            heSo: 2.6,
            luongViTri: 11_700_000,
            lcbPercent: 70,
            lcb: 10_170_000,
            kpiPercent: 30,
            lkpi: '2.430.000',
            phuCapUnit1: '2',
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.4',
            ngachLuong: 'sol4',
            index: '1.4',
            bacLuong: 'QLDH - B2',
            heSo: 3,
            luongViTri: 13_500_000,
            lcbPercent: 70,
            lcb: 10_170_000,
            kpiPercent: 30,
            lkpi: '2.430.000',
            phuCapUnit1: '2',
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.5',
            ngachLuong: 'sol5',
            index: '1.5',
            bacLuong: 'QLDH - B3',
            heSo: 3.4,
            luongViTri: 15_300_000,
            lcbPercent: 70,
            lcb: 10_170_000,
            kpiPercent: 30,
            lkpi: '2.430.000',
            phuCapUnit1: '2',
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.6',
            ngachLuong: 'sol5',
            index: '1.6',
            bacLuong: 'QLDH - B3',
            heSo: 3.8,
            luongViTri: 17_100_000,
            lcbPercent: 70,
            lcb: 10_170_000,
            kpiPercent: 30,
            lkpi: '2.430.000',
            phuCapUnit1: '2',
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.7',
            ngachLuong: 'sol5',
            index: '1.7',
            bacLuong: 'QLDH - B3',
            heSo: 4.2,
            luongViTri: 18_900_000,
            lcbPercent: 70,
            lcb: 10_170_000,
            kpiPercent: 30,
            lkpi: '2.430.000',
            phuCapUnit1: '2',
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.8',
            index: 'add'
        }
    ]
}

export const getNumChild = (data, key) => {
    return data.find((e) => e.key === key)?.children.length || 0
}

export const getNgachLuongInfo = (data, key) => {
    const row = data.find(e => e.key === key)
    return [row.ngachLuong, row.apDung]
}

export const calculateHeSo = (avg, jump, index, length) => {
    const a = Math.floor((length - 1) / 2)
    const base = avg - a * jump
    return base + index * jump
}

export const formatCurrency = number => {
    if (isNaN(number)) return ''
    let str = parseInt(number).toLocaleString()
    // eslint-disable-next-line no-useless-escape
    return str.replace(/\,/g, '.')
}

export const generateNewNL = data => {
    const newNL = NLDefault
    newNL.key = `${data.length + 1}`
    newNL.index = newNL.key
    newNL.children.forEach((e, idx, arr) => {
        e.key = `${newNL.key}.${idx + 1}`
        e.index = idx === arr.length - 1 ? 'add' : e.key
    })
    return newNL
}

export const generateNewChild = siblings => {
    const child = { ...siblings.at(-2) }

    const [parentKey, childKey] = child.key.split('.')

    child.key = `${parentKey}.${parseInt(childKey) + 1}`
    child.index = child.key

    return child
}
