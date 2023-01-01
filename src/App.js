import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LinkedListComponent from './pages/LinkedListComponent';
import HomePage from './pages/HomePage';
import NavBarComponent from './components/NavBarComponent';
import ReverseLinkedList from './pages/ReverseLinkedList';
import MergeTwoLists from './pages/MergeTwoLists';
import ValidPalindrome from './pages/ValidPalindrome';
import BinaryTreeMenu from './pages/BinaryTreeMenu';
import BinarySearchTree from './pages/BinarySearchTree';
import RemoveDuplicates from './pages/RemoveDuplicates';
import ReverseBinaryTree from './pages/ReverseBinaryTree';
import BubbleSort from './pages/BubbleSort';

function App() {
  return (
    <div>
      <NavBarComponent/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/linked-lists/reverse" element={<ReverseLinkedList/>} />
          <Route path='/linked-lists' element={<LinkedListComponent/>}/>
          <Route path='/linked-lists/merge' element={<MergeTwoLists/>}/>
          <Route path='/linked-lists/palindrome' element={<ValidPalindrome/>}/>
          <Route path='/linked-lists/duplicates' element={<RemoveDuplicates/>}/>
          <Route path='/linked-lists/bubble-sort' element={<BubbleSort/>}/>
          <Route path='/binary-trees' element={<BinaryTreeMenu/>}/>
          <Route path='/binary-trees/bst' element={<BinarySearchTree/>}/>
          <Route path='/binary-trees/reverse' element={<ReverseBinaryTree/>}/>
        </Routes>
      </Router>
    </div>
  );
  }

export default App;
