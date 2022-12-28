import { Navbar } from "flowbite-react"

function NavBarComponent() {
  return (
    <div>
        <Navbar
        fluid={true}
        rounded={true}
        >
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Data Structures
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            active={true}
          >
            Home
          </Navbar.Link>
          <Navbar.Link href="/linked-lists">
            Linked Lists
          </Navbar.Link>
          <Navbar.Link href="/binary-trees">
            Binary Trees 
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Stacks
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavBarComponent