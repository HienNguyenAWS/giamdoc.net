import { v4 as uuidv4 } from 'uuid'

export const HeadData = {
    menus: [
        {
            id: uuidv4(),
            label: 'Lọc',
            icon: 'FilterIcon',
            hoverIcon: 'FilterActiveIcon'
        },
        {
            id: uuidv4(),
            label: 'Tìm kiếm',
            icon: 'SearchIcon',
            hoverIcon: 'SearchActiveIcon'
        },
        {
            id: uuidv4(),
            label: 'Hoạt động',
            icon: 'LineupIcon',
            hoverIcon: 'LineupActiveIcon'
        }
    ],
    tabs: [
        {
            id: uuidv4(),
            href: '/glones',
            label: 'Ngạch bậc lương',
            icon: 'BonusIcon',
            activeIcon: 'BonusActiveIcon'
        },
        {
            id: uuidv4(),
            href: 'dummy',
            label: 'Bảng lương mẫu',
            icon: 'BonusIcon',
            activeIcon: 'BonusActiveIcon'
        },
        {
            id: uuidv4(),
            href: 'dummy',
            label: 'Khoán thời gian',
            icon: 'ClockIcon',
            activeIcon: 'ClockActiveIcon'
        },
        {
            id: uuidv4(),
            href: 'dummy',
            label: 'Khoán sản phẩm',
            icon: 'ProductIcon',
            activeIcon: 'ProductActiveIcon'
        },
        {
            id: uuidv4(),
            href: 'dummy',
            label: 'Chính sách thưởng',
            icon: 'BonesIcon',
            activeIcon: 'BonesActiveIcon'
        },
        {
            id: uuidv4(),
            href: 'dummy',
            label: 'Khoán dự án / vụ việc',
            icon: 'WorkIcon',
            activeIcon: 'WorkActiveIcon'
        },
        {
            id: uuidv4(),
            href: 'dummy',
            label: 'Bố trí lao động',
            icon: 'BonesIcon',
            activeIcon: 'BonesActiveIcon'
        },
        {
            id: uuidv4(),
            href: 'dummy',
            label: 'Hoạch định nhân sự',
            icon: 'WorkIcon',
            activeIcon: 'WorkActiveIcon'
        }
    ]
}