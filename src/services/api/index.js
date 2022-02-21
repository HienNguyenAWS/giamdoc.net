import * as user from './module/user.api'
import * as company from './module/company.api'
import * as language from './module/language.api'
import * as group from './module/group.api'
import * as employee from './module/employee.api'
import * as setting from './module/setting.api'
import * as posts from './module/posts.api'
import * as uploadFile from './module/upload.api'
import * as chat from './module/chat.api'
import * as notification from './module/notification.api'
import * as event from './module/event.api'

const apis = {
    user,
    company,
    language,
    group,
    setting,
    employee,
    posts,
    uploadFile,
    chat,
    notification,
    event
}

export default apis
