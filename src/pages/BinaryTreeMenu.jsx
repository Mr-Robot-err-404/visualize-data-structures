import { Dropdown } from "flowbite-react"
import { Link } from "react-router-dom"

function BinaryTreeMenu() {
    return (
        <div className="mx-auto flex justify-center">
          <Dropdown label="Select a coding problem...">
          <Link to={'/binary-trees/bst'}>
            <Dropdown.Item>
              Binary Search Tree
            </Dropdown.Item>
          </Link>
          <Link to={'/binary-trees/reverse'}>
            <Dropdown.Item>
              Reverse Binary Tree
            </Dropdown.Item>
          </Link>
            
        </Dropdown>
        </div>
      )
    }

export default BinaryTreeMenu