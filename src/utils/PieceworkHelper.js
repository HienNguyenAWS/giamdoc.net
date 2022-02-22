const PWDefault = {
    key: '1',
    name:'CÔNG ĐOẠN/TỔ MÁY/CHUYỀN 1',
    tensp:'',
    dvt:'',
    chuan:'',
    themgio:'',
    cadem:'',
    ngaynghi:'',
    ngayle:'',
    kiemnhiem:'',
    index: '1',
    dinhbien: 'Người',
    ngaycong: 'Giờ',
    nangsuat: 'SP/Giờ',
    ghiChu: 'Phương pháp thống kê và tính lương',
    children: [
        // {
        //     key: 'special',
        //     name:'Quản lý công đoạn / Chuyền / Tổ máy',
        //     index: '',
        //     tensp:'',
        //     dvt:'',
        //     chuan:''
        // },
        {
            key: '1.1',
            name:'Tên công việc / vị trí / yêu cầu',
            index: '1.1',
            tensp:'Ngói mộc',
            dvt:'Viên',
            chuan:'10',
            themgio:'12',
            cadem:'11',
            ngaynghi:'12',
            ngayle:'15',
            kiemnhiem:'8',
            dinhbien: '8',
            ngaycong: '100',
            nangsuat: '1',
            ghiChu: ''
        },
        {
            key: '1.2',
            name:'Tên công việc / vị trí / yêu cầu',
            index: '1.2',
            tensp:'Ngói mộc 2',
            dvt:'Viên',
            chuan:'10',
            themgio:'12',
            cadem:'11',
            ngaynghi:'12',
            ngayle:'15',
            kiemnhiem:'8',
            dinhbien: '8',
            ngaycong: '100',
            nangsuat: '1',
            ghiChu: ''
        },
        {
            key: '1.3',
            name:'Tên công việc / vị trí / yêu cầu',
            index: '1.3',
            tensp:'Ngói mộc 3',
            dvt:'Viên',
            chuan:'10',
            themgio:'12',
            cadem:'11',
            ngaynghi:'12',
            ngayle:'15',
            kiemnhiem:'8',
            dinhbien: '8',
            ngaycong: '100',
            nangsuat: '1',
            ghiChu: ''
        },
        {
            key: '1.4',
            index: 'add'
        }
    ]
}

export const getNumChild = (data, key) => {
    return data.find((e) => e.key === key)?.children.length || 0
}


export const generateNewPW = data => {
    const newPW = PWDefault
    newPW.key = `${data.length + 1}`
    newPW.index = newPW.key
    newPW.children.forEach((e, idx, arr) => {
        e.key = `${newPW.key}.${idx+1}`
        e.index = idx === arr.length - 1 ? 'add' : e.key
    })
    return newPW
}

export const generateNewChild = siblings => {
    const child = { ...siblings.at(-2) }

    const [parentKey, childKey] = child.key.split('.')

    child.key = `${parentKey}.${parseInt(childKey) + 1}`
    child.index = child.key

    return child
}
