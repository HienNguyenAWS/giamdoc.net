import HttpClient from '../httpClient'
import { paths } from '../paths'
import baseApi from '../base.api'

export const createChat = (data) => {
    return HttpClient.post(paths.createChat(), data)
}

export const updateChat = (data) => {
    return HttpClient.put(paths.updateChat(), data)
}
export const quoteChat = (data) => {
    return HttpClient.post(paths.updateChat(), data)
}

export const updateChatReact = (data) => {
    return HttpClient.post(paths.updateChatReact(), data)
}

export const deleteChat = (mess) => {
    return HttpClient.post(paths.deleteChat(), mess)
}

export const deleteConversation = (id) => {
    return HttpClient.delete(paths.deleteConversation(id))
}

export const viewLastMemberChat = (id) => {
    return HttpClient.get(paths.viewLastMemberChat(id))
}

export const getListConversation = () => {
    return new Promise((resolve) => {
        Promise.all([HttpClient.get(paths.getListConversation()), HttpClient.get(paths.getListGroupConversation())]).then(rs => {
            let listConv = []
            rs.forEach(item => {
                if (item.data.code == 200) {
                    listConv = [...listConv, ...item.data.data]
                }
            })
            resolve({ data: { code: 200, data: listConv } })
        })
    })
}

export const createConversation = (data) => {
    return HttpClient.post(paths.createConversation(), data)
}

export const createSingleConversation = (data) => {
    return HttpClient.post(paths.createSingleConversation(), data)
}

export const detailConversation = (id) => {
    return HttpClient.get(paths.detailConversation(id))
}

export const updateNotify = (data) => {
    return HttpClient.post(paths.updateNotify(), data)
}

export const addMember = (data) => {
    return HttpClient.post(paths.addMember(), data)
}

export const verifyMember = (data) => {
    return HttpClient.post(paths.verifyMember(), data)
}

export const leaveConversation = (data) => {
    return HttpClient.post(paths.leaveConversation(), data)
}

export const removeMember = () => {
    return HttpClient.post(paths.removeMember())
}

export const updateNameGroupChat = (data, id) => {
    return HttpClient.put(paths.updateNameGroupChat(+id), data)
}
export const searchMessage = (id, key, index, pageSize) => {
    return HttpClient.get(paths.searchMessage(id, key, index, pageSize))
}
export const getMessageRange=(conservationId, chatId, number) => {
    return HttpClient.get(paths.getMessageRange(conservationId, chatId, number))
}

export const searchConversationsByName = (name, currentId) => {
    return new Promise((resolve) => {
        Promise.all([HttpClient.get(paths.searchConversationsByName(name)), baseApi.get(paths.getEmployeeByName(name))]).then(rs => {
            let listConv = []
            let listC = []
            let listEmp = []
            if (rs[0].data.code == 200) {
                listC = rs[0].data.data
            }

            if (rs[1].code == 200) {
                listEmp = rs[1].data.map(e => { return { ...e, FullName: e.FullName || e.Email }})
            }
            for (let emp of listEmp) {
                if (+emp.UserId != +currentId) {
                    let flag=false
                    for (let c of listC) {
                        if (!c.IsGroup && c.Employee.findIndex(r => r.UserId == emp.UserId) != -1) {
                            listConv.push(c)
                            flag=true
                            break
                        }
                    }
                    if (flag!==true) {
                        listConv.push({
                            name: emp.FullName,
                            msg: '',
                            Employee: [{ UserId: emp.UserId, FullName: emp.FullName, Avatar: emp.Avatar }],
                            parentId: 0,
                            targetId: emp.UserId,
                            didNotCreate: true
                        })
                    }
                }
            }
            listConv = [...listConv, ...listC.filter(c => c.IsGroup)]
            resolve({ data: { code: 200, data: listConv } })
        })
    })
}

export const getFile = (id) => {
    return HttpClient.get(paths.getFile(id))
}

export const getContract = () => {
    return new Promise((resolve) => {
        baseApi.get(paths.getEmployeeByName('')).then(rs => {
            const listContract = []
            if (rs.code == 200) {
                rs.data = rs.data.sort((a, b) => {
                    if (a?.FullName?.slice(0, 1).toLowerCase() < b?.FullName?.slice(0, 1).toLowerCase())
                        return -1
                    return 1
                })
                let re = new RegExp(/[A-Z]{1}/)
                rs.data.forEach((item) => {
                    if (!listContract[listContract.length - 1] || listContract[listContract.length - 1]?.key != item.FullName?.slice(0, 1).toUpperCase()) {

                        if (!re.test(item?.FullName?.slice(0, 1).toUpperCase())) {
                            if (listContract[listContract.length - 1]?.key == '#') {
                                listContract[listContract.length - 1].value.push(item)
                            } else {
                                listContract.push({
                                    key: '#',
                                    value: [item]
                                })
                            }
                        } else {
                            listContract.push({
                                key: item.FullName.slice(0, 1).toUpperCase(),
                                value: [item]
                            })
                        }
                    } else {
                        listContract[listContract.length - 1].value.push(item)
                    }
                })
                listContract.forEach(r => {
                    r.value = r.value.sort((a, b) => {
                        if (a.FullName < b.FullName)
                            return 1
                        return -1
                    })
                })
            }
            resolve(listContract)

        })
    })
}