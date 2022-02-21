import { useMemo } from 'react'

const useSidebarModules = () => {
    const SidebarModules = useMemo(
        () => ({
            Media: 'Media',
            HRM: 'HRM',
            Finance: 'Finance'
        }),
        []
    )

    return {
        SidebarModules
    }
}

export default useSidebarModules
