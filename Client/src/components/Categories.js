import React from 'react'
import { categories } from '../data'
import CategoryItem from './CategoryItem'

const Categories = () => {
  return (
    <div className='containerCat'>
        {categories.map(item=>(
            <CategoryItem item={item} key={item.id} />
        ))}
    </div>
  )
}

export default Categories