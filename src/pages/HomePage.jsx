import React, { useState } from 'react'
import { Card } from 'flowbite-react'
import { Button, Modal } from 'flowbite-react'
import { Link } from 'react-router-dom'

function HomePage() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className='flex justify-around'>
      <div className="max-w-sm">
      <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Linked Lists
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Visualize common interview problems and algorithms for linked lists.
        </p>
        <Link to={'/linked-lists'}>
          <Button>
          Read more
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
      <div className="max-w-sm">
      <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Binary Trees
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          BFS and DFS algorithms for binary trees
        </p>
        <Link to={'/binary-trees'}>
          <Button>
          Read more
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