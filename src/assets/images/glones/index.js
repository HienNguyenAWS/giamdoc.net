/* eslint-disable react/prop-types */
import React from 'react'

import FilterIcon from './FilterIcon'
import FilterActiveIcon from './FilterActiveIcon'
import LineupIcon from './LineupIcon'
import LineupActiveIcon from './LineupActiveIcon'
import SearchIcon from './SearchIcon'
import SearchActiveIcon from './SearchActiveIcon'
import BonusIcon from './BonusIcon'
import BonusActiveIcon from './BonusActiveIcon'
import ClockIcon from './ClockIcon'
import ClockActiveIcon from './ClockActiveIcon'
import ProductIcon from './ProductIcon'
import ProductActiveIcon from './ProductActiveIcon'
import BonesIcon from './BonesIcon'
import BonesActiveIcon from './BonesActiveIcon'
import WorkIcon from './WorkIcon'
import WorkActiveIcon from './WorkActiveIcon'
import MoreIcon from './MoreIcon'

const Icon = ({ name }) => {

    switch (name) {

    case 'FilterIcon':
        return <FilterIcon />

    case 'FilterActiveIcon':
        return <FilterActiveIcon />

    case 'LineupIcon':
        return <LineupIcon />

    case 'LineupActiveIcon':
        return <LineupActiveIcon />

    case 'SearchIcon':
        return <SearchIcon />

    case 'SearchActiveIcon':
        return <SearchActiveIcon />

    case 'BonusIcon':
        return <BonusIcon />

    case 'BonusActiveIcon':
        return <BonusActiveIcon />

    case 'ClockIcon':
        return <ClockIcon />

    case 'ClockActiveIcon':
        return <ClockActiveIcon />

    case 'ProductIcon':
        return <ProductIcon />

    case 'ProductActiveIcon':
        return <ProductActiveIcon />

    case 'BonesIcon':
        return <BonesIcon />

    case 'BonesActiveIcon':
        return <BonesActiveIcon />

    case 'WorkIcon':
        return <WorkIcon />

    case 'WorkActiveIcon':
        return <WorkActiveIcon />

    case 'MoreIcon':
        return <MoreIcon />

    default:
        return
    }
}

export default Icon
