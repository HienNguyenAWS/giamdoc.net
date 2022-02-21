
const NLDefault = [
    {
        key: '1',
        salaryGrade: '[Tên ngạch lương]',
        applyFor: '[Đối tượng]',
        salaryScale: '[Mã ngạch lương]',
        coefficient: [3, 0.4],
        coefficientAvg: 3,
        basicSalary: 'LCB',
        kpiPercent: '%',
        kpiSalary: 'LKPI',
        allowancePercent1: '%',
        allowance: 'PC1',
        allowancePercent2: '%',
        allowance2: 'PC2',
        positionSalary: 'LVT1',
        positionSalaryHaveAllowance: 'LVT2',
        note: '',
        children: [
            {
                key: '1.1',
                salaryGrade: '',
                salaryScale: '',
                coefficient: 1,
                coefficientAvg: 1,
                basicSalary: 0,
                kpiPercent: 30,
                kpiSalary: 0,
                allowancePercent1: 40,
                allowance: 0,
                allowancePercent2: 50,
                allowance2: 0,
                positionSalary: 0,
                positionSalaryHaveAllowance: 0,
                note: ''
            },
            {
                key: '1.2',
                salaryGrade: '',
                salaryScale: '',
                coefficient: 1,
                coefficientAvg: 1,
                basicSalary: 0,
                kpiPercent: 30,
                kpiSalary: 0,
                allowancePercent1: 40,
                allowance: 0,
                allowancePercent2: 50,
                allowance2: 0,
                positionSalary: 0,
                positionSalaryHaveAllowance: 0,
                note: ''
            },
            {
                key: '1.3',
                salaryGrade: '',
                salaryScale: '',
                coefficient: 1,
                coefficientAvg: 1,
                basicSalary: 0,
                kpiPercent: 30,
                kpiSalary: 0,
                allowancePercent1: 40,
                allowance: 0,
                allowancePercent2: 50,
                allowance2: 0,
                positionSalary: 0,
                positionSalaryHaveAllowance: 0,
                note: ''
            },
            {
                key: '1.4',
                salaryGrade: '',
                salaryScale: '',
                coefficient: 1,
                coefficientAvg: 1,
                basicSalary: 0,
                kpiPercent: 30,
                kpiSalary: 0,
                allowancePercent1: 40,
                allowance: 0,
                allowancePercent2: 50,
                allowance2: 0,
                positionSalary: 0,
                positionSalaryHaveAllowance: 0,
                note: ''
            },
            {
                key: '1.5',
                salaryGrade: '',
                salaryScale: '',
                coefficient: 1,
                coefficientAvg: 1,
                basicSalary: 0,
                kpiPercent: 30,
                kpiSalary: 0,
                allowancePercent1: 40,
                allowance: 0,
                allowancePercent2: 50,
                allowance2: 0,
                positionSalary: 0,
                positionSalaryHaveAllowance: 0,
                note: ''
            },
            {
                key: '1.6',
                salaryGrade: '',
                salaryScale: '',
                coefficient: 1,
                coefficientAvg: 1,
                basicSalary: 0,
                kpiPercent: 30,
                kpiSalary: 0,
                allowancePercent1: 40,
                allowance: 0,
                allowancePercent2: 50,
                allowance2: 0,
                positionSalary: 0,
                positionSalaryHaveAllowance: 0,
                note: ''
            },
            {
                key: '1.7',
                salaryGrade: '',
                salaryScale: '',
                coefficient: 1,
                coefficientAvg: 1,
                basicSalary: 0,
                kpiPercent: 30,
                kpiSalary: 0,
                allowancePercent1: 40,
                allowance: 0,
                allowancePercent2: 50,
                allowance2: 0,
                positionSalary: 0,
                positionSalaryHaveAllowance: 0,
                note: ''
            },
            {
                key: '1.8',
                salaryGrade: '',
                salaryScale: '',
                coefficient: 1,
                coefficientAvg: 1,
                basicSalary: 0,
                kpiPercent: 30,
                kpiSalary: 0,
                allowancePercent1: 40,
                allowance: 0,
                allowancePercent2: 50,
                allowance2: 0,
                positionSalary: 0,
                positionSalaryHaveAllowance: 0,
                note: ''
            }
        ]
    }
]

export const getNumChild = (data, key) => {
    return data.find((e) => e.key === key)?.children.length || 0
}
export const getNgachLuongInfo = (data, key) => {
    const row = data.find((e) => e.key === key)
    return [row.salaryGrade, row.applyFor]
}

export const calculateHeSo = (avg, jump, index, length) => {
    const a = Math.floor((length - 1) / 2)
    const base = avg - a * jump
    return base + index * jump
}

export const formatCurrency = (number) => {
    if (isNaN(number)) return ''
    let str = parseInt(number).toLocaleString()
    // eslint-disable-next-line no-useless-escape
    return str.replace(/\,/g, '.')
}

export const generateNewNL = (data) => {
    const newNL = NLDefault[0]
    newNL.key = `${data.length + 1}`
    newNL.applyFor = []
    newNL.children.forEach((e, idx, arr) => {
        e.key = `${newNL.key}.${idx + 1}`
        e.salaryScale = idx === arr.length - 1 ? 'add' : e.key
        e.coefficient = idx === arr.length - 1 ? undefined : 1
        e.basicSalary = idx === arr.length - 1 ? undefined : 1
        e.basicSalary = idx === arr.length - 1 ? undefined : 0
        e.kpiPercent = idx === arr.length - 1 ? undefined : 30
        e.kpiSalary = idx === arr.length - 1 ? undefined : 0
        e.allowance = idx === arr.length - 1 ? undefined : 0
        e.allowance2 = idx === arr.length - 1 ? undefined : 0
        e.allowancePercent1 = idx === arr.length - 1 ? undefined : 40
        e.allowancePercent2 = idx === arr.length - 1 ? undefined : 50
        e.positionSalary = idx === arr.length - 1 ? undefined : 0
        e.positionSalaryHaveAllowance = idx === arr.length - 1 ? undefined : 0
        e.note = idx === arr.length - 1 ? undefined : ''

    })
    return newNL
}

export const generateNewChild = (siblings) => {
    const child = { ...siblings.at(-2) }

    const [parentKey, childKey] = child.key.split('.')

    child.key = `${parentKey}.${parseInt(childKey) + 1}`
    child.index = child.key

    return child
}
