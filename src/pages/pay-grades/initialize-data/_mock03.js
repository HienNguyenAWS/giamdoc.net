const rowsMock = [
    {
        code: 'N1-LCB',
        title: 'Lương cơ bản',
        rules: 'LKĐ / hoặc LTT',
        amplitudeAndCoefficient: ''
    },
    {
        code: 'N1-LCB',
        title: 'Lương KPI',
        rules: 'VD: 30% LCB',
        amplitudeAndCoefficient: ''
    },
    {
        code: 'N1-LCB',
        title: 'Lương vị trí (Lương chính)',
        rules: 'LVT',
        amplitudeAndCoefficient: ''
    },
    {
        code: 'N1-LCB',
        title: 'Phụ cấp',
        rules: '',
        amplitudeAndCoefficient: ''
    }
]

const columnsMock = [
    {
        label: 'Bậc 1',
        key: 'level1',
        value: {
            amplitude: 0.25,
            coefficient: 1
        }
    },
    {
        label: 'Bậc 2',
        key: 'level2',
        value: {
            amplitude: 0.25,
            coefficient: 1.25
        }
    },
    {
        label: 'Bậc 3',
        key: 'level3',
        value: {
            amplitude: 0.25,
            coefficient: 1.5
        }
    },
    {
        label: 'Bậc 4',
        key: 'level4',
        value: {
            amplitude: 0.25,
            coefficient: 1.75
        }
    },
    {
        label: 'Bậc 5',
        key: 'level5',
        value: {
            amplitude: 0.25,
            coefficient: 2
        }
    }
]

export { rowsMock, columnsMock }
