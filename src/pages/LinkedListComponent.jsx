import { Dropdown } from "flowbite-react"
import { Link } from "react-router-dom"

function LinkedListComponent() {
  return (
    <div className="mx-auto flex justify-center">
      <Dropdown label="Select a coding problem...">
      <Link to={'/linked-lists/reverse'}>
        <Dropdown.Item>
          Reverse a Linked List
        </Dropdown.Item>
      </Link>
      <Link to={'/linked-lists/merge'}>
        <Dropdown.Item>
          Merge Two Sorted Lists
        </Dropdown.Item>
      </Link>
      <Link to={'/linked-lists/palindrome'}>
        <Dropdown.Item>
          Valid Palindrome
        </Dropdown.Item>
      </Link>
      <Link to={'/linked-lists/duplicates'}>
        <Dropdown.Item>
          Remove Duplicates
        </Dropdown.Item>
      </Link>
    </Dropdown>
    </div>
  )
}

export default LinkedListComponent