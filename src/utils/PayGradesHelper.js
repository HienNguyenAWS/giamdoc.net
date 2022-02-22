const NLDefault = {
    key: '1',
    ngachLuong: '[Tên ngạch]',
    apDung: [],
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
            ngachLuong: '',
            index: '1.1',
            bacLuong: 'QLDH - B1',
            heSo: 1,
            luongViTri: 0,
            lcbPercent: null,
            lcb: 0,
            kpiPercent: null,
            lkpi: 0,
            phuCapUnit1: 2,
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.2',
            ngachLuong: '',
            index: '1.2',
            bacLuong: 'QLDH - B2',
            heSo: 1,
            luongViTri: 0,
            lcbPercent: null,
            lcb: 0,
            kpiPercent: null,
            lkpi: 0,
            phuCapUnit1: 2,
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.3',
            ngachLuong: '',
            index: '1.3',
            bacLuong: 'QLDH - B3',
            heSo: 1,
            luongViTri: 0,
            lcbPercent: null,
            lcb: 0,
            kpiPercent: null,
            lkpi: 0,
            phuCapUnit1: 2,
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.4',
            ngachLuong: '',
            index: '1.4',
            bacLuong: 'QLDH - B4',
            heSo: 1,
            luongViTri: 0,
            lcbPercent: null,
            lcb: 0,
            kpiPercent: null,
            lkpi: 0,
            phuCapUnit1: 2,
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.5',
            ngachLuong: '',
            index: '1.5',
            bacLuong: 'QLDH - B5',
            heSo: 1,
            luongViTri: 0,
            lcbPercent: null,
            lcb: 0,
            kpiPercent: null,
            lkpi: 0,
            phuCapUnit1: 2,
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.6',
            ngachLuong: '',
            index: '1.6',
            bacLuong: 'QLDH - B6',
            heSo: 1,
            luongViTri: 0,
            lcbPercent: null,
            lcb: 0,
            kpiPercent: null,
            lkpi: 0,
            phuCapUnit1: 2,
            phuCapValue1: 0,
            tong: 0,
            ghiChu: ''
        },
        {
            key: '1.7',
            ngachLuong: '',
            index: '1.7',
            bacLuong: 'QLDH - B7',
            heSo: 1,
            luongViTri: 0,
            lcbPercent: null,
            lcb: 0,
            kpiPercent: null,
            lkpi: 0,
            phuCapUnit1: 2,
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

export const calculateHeSo = (avg, jump, index, length, calculationType) => {
    if (calculationType == 2 ) {
        const num = avg + jump * index
        return Number(num)
    }
    if (calculationType == 1) {
        const a = Math.floor((length - 1) / 2)
        const base = avg - a * jump
        const num = base + index * jump
        return Number(num)
    }
}

export const formatCurrency = number => {
    if (isNaN(number)) return ''
    let str = parseInt(number).toLocaleString()
    // eslint-disable-next-line no-useless-escape
    return str.replace(/\,/g, '.')
}

export const generateNewNL = (data, pcCols) => {
    // eslint-disable-next-line no-debugger
    const newNL = NLDefault
    newNL.key = `${data.length + 1}`
    newNL.index = newNL.key
    newNL.applyFor = []
    newNL.loaiHeSo = 1
    newNL.lcbDefault = 70
    newNL.kpiDefault = 30
    newNL.phuCapDefault = 40
    pcCols.forEach((col) => {
        newNL[`phuCapUnit${col.key}`] = '%'
        newNL[`phuCapValue${col.key}`] = 'PC'
    })
    newNL.children.forEach((e, idx, arr) => {
        e.key = `${newNL.key}.${idx + 1}`
        e.index = idx === arr.length - 1 ? 'add' : e.key
        e.heSo = idx === arr.length - 1 ? undefined : 1
        e.lcbPercent = idx === arr.length - 1 ? undefined : null
        e.lcb = idx === arr.length - 1 ? undefined : 0
        e.kpiPercent = idx === arr.length - 1 ? undefined : null
        e.lkpi = idx === arr.length - 1 ? undefined : 0
        pcCols.forEach((col) => {
            e[`phuCapUnit${col.key}`] = idx === arr.length - 1 ? undefined : null
            e[`phuCapValue${col.key}`] = idx === arr.length - 1 ? undefined : 0
        })
        e.bacLuong = idx === arr.length - 1 ? undefined : ''
        e.tong = idx === arr.length - 1 ? undefined : 0
        e.ghiChu = idx === arr.length - 1 ? undefined : ''

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