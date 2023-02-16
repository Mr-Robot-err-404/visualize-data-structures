import React from 'react'
import { Card } from 'flowbite-react'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import TreeProfile from '../binary-profile.png'
import ListProfile from '../linked-list-profile.png'

function HomePage() {
  return (
    <div className='flex justify-center'>
      <div className="max-w-sm mx-10 my-10">
      <Card imgSrc={ListProfile}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Linked Lists
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Visualize common interview problems and algorithms for linked lists.
        </p>
        <Link to={'/linked-lists'}>
          <Button>
          Explore
          <svg
            className="ml-2 -mr-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          </Button>
        </Link>
      </Card>
      </div>
      <div className="max-w-sm mx-10 my-10">
      <Card imgSrc={TreeProfile}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Binary Trees
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Traverse Binary trees with the Breadth-First and Depth-First Search Algorithms.
        </p>
        <Link to={'/binary-trees'}>
          <Button>
          Explore
          <svg
            className="ml-2 -mr-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          </Button>
        </Link>
      </Card>
      </div>
    </div>
  )
}

export default HomePage