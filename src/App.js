import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LinkedListComponent from './pages/LinkedListComponent';
import HomePage from './pages/HomePage';
import NavBarComponent from './components/NavBarComponent';
import ReverseLinkedList from './pages/ReverseLinkedList';
import MergeTwoLists from './pages/MergeTwoLists';
import ValidPalindrome from './pages/ValidPalindrome';
import RemoveDuplicates from './pages/RemoveDuplicates';
import BubbleSort from './pages/BubbleSort';
import BinaryForm from './pages/BinaryForm';

function App() {
  return (
    <div>
      <NavBarComponent/>
      <div className='py-10'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/linked-lists/reverse" element={<ReverseLinkedList/>} />
          <Route path='/linked-lists' element={<LinkedListComponent/>}/>
          <Route path='/linked-lists/merge' element={<MergeTwoLists/>}/>
          <Route path='/linked-lists/palindrome' element={<ValidPalindrome/>}/>
          <Route path='/linked-lists/duplicates' element={<RemoveDuplicates/>}/>
          <Route path='/linked-lists/bubble-sort' element={<BubbleSort/>}/>
          <Route path='/binary-trees' element={<BinaryForm/>}/>
        </Routes>
      </Router>
      </div>
      
    </div>
  );
  }

export default App;
