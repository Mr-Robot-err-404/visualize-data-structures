import { ToggleSwitch, Card, Dropdown, Button } from "flowbite-react"
import { useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BinaryTrees from "./BinaryTrees";

function BinaryForm() {
    const sizes = {
        5: "5 layers (standard)",
        6: "6 layers",
        7: "7 layers"
    }
    const options = {
        1: "Breadth-First Search",
        2: "Depth-First Search",
        3: "Binary Search Tree"
    }
    const [isTreeFull, setIsTreeFull] = useState(true)
    const [selectedProblem, setSelectedProblem] = useState(1)
    const [selectedLayerSize, setSelectedLayerSize] = useState(5)
    const [isTreeCreated, setIsTreeCreated] = useState(false)
    
    return (
        <div className="relative">
            <div className="flex justify-center my-4 max-w-sm mx-auto">
            {!isTreeCreated && <Card>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Create a Binary Tree
                </h5>
                <div
                className="flex flex-col gap-4"
                id="toggle"
                >
                <ToggleSwitch
                    checked={isTreeFull}
                    label="Full Tree - standard"
                    onChange={() => setIsTreeFull(!isTreeFull)}
                />
                <ToggleSwitch
                    checked={!isTreeFull}
                    label="Partial Tree - fun to reverse"
                    onChange={() => setIsTreeFull(!isTreeFull)}
                />
                <Dropdown label={options[selectedProblem]} inline={true}>
                    <Dropdown.Item onClick={() => setSelectedProblem(1)}>
                        Breadth-First Search
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedProblem(2)}>
                        Depth-First Search
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedProblem(3)}>
                        Binary Search Tree
                    </Dropdown.Item>
                </Dropdown>
                <Dropdown label={`Size: ${sizes[selectedLayerSize]}`} inline={true}>
                    <Dropdown.Item onClick={() => setSelectedLayerSize(5)}>
                    {sizes[5]}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedLayerSize(6)}>
                    {sizes[6]}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedLayerSize(7)}>
                    {sizes[7]}
                    </Dropdown.Item>
                </Dropdown>
                  <Button onClick={() => setIsTreeCreated(true)}>Generate Binary Tree</Button>
                </div>
            </Card>}
          </div>
          {isTreeCreated && 
          <div>
            <div >
                <div className="fixed left-20 z-10">  
                    <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faArrowLeft} onClick={() => setIsTreeCreated(false)}>Back</FontAwesomeIcon>
                </div>
            </div>
            <BinaryTrees layers={selectedLayerSize} isTreeFull={isTreeFull} type={selectedProblem}/>
          </div>
          }
        </div>
            
        
    )
}

export default BinaryForm